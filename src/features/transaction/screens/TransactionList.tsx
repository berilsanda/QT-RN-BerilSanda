import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, View } from 'react-native';

import TransactionItem from '../components/TransactionItem';

import EmptyState from '@/components/EmptyState';
import { useAppSelector } from '@/hook/UseRedux';
import { TransactionStackParamList } from '@/navigations/types/TransactionNavigatorTypes';

export default function TransactionList({
  navigation,
}: NativeStackScreenProps<TransactionStackParamList, 'TransactionList'>) {
  const transactionItems = useAppSelector(
    (state) => state.transaction.transactionItems,
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={transactionItems || []}
        ListEmptyComponent={() => (
          <EmptyState
            title="Transaksi tidak ditemukan"
            subtitle="Silahkan melakukan transaksi terlebih dahulu."
          />
        )}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16 }}
        renderItem={({ item }) => {
          return <TransactionItem item={item} navigation={navigation} />;
        }}
      />
    </View>
  );
}
