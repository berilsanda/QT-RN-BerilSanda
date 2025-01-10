import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { CartList } from '../../../types/CartModel';
import { formatPrice } from '../../../utils/FormatPrice';

import Stepper from './Stepper';

import { colors, typography } from '@/config/Constants';

interface CartItemProps {
  item: CartList;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.product.thumbnail }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={typography['label3']}>{item.product.title}</Text>
        <Text style={[typography['paragraph3'], { color: colors.grey.dark }]}>
          {formatPrice(item.totalPrice)}
        </Text>
      </View>
      <Stepper item={item.product} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.grey.light,
  },
  image: {
    height: 58,
    width: 58,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.grey.light,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
});

export default CartItem;
