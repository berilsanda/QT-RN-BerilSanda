import Feather from '@expo/vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { TransactionList } from '../../../types/TransactionModel';

import { colors, typography } from '@/config/Constants';
import { TransactionStackParamList } from '@/navigations/types/TransactionNavigatorTypes';
import { formatPrice } from '@/utils/FormatPrice';

interface TransactionItemProps {
  item: TransactionList;
  navigation: NativeStackNavigationProp<
    TransactionStackParamList,
    'TransactionList'
  >;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  item,
  navigation,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() =>
        navigation.navigate('TransactionDetail', {
          transactionList: item,
        })
      }
    >
      <View style={styles.contentContainer}>
        <Text style={typography['label2']}>{item._id}</Text>
        <Text style={[typography['label3'], { color: colors.primary }]}>
          {formatPrice(item.totalPrice)}
        </Text>
      </View>
      <Feather name="chevron-right" color={colors.grey.dark} size={20} />
    </TouchableOpacity>
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
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
});

export default TransactionItem;
