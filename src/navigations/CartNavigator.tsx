import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CartStackParamList } from './types/CartNavigatorTypes';

import Cart from '@/features/cart/screens/Cart';
import Payment from '@/features/payment/screens/Payment';

const Stack = createNativeStackNavigator<CartStackParamList>();

export default function CartNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Cart"
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: 'NunitoSans_700Bold',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ title: 'Keranjang' }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ title: 'Pembayaran' }}
      />
    </Stack.Navigator>
  );
}
