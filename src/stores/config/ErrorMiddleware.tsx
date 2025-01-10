import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

import { typography } from '@/config/Constants';

export const ErrorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: action.error.message,
      text1Style: typography['label3'],
      text2Style: typography['paragraph3'],
    });
  }

  return next(action);
};
