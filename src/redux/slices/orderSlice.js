import { createSlice } from "@reduxjs/toolkit";
import { handleAxiosError } from "../../utils/handleAxiosError";

// Initial state
const initialState = {
    orders: [
        {
            _id: "68035546adb322c5769f572e", // Simulated ObjectId
            user: "681f33bdd20fa87c5d47fcc2", // Simulated User ObjectId
            orderItem: {
                product: "68035546adb322c5769f572e", // Simulated Product ObjectId
                quantity: 1,
            },
            shippingAddress: {
                address: "123 Main St",
                city: "New York",
                postalCode: "10001",
                country: "USA",
            },
            paymentMethod: "Visa",
            price: 150.0,
            isPaid: true,
            paidAt: "2025-05-02T10:00:00.000Z",
            isDelivered: true,
            deliveredAt: "2025-05-05T10:00:00.000Z",
            createdAt: "2025-05-01T08:00:00.000Z",
            updatedAt: "2025-05-05T10:00:00.000Z",
        },
        {
            _id: "60d5ec49f1a2b3c4d5e6f790",
            user: "60d5ec49f1a2b3c4d5e6f123",
            orderItem: {
                product: "60d5ec49f1a2b3c4d5e6f457",
                quantity: 2,
            },
            shippingAddress: {
                address: "456 Office Rd",
                city: "Los Angeles",
                postalCode: "90001",
                country: "USA",
            },
            paymentMethod: "MasterCard",
            price: 89.99,
            isPaid: false,
            paidAt: null,
            isDelivered: false,
            deliveredAt: null,
            createdAt: "2025-05-03T09:00:00.000Z",
            updatedAt: "2025-05-03T09:00:00.000Z",
        },
        {
            _id: "60d5ec49f1a2b3c4d5e6f791",
            user: "60d5ec49f1a2b3c4d5e6f123",
            orderItem: {
                product: "60d5ec49f1a2b3c4d5e6f458",
                quantity: 1,
            },
            shippingAddress: {
                address: "789 Coastal Ave",
                city: "Miami",
                postalCode: "33101",
                country: "USA",
            },
            paymentMethod: "PayPal",
            price: 299.99,
            isPaid: true,
            paidAt: "2025-05-10T12:00:00.000Z",
            isDelivered: false,
            deliveredAt: null,
            createdAt: "2025-05-09T11:00:00.000Z",
            updatedAt: "2025-05-10T12:00:00.000Z",
        },
    ],
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
    },
});

// Export the basic actions
export const { setOrders, setIsLoaded } = orderSlice.actions;

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
