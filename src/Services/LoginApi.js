import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetUrl } from "../config/GetUrl";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: GetUrl.API_URL,
  }),
  endpoints: (builder) => ({
   
    LoginPost: builder.mutation({
      query: (data) => ({
        url: "api/v1/Admin/login",
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        }
        
      }),
    }),
    getTotalCustomer: builder.query({
    query: () => ({
      url: `api/v1/Admin/get-total-customer`,
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("customerToken")}`,
      },
    }),
  }),
  getTotalRetailer: builder.query({
    query: () => ({
      url: `api/v1/Admin/get-total-retailer`,
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("customerToken")}`,
      },
    }),
  }),
  getDashboardData: builder.query({
    query: () => ({
      url: `/api/v1/Admin/getRecentOrders`,
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("customerToken")}`,
      },
    }),
  }),
  
  }),
});

export const {
  useLoginPostMutation,
  useGetTotalCustomerQuery,
  useGetTotalRetailerQuery,
  useGetDashboardDataQuery
} = loginApi;
