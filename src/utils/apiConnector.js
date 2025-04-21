import axios from "axios";
import getCookieByName from "./getCookie"; // Utility function to get a cookie by its name.

// Create an axios instance with custom configuration
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Base URL for the API calls (can be configured later).
    timeout: 60000 * 2, // Set timeout for the requests to 2 minutes (120,000 ms).
});

// Set up a request interceptor to add the Authorization header before each request
axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve the token from cookies using the utility function
        const token = getCookieByName("token");
        if (token) {
            // If the token exists, add it as a Bearer token to the Authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; // Return the updated config for the request
    },
    (err) => Promise.reject(err) // Reject if there's an error in the request setup
);

// Export the customized axios instance so it can be used elsewhere in the application
export default axiosInstance;
