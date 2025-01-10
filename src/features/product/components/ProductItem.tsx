import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { colors, typography } from '@/config/Constants';
import { addToCart } from '@/features/cart/stores/CartSlice';
import { useAppDispatch } from '@/hook/UseRedux';
import { Product } from '@/types/ProductModel';

interface ProductItemProps {
  item: Product;
}

const IMAGE_HEIGHT = 200;
const IMAGE_WIDTH = (Dimensions.get('window').width - 2 * 20 - 16) / 2;

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  // Truncate string if length is more than 20 char
  // and add '...' at the end
  function truncateDesc(desc: string) {
    return desc.length > 20 ? `${desc.slice(0, 20)}...` : desc;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => dispatch(addToCart(item))}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Text style={typography['label3']}>{item.title}</Text>
        <Text numberOfLines={2} style={typography['paragraph4']}>
          {truncateDesc(item.description)}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={[typography['label3'], { color: colors.warning }]}>
            {item.price}
          </Text>
          <Feather
            name="plus"
            color={colors.primary}
            style={styles.addBtn}
            size={16}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    marginBottom: 16,
    width: IMAGE_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.grey.light,
  },
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    maxWidth: 350,
  },
  contentContainer: {
    borderTopWidth: 1,
    borderColor: colors.grey.light,
    padding: 8,
  },
  priceContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addBtn: {
    backgroundColor: colors.primaryContainer,
    borderRadius: 100,
    padding: 4,
  },
});

export default ProductItem;
