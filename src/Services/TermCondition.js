import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetUrl } from "../config/GetUrl";

export const termConditionApi = createApi({
  reducerPath: "termConditionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: GetUrl.API_URL,
  }),
  endpoints: (builder) => ({
   
    TermConditionPost: builder.mutation({
      query: (data) => ({
        url: "/admin/add-terms-conditions",
        method: "POST",
        body: data,
        headers: {
            authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          },
        
      }),
    }),

  }),
});

export const {
    useTermConditionPostMutation,
} = termConditionApi;
