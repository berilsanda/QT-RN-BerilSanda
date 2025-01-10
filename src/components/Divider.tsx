import React from 'react';
import { View, ViewStyle } from 'react-native';

import { colors } from '@/config/Constants';

interface DividerProps {
  style?: ViewStyle;
}

const Divider: React.FC<DividerProps> = ({ style: AddOnStyle }) => {
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderColor: colors.grey.light,
        ...AddOnStyle,
      }}
    />
  );
};

export default Divider;
