import { createSlice } from "@reduxjs/toolkit";
import { handleAxiosError } from "../../utils/handleAxiosError";

// Initial state
const initialState = {
    orders: [],
    isLoaded: false,
};

// Create the order slice
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        // Set orders
        setOrders: (state, action) => {
            state.orders = action.payload;
            state.loading = false;
        },
        // Set loading state
        setIsLoaded: (state, action) => {
            state.isLoaded = action.payload;
        },
        clearOrders: (state, value) => {
            state.orders = [];
            state.isLoaded = false;
        },
    },
});

// Export the basic actions
export const { setOrders, setIsLoaded, clearOrders } = orderSlice.actions;

// Custom action creator to fetch orders
export const fetchOrders = (userId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/orders?user=${userId}`); // api call//
        dispatch(setOrders(data));
    } catch (error) {
        handleAxiosError(error);
    }
};

// Custom action creator to create a new order
export const createOrder = (orderData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) {
            throw new Error("Failed to create order");
        }
        const data = await response.json();
        // Fetch updated orders list or append the new order
        dispatch(fetchOrders(orderData.user)); // Re-fetch orders to ensure the list is up-to-date
    } catch (error) {
        dispatch(setError(error.message));
    }
};

// Export reducer
export default orderSlice.reducer;
