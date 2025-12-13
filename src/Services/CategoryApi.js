import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetUrl } from "../config/GetUrl";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: GetUrl.API_URL,
  }),
  endpoints: (builder) => ({
    GetCategory: builder.query({
      query: () => ({
        url: `/getCategories`,
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
        },
      }),
    }),
    GetSingleCategory: builder.query({
      query: (id) => ({
        url: `/api/v1/Admin/getCategoryDetail/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
        },
      }),
    }),

    GetSubCategory: builder.query({
      query: (categoryId) => ({
        url: `/getSubcategories?categoryId=${categoryId}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
        },
      }),
    }),

    
  }),
});

export const {
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
  useGetSubCategoryQuery
} = categoryApi;
