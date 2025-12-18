import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetUrl } from "../config/GetUrl";

export const ProductApi = createApi({
    reducerPath: "ProductApi",
    baseQuery: fetchBaseQuery({
        baseUrl: GetUrl.API_URL+"/api/v1/Customer",
    }),
    endpoints: (builder) => ({
   
        GetProduct: builder.query({
            query: (data) => ({
                url: `/getProducts`,
                method: "POST",
                body: data,
                headers: {
                    authorization: `Bearer ${localStorage.getItem("customerToken")}`,
                },
            }),
        }),

        GetSingleProduct: builder.query({
            query: (id) => ({
                url: `/getProductDetails?productId=${id}`,
                method: "GET",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("customerToken")}`,
                },
            }),
        }),
       
       
    }),
});

export const {
    useGetProductQuery,
    useGetSingleProductQuery,
} = ProductApi;
