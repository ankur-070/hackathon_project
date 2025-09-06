import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Item', 'User', 'Comment'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // Item endpoints
    getItems: builder.query({
      query: (filters = {}) => ({
        url: '/items',
        params: filters,
      }),
      providesTags: ['Item'],
    }),
    getItemById: builder.query({
      query: (id) => `/items/${id}`,
      providesTags: (result, error, id) => [{ type: 'Item', id }],
    }),
    createItem: builder.mutation({
      query: (formData) => ({
        url: '/items',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Item'],
    }),
    updateItem: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/items/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Item', id }],
    }),

    // Comment endpoints
    getComments: builder.query({
      query: (itemId) => `/items/${itemId}/comments`,
      providesTags: ['Comment'],
    }),
    addComment: builder.mutation({
      query: ({ itemId, content }) => ({
        url: `/items/${itemId}/comments`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetItemsQuery,
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
} = apiSlice;
