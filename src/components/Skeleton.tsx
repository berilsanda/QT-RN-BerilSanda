import { MotiView } from 'moti';
import React, { memo } from 'react';
import { ViewProps, ViewStyle } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

interface SkeletonProps extends ViewProps {
  style?: ViewStyle;
}

const Skeleton: React.FC<SkeletonProps> = ({ style: AddOnStyle, ...props }) => {
  return (
    <MotiView
      {...props}
      style={AddOnStyle}
      from={{ backgroundColor: '#ddd' }}
      animate={{ backgroundColor: '#eee' }}
      transition={{
        duration: 1000,
        loop: true,
        repeatReverse: true,
      }}
      entering={FadeIn.springify().damping(80).stiffness(100)}
      exiting={FadeOut.springify().damping(80).stiffness(100)}
    />
  );
};

export default memo(Skeleton);
