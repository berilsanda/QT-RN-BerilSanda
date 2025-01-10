import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '@/config/Constants';

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  const image = require('@/assets/noData.png');

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} resizeMode="contain" />
      <Text style={[typography['label2'], { textAlign: 'center' }]}>
        {title}
      </Text>
      <Text
        style={[
          typography['paragraph3'],
          { textAlign: 'center', color: colors.grey.dark },
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
});

export default EmptyState;
