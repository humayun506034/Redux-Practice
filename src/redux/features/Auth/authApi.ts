import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({

  
  endpoints: (builders) => ({
    login: builders.mutation({
      query: (creadentials) => {
        console.log({ creadentials });
        return {
          url: "/auth/login",
          method: "POST",
          body: creadentials,
        };
      },
    }),

    getMyProfileInfo : builders.query({
      query: (token: string) => {
        console.log("🚀 ~ token:", token)
        console.log(token)
        return {
          url: "/user/me",
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
    })
  }),
});

export const { useLoginMutation, useGetMyProfileInfoQuery } = authApi;
