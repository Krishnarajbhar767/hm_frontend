import axios from "axios";
import getCookieByName from "./getCookie"; // Utility function to get a cookie by its name.
import { store } from "../redux/store";
import { clearUser, setToken } from "../redux/slices/userSlice";
import authApis from "../services/api/auth/auth.apis";
// Create an axios instance with custom configuration
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Base URL for the API calls (can be configured later).
    timeout: 60000 * 2, // Set timeout for the requests to 2 minutes (120,000 ms).
    withCredentials: true,
});

// Set up a request interceptor to add the Authorization header before each request
axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve the token from cookies using the utility function
        const token = localStorage.getItem("token");

        if (token) {
            // If the token exists, add it as a Bearer token to the Authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; // Return the updated config for the request
    },
    (err) => Promise.reject(err) // Reject if there's an error in the request setup
);

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        const is401 = error.response?.status === 401;
        const isLoginPage = window.location.pathname === "/login";
        const isRefreshRequest = originalRequest?.url?.includes(
            "/auth/regenerate-token"
        );

        // Skip if already retried, or if on login page or trying to refresh token
        if (
            is401 &&
            !originalRequest._hasRetried &&
            !isLoginPage &&
            !isRefreshRequest
        ) {
            originalRequest._hasRetried = true;

            try {
                const res = await axiosInstance.post("/auth/regenerate-token");
                const newToken = res.data?.data;
                localStorage.setItem("token", newToken);
                store.dispatch(setToken(newToken));
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                await authApis.logOut();
                store.dispatch(clearUser()); // user is logged out here
                const customError = new Error(
                    "Session expired. Please log in again."
                );
                return Promise.reject(customError);
            }
        }

        return Promise.reject(error);
    }
);

// Export the customized axios instance so it can be used elsewhere in the application
export default axiosInstance;
