import Feather from '@expo/vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';

import CartNavigator from './CartNavigator';
import TransactionNavigator from './TransactionNavigator';
import { TabParamList } from './types/MainNavigatorTypes';

import { colors } from '@/config/Constants';
import { getTotalCartQty } from '@/features/cart/stores/CartSlice';
import ProductList from '@/features/product/screens/ProductList';
import { useAppSelector } from '@/hook/UseRedux';

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainNavigator() {
  const totalCartQty = useAppSelector(getTotalCartQty);

  return (
    <Tab.Navigator
      initialRouteName="ProductList"
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontFamily: 'NunitoSans_700Bold',
          fontSize: 18,
        },
      }}
    >
      <Tab.Screen
        name="ProductList"
        component={ProductList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          title: 'Beranda',
        }}
      />
      <Tab.Screen
        name="CartNavigator"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <>
              {totalCartQty > 0 && <View style={styles.badge} />}
              <Feather name="shopping-cart" color={color} size={size} />
            </>
          ),
          title: 'Keranjang',
        }}
      />
      <Tab.Screen
        name="TransactionNavigator"
        component={TransactionNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="credit-card" color={color} size={size} />
          ),
          title: 'Transaksi',
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 4,
    right: 52,
    zIndex: 9,
    backgroundColor: colors.warning,
    height: 12,
    width: 12,
    borderRadius: 100,
  },
});
