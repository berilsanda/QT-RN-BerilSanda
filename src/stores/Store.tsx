import storage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { ErrorMiddleware } from './config/ErrorMiddleware';

import cartReducer from '@/features/cart/stores/CartSlice';
import { productAPI } from '@/features/product/api/ProductApi';
import transactionReducer from '@/features/transaction/stores/TransactionSlice';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const transactionPersistReducer = persistReducer(
  persistConfig,
  transactionReducer,
);

const cartPersistReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    transaction: transactionPersistReducer,
    cart: cartPersistReducer,
    [productAPI.reducerPath]: productAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(ErrorMiddleware)
      .concat(productAPI.middleware),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
