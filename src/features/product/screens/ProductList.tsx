import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGetProductQuery } from '../api/ProductApi';
import ProductItem from '../components/ProductItem';

import EmptyState from '@/components/EmptyState';
import Skeleton from '@/components/Skeleton';
import { colors } from '@/config/Constants';

const SKELETON_WIDTH = (Dimensions.get('window').width - 2 * 20 - 16) / 2;

export default function ProductList() {
  const {
    data: productsData,
    isLoading: productsLoading,
    isFetching: productsFetching,
    refetch: productsRefetch,
  } = useGetProductQuery();
  const logo = require('@/assets/logo.png');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Image source={logo} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.container}>
        {productsLoading || productsFetching ? (
          <View style={styles.skeletonContainer}>
            {Array.from(Array(8).keys()).map((_, i) => {
              const hasMarginRight = i % 2 == 0;
              return (
                <Skeleton
                  key={i}
                  style={{
                    marginRight: hasMarginRight ? 16 : 0,
                    ...styles.skeleton,
                  }}
                />
              );
            })}
          </View>
        ) : (
          <FlatList
            keyExtractor={(_, i) => String(i)}
            data={productsData}
            numColumns={2}
            refreshControl={
              <RefreshControl
                refreshing={productsFetching}
                onRefresh={() => productsRefetch()}
              />
            }
            ListEmptyComponent={() => (
              <EmptyState
                title="Produk tidak ditemukan"
                subtitle="Kami tidak menemukan produk yang anda inginkan."
              />
            )}
            style={{ flexGrow: 2 }}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({ item }) => {
              return <ProductItem item={item} />;
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 2,
  },
  headerContainer: {
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.grey.light,
  },
  image: {
    height: 24,
    width: 200,
  },
  flatListContainer: {
    paddingTop: 16,
    paddingBottom: 64,
    paddingHorizontal: 20,
  },
  skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  skeleton: {
    height: 250,
    width: SKELETON_WIDTH,
    borderRadius: 4,
    marginBottom: 16,
  },
});
