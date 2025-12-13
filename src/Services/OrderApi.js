import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetUrl } from "../config/GetUrl";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: GetUrl.API_URL,
  }),
  endpoints: (builder) => ({
    GetOrders: builder.query({
      query: ({page=1, offset=20,search}) => ({
        url: `/api/v1/Admin/getOrders?search=${search}&page=${page}&limit=${offset}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
        },
      }),
    }),
    GetOrderDetail: builder.query({
      query: (id) => ({
        url: `/admin/get-order-detail/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
        },
      }),
    }),
    DeleteOrder: builder.mutation({
      query: (id) => ({
        url: `/admin/delete-order/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
        },
      }),
    }),
    GetTransactions: builder.query({
        query: () => ({
          url: "/admin/get-transactions",
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          },
        }),
      }),
      GetTransactionDetail: builder.query({
        query: (id) => ({
          url: `/admin/get-transaction-detail/${id}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          },
        }),
      }),
  }),
});

export const {
useGetOrdersQuery,
useGetOrderDetailQuery,
useDeleteOrderMutation,
useGetTransactionsQuery,
useGetTransactionDetailQuery
} = orderApi;
