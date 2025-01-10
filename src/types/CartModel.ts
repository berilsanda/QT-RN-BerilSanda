import { Product } from '@/types/ProductModel';

export type CartList = {
  product: Product;
  qty: number;
  totalPrice: number;
};

export type CartStateType = {
  cartList: CartList[];
};
