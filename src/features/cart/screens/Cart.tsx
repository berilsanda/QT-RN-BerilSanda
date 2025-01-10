import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { formatPrice } from '../../../utils/FormatPrice';
import CartItem from '../components/CartItem';
import { getTotalCartPrices } from '../stores/CartSlice';

import Buttons from '@/components/Buttons';
import EmptyState from '@/components/EmptyState';
import { colors, typography } from '@/config/Constants';
import { useAppSelector } from '@/hook/UseRedux';
import { CartStackParamList } from '@/navigations/types/CartNavigatorTypes';

export default function Cart({
  navigation,
}: NativeStackScreenProps<CartStackParamList, 'Cart'>) {
  const cartItems = useAppSelector((state) => state.cart.cartList);
  const totalCartPrices = useAppSelector(getTotalCartPrices);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cartItems || []}
        ListEmptyComponent={() => (
          <EmptyState
            title="Produk tidak ditemukan"
            subtitle="Anda belum menambahkan produk ke keranjang."
          />
        )}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16 }}
        renderItem={({ item }) => {
          return <CartItem item={item} />;
        }}
      />
      <View style={styles.footerContainer}>
        <View style={styles.footerContentContainer}>
          <Text style={[typography['paragraph3'], { color: colors.grey.dark }]}>
            Total harga
          </Text>
          <Text style={[typography['heading2'], { color: colors.primary }]}>
            {formatPrice(totalCartPrices)}
          </Text>
        </View>
        <Buttons
          label="Pembayaran"
          onPress={() =>
            navigation.navigate('Payment', {
              totalPrice: totalCartPrices,
            })
          }
          disabled={cartItems.length < 1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: colors.grey.light,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  footerContentContainer: {
    flex: 1,
    marginRight: 16,
  },
});
