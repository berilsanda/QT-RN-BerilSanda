import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

import { TransactionList } from '../../../types/TransactionModel';
import generateRandomId from '../utils/GenerateRandomId';

import { typography } from '@/config/Constants';
import { clearCart } from '@/features/cart/stores/CartSlice';
import { AppDispatch } from '@/stores/Store';
import { CartList } from '@/types/CartModel';

const initialState: {
  transactionItems: TransactionList[];
} = {
  transactionItems: [],
};

const transactionSlice = createSlice({
  name: 'transactionSlice',
  initialState,
  reducers: {
    saveTransaction: (
      state,
      action: PayloadAction<{ productList: CartList[]; totalPrice: number }>,
    ) => {
      const _id = `TRX-${generateRandomId()}`;

      const newTransaction: TransactionList = {
        _id,
        productList: action.payload.productList,
        totalPrice: action.payload.totalPrice,
      };

      state.transactionItems.push(newTransaction);
    },
  },
});

export const completeTransaction =
  (transaction: { productList: CartList[]; totalPrice: number }) =>
  (dispatch: AppDispatch) => {
    dispatch(saveTransaction(transaction));
    dispatch(clearCart());

    Toast.show({
      type: 'success',
      text1: 'Berhasil!',
      text2: 'Pembayaran anda sudah berhasil!',
      text1Style: typography['label3'],
      text2Style: typography['paragraph3'],
    });
  };

export const { saveTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
