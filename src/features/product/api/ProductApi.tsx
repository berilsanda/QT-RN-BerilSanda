import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Product, ProductResponse } from '@/types/ProductModel';

export const productAPI = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://dummyjson.com/` }),
  endpoints: (builder) => ({
    getProduct: builder.query<Product[], void>({
      query: () => {
        return {
          method: 'GET',
          url: 'products',
          params: {
            limit: 20,
          },
        };
      },
      transformResponse: (response: ProductResponse) => response.products || [],
    }),
  }),
});

export const { useGetProductQuery } = productAPI;
