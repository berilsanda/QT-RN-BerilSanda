import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartStateType } from '../../../types/CartModel';

import { RootState } from '@/stores/Store';
import { Product } from '@/types/ProductModel';

const initialState: CartStateType = {
  cartList: [],
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      // Check if product is already added to the cart
      const findProduct = state.cartList.find(
        (cartItem) => cartItem.product.id == action.payload.id,
      );

      if (findProduct) {
        findProduct.qty += 1;
        findProduct.totalPrice = findProduct.qty * findProduct.product.price;
      } else {
        state.cartList.push({
          product: action.payload,
          qty: 1,
          totalPrice: action.payload.price,
        });
      }
    },
    substractFromCart: (state, action: PayloadAction<Product>) => {
      // Check if product is already added to the cart
      const findProduct = state.cartList.find(
        (product) => product.product.id == action.payload.id,
      );

      if (findProduct == null) return;

      if (findProduct.qty > 1) {
        findProduct.qty -= 1;
        findProduct.totalPrice = findProduct.qty * findProduct.product.price;
      } else {
        const newList = state.cartList.filter(
          (cartItem) => cartItem.product.id != action.payload.id,
        );

        state.cartList = newList;
      }
    },
    clearCart: (state) => {
      state.cartList = [];
    },
  },
});

const cartList = (state: RootState) => state.cart.cartList;

export const getProductQty = createSelector(
  [cartList, (cartList, productId: number) => productId],
  (cartList, productId) => {
    const findProduct = cartList.find((cart) => cart.product.id == productId);

    return findProduct?.qty;
  },
);

export const getTotalCartQty = createSelector([cartList], (cartList) => {
  const totalQty = cartList.reduce((total, currProduct) => {
    return (total += currProduct.qty);
  }, 0);

  return totalQty;
});

export const getTotalCartPrices = createSelector([cartList], (cartList) => {
  const totalPrice = cartList.reduce((total, currProduct) => {
    return (total += currProduct.totalPrice);
  }, 0);

  return totalPrice;
});

export const { addToCart, substractFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
