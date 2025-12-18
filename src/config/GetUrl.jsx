export const GetUrl = {
  API_URL: import.meta.env.VITE_API_URL,
  IMAGE_URL: import.meta.env.VITE_IMAGE_URL,
};

console.log("API URL:", GetUrl.API_URL);