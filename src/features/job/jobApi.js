import apiSlice from "../api/apiSlice";


const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation({
            query: (data) => ({
                method: 'POST',
                url: '/job',
                body: data
            }),
            invalidatesTags: ["jobs"]
        }),
        getJob: builder.query({
            query: (data) => ({
                url: '/jobs',
            }),
            providesTags: ["jobs"]
        }),
        apply: builder.mutation({
            query: (data) => ({
                method: 'PATCH',
                url: '/apply',
                body: data
            }),
        }),
        questions: builder.mutation({
            query: (data) => ({
                method: 'PATCH',
                url: '/query',
                body: data
            }),
            invalidatesTags: ["job"]
        }),
        reply: builder.mutation({
            query: (data) => ({
                method: 'PATCH',
                url: '/reply',
                body: data
            }),
            providesTags: ["job"]
        }),
        getApplyedJobs: builder.query({
            query: (email) => ({
                url: `/applied-jobs/${email}`,
            }),
        }),
        getJobById: builder.query({
            query: (id) => ({
                url: `/job/${id}`,
            }),
            providesTags: ["job"]
        }),
    })
})


export const {
    usePostJobMutation,
    useGetJobQuery,
    useGetApplyedJobsQuery,
    useGetJobByIdQuery,
    useApplyMutation,
    useQuestionsMutation,
    useReplyMutation
} = jobApi;
