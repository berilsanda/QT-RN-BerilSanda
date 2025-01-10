import { TransactionList } from '@/types/TransactionModel';

export type TransactionStackParamList = {
  TransactionList: undefined;
  TransactionDetail: { transactionList: TransactionList };
};
