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

    // Update Profile (for contact information/email)
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/updateProfile",
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          "Content-Type": "application/json",
        },
      }),
    }),

    // Address Endpoints
    addAddress: builder.mutation({
      query: (data) => ({
        url: "/addAddress",
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          "Content-Type": "application/json",
        },
      }),
    }),

    getAddresses: builder.query({
      query: () => ({
        url: "/getAddresses",
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
        },
      }),
    }),

    getAddressById: builder.query({
      query: (id) => ({
        url: `/getAddress/${id}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
        },
      }),
    }),

    updateAddress: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/updateAddress/${id}`,
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          "Content-Type": "application/json",
        },
      }),
    }),

    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/deleteAddress/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
        },
      }),
    }),

    // Order/Checkout Endpoints
    checkout: builder.mutation({
      query: (data) => ({
        url: "/checkout",
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          "Content-Type": "application/json",
        },
      }),
    }),

    getOrders: builder.query({
      query: ({ page = 1, limit = 10, status, paymentStatus } = {}) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (status) params.append("status", status);
        if (paymentStatus) params.append("paymentStatus", paymentStatus);
        return {
          url: `/getOrders?${params.toString()}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          },
        };
      },
    }),

    getOrderById: builder.query({
      query: (id) => ({
        url: `/getOrder/${id}`,
        method: "GET",
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
  useUpdateProfileMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useSyncCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useAddAddressMutation,
  useGetAddressesQuery,
  useGetAddressByIdQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useCheckoutMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
} = customerApi;

