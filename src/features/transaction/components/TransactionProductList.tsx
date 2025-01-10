import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { colors, typography } from '@/config/Constants';
import { CartList } from '@/types/CartModel';
import { formatPrice } from '@/utils/FormatPrice';

interface TransactionProductListProps {
  item: CartList;
}

const TransactionProductList: React.FC<TransactionProductListProps> = ({
  item,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.product.thumbnail }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={typography['label3']}>{item.product.title}</Text>
        <Text style={[typography['paragraph3'], { color: colors.grey.dark }]}>
          {item.qty}
        </Text>
        <Text style={[typography['paragraph2'], { color: colors.warning }]}>
          {formatPrice(item.totalPrice)}
        </Text>
      </View>
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
    marginLeft: 12,
  },
});

export default TransactionProductList;
