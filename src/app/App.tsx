import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { colors } from '@/config/Constants';
import MainNavigator from '@/navigations/MainNavigator';
import store, { persistor } from '@/stores/Store';
import { navigationRef } from '@/utils/RootNavigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.surface,
    },
  };

  const [loaded, error] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer ref={navigationRef} theme={navTheme}>
          <StatusBar style="auto" />
          <MainNavigator />
        </NavigationContainer>
        <Toast position="bottom" bottomOffset={64} visibilityTime={2000} />
      </PersistGate>
    </Provider>
  );
}
