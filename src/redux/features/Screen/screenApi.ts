import { baseApi } from "../../api/baseApi";

const screenApi = baseApi.injectEndpoints({
  endpoints: (builders) => ({
    getAllScreen: builders.query({
      // Accept a single object parameter with page and searchTerm properties
      query: ({ page, searchTerm }: { page: string; searchTerm: string }) => {
        console.log("🚀 ~ page:", page);
        console.log("🚀 ~ searchTerm:", searchTerm);
        return {
          url: `screen?page=${page}&searchTerm=${encodeURIComponent(searchTerm)}`,
          method: "GET",
          // headers: { Authorization: `${token}` }, // if needed
        };
      },
    }),

    getSingleScreen: builders.query({
      query: (slug: string) => {
        return {
          url: `screen/${slug}`,
          method: "GET",
        };
      },
    })
  }),
});

export const { useGetAllScreenQuery, useGetSingleScreenQuery } = screenApi;
