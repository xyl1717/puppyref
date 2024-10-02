import api from './api';

const puppyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPuppies: build.query({
      query: () => '/puppies',
      providesTags: ['Puppy'], // Invalidate this tag when data changes
      transformResponse: (response) => response.data, // Optional: transform the response
      transformErrorResponse: (error) => ({ errorMessage: error.message }), // Optional: transform errors
    }),
    getPuppy: build.query({
      query: (id) => `/puppies/${id}`,
      providesTags: (result, error, id) => [{ type: 'Puppy', id }],
    }),
    addPuppy: build.mutation({
      query: (newPuppy) => ({
        url: '/puppies',
        method: 'POST',
        body: newPuppy,
      }),
      invalidatesTags: ['Puppy'], // Invalidate to trigger refetching
    }),
    deletePuppy: build.mutation({
      query: (id) => ({
        url: `/puppies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Puppy'], // Invalidate to trigger refetching
    }),
  }),
});

export const {
  useGetPuppiesQuery,
  useGetPuppyQuery,
  useAddPuppyMutation,
  useDeletePuppyMutation,
} = puppyApi;
