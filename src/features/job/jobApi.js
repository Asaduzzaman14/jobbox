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
        }),
        getJob: builder.query({
            query: (data) => ({
                url: '/jobs',
            }),
            providesTags: ["jobs"]
        }),
        getApplyedJobs: builder.query({
            query: (email) => ({
                url: `/applied-jobs/${email}`,
            }),
        }),
        getJobById: builder.query({
            query: (id) => ({
                url: `/job/${id}`,
            })
        }),
    })
})


export const {
    usePostJobMutation,
    useGetJobQuery,
    useGetApplyedJobsQuery,
    useGetJobByIdQuery,
    useApplyMutation,
    useQuestionsMutation
} = jobApi;
