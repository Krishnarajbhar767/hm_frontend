// axiosInstance.js
import axios from "axios";
import { store } from "../redux/store";
import { clearUser, setToken } from "../redux/slices/userSlice";
import authApis from "../services/api/auth/auth.apis";

// 1) Create a “main” axios instance that we’ll export.
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 120_000, // 2 minutes
    withCredentials: true,
});

// 2) Request interceptor: always attach Authorization header if token exists
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

// 3) Response interceptor: handle 401 (token expired)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If no response or not a 401, just reject immediately
        if (!error.response || error.response.status !== 401) {
            return Promise.reject(error);
        }

        // If we've already retried this request, don’t try again
        if (originalRequest._hasRetried) {
            return Promise.reject(error);
        }

        // Mark this request as “already retried”
        originalRequest._hasRetried = true;

        // Attempt to refresh token using a plain axios call (so we skip this interceptor)
        try {
            const refreshResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/regenerate-token`,
                {},
                {
                    withCredentials: true, // if your refresh endpoint requires cookies, etc.
                }
            );

            // Suppose new token comes back as { data: { token: "NEW_TOKEN_STRING" } }
            const newToken = refreshResponse.data?.data;
            if (newToken) {
                // 1. Update localStorage + Redux
                localStorage.setItem("token", newToken);
                store.dispatch(setToken(newToken));

                // 2. Patch the original request's Authorization header
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                // 3. Retry the original request
                return axiosInstance(originalRequest);
            }
            // If refresh did not return a new token, we’ll fall through to “logout”
            throw new Error("No token in refresh response");
        } catch (refreshError) {
            // Refresh has failed entirely (expired refresh token, server error, etc.)
            try {
                // Optional: call your logOut() API so backend can clear cookies, etc.
                await authApis.logOut();
            } catch (logoutErr) {
                /* ignore */
            }
            // Clear Redux & localStorage
            store.dispatch(clearUser());
            localStorage.removeItem("token");
            // Reject with a custom error so your UI can redirect to login
            return Promise.reject(
                new Error("Session expired. Please log in again.")
            );
        }
    }
);

export default axiosInstance;
