import apiSlice from "../api/apiSlice";
import { getUser } from "./authSlice";

const authAPi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: '/user',
                body: data
            }),
            async onQueryStart(data, { dispatch, queryFullfiled }) {
                try {
                    const res = await queryFullfiled;
                    dispatch(getUser())
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
})

export const { useRegisterUserMutation } = authAPi
