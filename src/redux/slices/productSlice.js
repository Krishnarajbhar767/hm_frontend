import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
    products: [],
    isLoaded: false,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, value) => {
            state.products = value.payload;
        },
        setIsProductLoaded: (state, value) => {
            state.isLoaded = value.payload;
        },
    },
});

// Export actions
export const { setProducts, setIsProductLoaded } = productSlice.actions;

// Export reducer
export default productSlice.reducer;
