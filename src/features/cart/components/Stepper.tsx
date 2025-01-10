import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import {
  addToCart,
  getProductQty,
  substractFromCart,
} from '../stores/CartSlice';

import { colors, typography } from '@/config/Constants';
import { useAppDispatch, useAppSelector } from '@/hook/UseRedux';
import { Product } from '@/types/ProductModel';

interface StepperProps {
  item: Product;
}

const Stepper: React.FC<StepperProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const productQty = useAppSelector((state) => getProductQty(state, item.id));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnContainer}
        activeOpacity={0.8}
        onPress={() => dispatch(substractFromCart(item))}
      >
        <Feather
          name={productQty && productQty > 1 ? 'minus' : 'trash-2'}
          color={colors.primary}
          size={12}
          onPress={() => dispatch(substractFromCart(item))}
        />
      </TouchableOpacity>
      <View style={{ width: 48 }}>
        <Text style={[typography['paragraph3'], { textAlign: 'center' }]}>
          {productQty}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.btnContainer}
        activeOpacity={0.8}
        onPress={() => dispatch(addToCart(item))}
      >
        <Feather
          name="plus"
          color={colors.primary}
          size={12}
          onPress={() => dispatch(addToCart(item))}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.primaryContainer,
  },
  btnContainer: {
    padding: 6,
    backgroundColor: colors.primaryContainer,
  },
});

export default Stepper;
