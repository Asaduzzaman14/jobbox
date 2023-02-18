import apiSlice from "../api/apiSlice";

const authAPi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                method: 'POST',
                url: '/user',
                body: data
            })
        })
    })
})

export const { useRegisterUserMutation } = authAPi
