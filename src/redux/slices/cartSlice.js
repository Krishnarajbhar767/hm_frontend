import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
    cartItems: [
        {
            id: "1",
            name: "Elegant Saree",
            description: "A beautiful elegant saree made with love.",
            price: 120,
            category: "665f7cfe9f01e1f4b98b1234",
            stock: 10,
            images: [
                "https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528&width=713",
            ],
            fabric: "Silk",
            technique: "Handwoven",
            color: "Red",
            weight: "500g",
            assurance: "100% Authentic",
            hsnCode: "5007",
            quantity: 1,
        },
        {
            id: "2",
            name: "Designer Kurta",
            description: "Premium cotton kurta with modern design.",
            price: 89,
            category: "665f7cfe9f01e1f4b98b5678",
            stock: 5,
            images: [
                "https://www.houseofmasaba.com/cdn/shop/files/Masaba100410copy.jpg?v=1720173528&width=713",
            ],
            fabric: "Cotton",
            technique: "Machine Embroidery",
            color: "Blue",
            weight: "300g",
            assurance: "Premium Quality",
            hsnCode: "6203",
            quantity: 2,
        },
    ], // Array of items: { id, name, price, quantity }
    totalItems: 0, // Total number of items in the cart (sum of quantities)
    subtotal: 0, // Total price of all items (sum of price * quantity)
    stepCount: 1,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Add an item to the cart or increment quantity if it exists
        addToCart: (state, action) => {
            const item = action.payload; // { id, name, price, quantity: 1 }
            const existingItem = state.cartItems.find(
                (cartItem) => cartItem.id === item.id
            );

            if (existingItem) {
                // Increment quantity if item exists
                existingItem.quantity += item.quantity || 1;
            } else {
                // Add new item to cart
                state.cartItems.push({ ...item, quantity: item.quantity || 1 });
            }

            // Recalculate totals
            state.totalItems = state.cartItems.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
            state.subtotal = state.cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
        },

        // Remove an item from the cart by id
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== id);

            // Recalculate totals
            state.totalItems = state.cartItems.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
            state.subtotal = state.cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
        },

        // Update the quantity of an item in the cart
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find((cartItem) => cartItem.id === id);

            if (item && quantity > 0) {
                item.quantity = quantity;
            } else if (item && quantity <= 0) {
                // Remove item if quantity is 0 or less
                state.cartItems = state.cartItems.filter(
                    (cartItem) => cartItem.id !== id
                );
            }

            // Recalculate totals
            state.totalItems = state.cartItems.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
            state.subtotal = state.cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
        },

        // Clear the cart (e.g., after checkout)
        clearCart: (state) => {
            state.cartItems = [];
            state.totalItems = 0;
            state.subtotal = 0;
        },
        setStepCount: (state, action) => {
            state.stepCount = action.payload;
        },
    },
});

// Export actions
export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setStepCount,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
