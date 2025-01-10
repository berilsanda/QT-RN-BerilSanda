import { CartList } from '@/types/CartModel';

export type TransactionList = {
  _id: string;
  productList: CartList[];
  totalPrice: number;
};
