import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'ui',
    initialState : {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (!existingItem) {
                // Jika produk belum ada di cart
                state.items.push({
                    itemId: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {
                // Jika produk sudah ada di cart
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.totalPrice;
            }
        },
        removeItemFromCart() {

        }
    }
});

export default cartSlice;

