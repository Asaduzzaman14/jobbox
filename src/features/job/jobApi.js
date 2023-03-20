import apiSlice from "../api/apiSlice";


const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation({
            query: (data) => ({
                method: 'POST',
                url: '/job',
                body: data
            })
        }),
        getJob: builder.query({
            query: (data) => ({
                url: '/jobs',
            })
        }),
        getJobById: builder.query({
            query: (id) => ({
                url: `/job/${id}`,
            })
        }),
    })
})


export const { usePostJobMutation, useGetJobQuery, useGetJobByIdQuery } = jobApi