import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "./Services/LoginApi";

import { categoryApi } from "./Services/CategoryApi";
import { privacyPolicyApi } from "./Services/PrivacyPolicy";
import { termConditionApi } from "./Services/TermCondition";
//import { aboutUsApi } from "./Services/AboutUsApi";
import { faqApi } from "./Services/FaqApi";
import { orderApi } from "./Services/OrderApi";
import {ProductApi} from "./Services/ProductApi";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [privacyPolicyApi.reducerPath]: privacyPolicyApi.reducer,
    [termConditionApi.reducerPath]: termConditionApi.reducer,
    // [aboutUsApi.reducerPath]: aboutUsApi.reducer,
    [faqApi.reducerPath]: faqApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      categoryApi.middleware,
      privacyPolicyApi.middleware,
      termConditionApi.middleware,
      // aboutUsApi.middleware,
      faqApi.middleware,
      orderApi.middleware,
      ProductApi.middleware,
    ),
});
