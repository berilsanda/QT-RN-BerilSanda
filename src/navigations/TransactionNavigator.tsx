import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TransactionStackParamList } from './types/TransactionNavigatorTypes';

import TransactionDetail from '@/features/transaction/screens/TransactionDetail';
import TransactionList from '@/features/transaction/screens/TransactionList';

const Stack = createNativeStackNavigator<TransactionStackParamList>();

export default function TransactionNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="TransactionList"
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: 'NunitoSans_700Bold',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="TransactionList"
        component={TransactionList}
        options={{ title: 'Transaksi' }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetail}
        options={{ title: 'Detail Transaksi' }}
      />
    </Stack.Navigator>
  );
}
