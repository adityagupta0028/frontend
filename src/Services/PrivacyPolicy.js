import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetUrl } from "../config/GetUrl";

export const privacyPolicyApi = createApi({
  reducerPath: "privacyPolicyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: GetUrl.API_URL,
  }),
  endpoints: (builder) => ({
   
    PrivacyPolicyPost: builder.mutation({
      query: (data) => ({
        url: "/admin/add-privacyPolicy",
        method: "POST",
        body: data,
        headers: {
            authorization: `Bearer ${localStorage.getItem("tokenAdmin")}`,
          },
        
      }),
    }),

  }),
});

export const {
    usePrivacyPolicyPostMutation,
} = privacyPolicyApi;
