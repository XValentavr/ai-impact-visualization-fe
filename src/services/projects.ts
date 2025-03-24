import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectList } from '../types/projects.ts';

const BASE_URL = `${import.meta.env.VITE_API_URL}/projects`;

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectList, void>({
      query: () => '/',
    }),
  }),
});

export const { useGetProjectsQuery } = projectsApi;
