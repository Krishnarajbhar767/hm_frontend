import { createSlice } from "@reduxjs/toolkit";
import { handleAxiosError } from "../../utils/handleAxiosError";

// Initial state
const initialState = {
    orders: [
        {
            _id: "6650abcd1e23ff001a001a1a",
            user: {
                _id: "664f2e4a2b1aef001f2c333b",
                name: "John Doe",
                email: "john@example.com",
            },
            items: [
                {
                    _id: "664f3000a5b33fc001f0a100",
                    name: "Wireless Headphones",
                    price: 49.99,
                    quantity: 2,
                },
                {
                    _id: "664f3000a5b33fc001f0a100",
                    name: "Sony HeadPhone",
                    price: 299,
                    quantity: 2,
                },
            ],
            shippingAddress: {
                street: "123 Main Street",
                city: "San Francisco",
                state: "CA",
                postalCode: "94103",
                country: "USA",
                phone: "+1-555-1234-567",
            },
            paymentMethod: "Credit Card",
            paymentStatus: "Paid",
            paidAt: "2025-05-18T15:23:00Z",
            isDelivered: true,
            deliveredAt: "2025-05-20T10:15:00Z",
            deliveryStatus: "Delivered",
            totalAmount: 99.98,
            createdAt: "2025-05-18T14:00:00Z",
            updatedAt: "2025-05-20T10:15:00Z",
        },
        {
            _id: "6650bbcd1e23ff001a001a2b",
            user: {
                _id: "664f2e4a2b1aef001f2c333c",
                name: "Alice Smith",
                email: "alice@example.com",
            },
            items: [
                {
                    _id: "664f3011a5b33fc001f0a110",
                    name: "Bluetooth Speaker",
                    price: 59.99,
                    quantity: 1,
                },
            ],
            shippingAddress: {
                street: "456 Elm Street",
                city: "Austin",
                state: "TX",
                postalCode: "73301",
                country: "USA",
                phone: "+1-555-7890-123",
            },
            paymentMethod: "PayPal",
            paymentStatus: "Pending",
            isDelivered: false,
            deliveryStatus: "Pending",
            totalAmount: 59.99,
            createdAt: "2025-05-19T09:30:00Z",
            updatedAt: "2025-05-19T09:30:00Z",
        },
        {
            _id: "6650cccc1e23ff001a001a3c",
            user: {
                _id: "664f2e4a2b1aef001f2c333d",
                name: "Bob Johnson",
                email: "bob@example.com",
            },
            items: [
                {
                    _id: "664f3022a5b33fc001f0a120",
                    name: "USB-C Charger",
                    price: 19.99,

                    quantity: 3,
                },
            ],
            shippingAddress: {
                street: "789 Oak Lane",
                city: "New York",
                state: "NY",
                postalCode: "10001",
                country: "USA",
                phone: "+1-555-0000-999",
            },
            paymentMethod: "Credit Card",
            paymentStatus: "Failed",
            isDelivered: false,
            deliveryStatus: "Canceled",
            totalAmount: 59.97,
            createdAt: "2025-05-20T10:00:00Z",
            updatedAt: "2025-05-20T11:00:00Z",
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
