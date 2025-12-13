import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetUrl } from "../config/GetUrl";

export const faqApi = createApi({
  reducerPath: "faqApi",
  baseQuery: fetchBaseQuery({
    baseUrl: GetUrl.API_URL,
  }),
  endpoints: (builder) => ({
   
    FaqPost: builder.mutation({
      query: (data) => ({
        url: "/api/v1/Admin/createFaq",
        method: "POST",
        body: data,
        headers: {
            authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          },
        
      }),
    }),
    GetFaq: builder.query({
        query: ({search,limit,page}) => ({
          url: `/api/v1/Admin/getAllFaq?search=${search}&limit=${limit}&page=${page}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          },
        }),
      }),
      GetSingleFaq: builder.query({
        query: (id) => ({
          url: `/api/v1/Admin/getFaqById/${id}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          },
        }),
      }),
      EditFaq: builder.mutation({
        query: ({ id, data }) => ({
          url: `/api/v1/Admin/updateFaq/${id}`,
          method: "PUT",
          body: data,
          headers: {
            authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          },
        }),
      }),
      deleteFaq: builder.mutation({
        query: (id) => ({
          url: `/api/v1/Admin/deleteFaq/${id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          },
        }),
      }),

  }),
});

export const {
    useFaqPostMutation,
    useGetFaqQuery,
    useGetSingleFaqQuery,
    useEditFaqMutation,
    useDeleteFaqMutation
} = faqApi;
