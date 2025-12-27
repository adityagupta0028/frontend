import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetUrl } from "../config/GetUrl";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: GetUrl.API_URL + "/api/v1/Customer",
  }),
  endpoints: (builder) => ({
    // Customer Signup
    signup: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        }
      }),
    }),

    // Customer Login
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        }
      }),
    }),

    // Google OAuth Login
    googleLogin: builder.mutation({
      query: (data) => ({
        url: "/google-login",
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }),
    }),

    // Facebook OAuth Login
    facebookLogin: builder.mutation({
      query: (data) => ({
        url: "/facebook-login",
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }),
    }),

    // Get Customer Profile
    getProfile: builder.query({
      query: () => ({
        url: "/getProfile",
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
        },
      }),
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
        },
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useFacebookLoginMutation,
  useGetProfileQuery,
  useLogoutMutation,
} = customerApi;

