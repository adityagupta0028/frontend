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

    // Cart Endpoints
    getCart: builder.query({
      query: () => ({
        url: "/getCart",
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
        },
      }),
    }),

    addToCart: builder.mutation({
      query: (data) => ({
        url: "/addToCart",
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          "Content-Type": "application/json",
        },
      }),
    }),

    syncCart: builder.mutation({
      query: (data) => ({
        url: "/syncCart",
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          "Content-Type": "application/json",
        },
      }),
    }),

    updateCartItem: builder.mutation({
      query: ({ itemId, quantity }) => ({
        url: `/updateCartItem/${itemId}`,
        method: "POST",
        body: { quantity },
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          "Content-Type": "application/json",
        },
      }),
    }),

    removeFromCart: builder.mutation({
      query: ({ itemId }) => ({
        url: `/removeFromCart/${itemId}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
        },
      }),
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: "/clearCart",
        method: "DELETE",
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
  useGetCartQuery,
  useAddToCartMutation,
  useSyncCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = customerApi;

