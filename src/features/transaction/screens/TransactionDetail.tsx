import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import TransactionProductList from '../components/TransactionProductList';

import Divider from '@/components/Divider';
import { colors, typography } from '@/config/Constants';
import { TransactionStackParamList } from '@/navigations/types/TransactionNavigatorTypes';
import { formatPrice } from '@/utils/FormatPrice';

export default function TransactionDetail({
  route: { params },
}: NativeStackScreenProps<TransactionStackParamList, 'TransactionDetail'>) {
  const { transactionList } = params;

  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={[typography['paragraph3'], { color: colors.grey.dark }]}>
          ID Transaksi
        </Text>
        <Text style={typography['label3']}>{transactionList._id}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={[typography['paragraph3'], { color: colors.grey.dark }]}>
          Total Harga
        </Text>
        <Text style={typography['label3']}>
          {formatPrice(transactionList.totalPrice)}
        </Text>
      </View>

      <Divider style={{ marginVertical: 16 }} />

      <Text
        style={[
          typography['paragraph3'],
          { color: colors.grey.dark, marginBottom: 16 },
        ]}
      >
        Daftar Produk
      </Text>
      <FlatList
        data={transactionList.productList || []}
        style={{ flex: 1 }}
        renderItem={({ item }) => {
          return <TransactionProductList item={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});
