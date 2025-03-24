import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TeamList } from '../types/teams.ts';

const BASE_URL = `${import.meta.env.VITE_API_URL}/teams`;

export const teamsApi = createApi({
  reducerPath: 'teamsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getTeams: builder.query<TeamList, void>({
      query: () => '/',
    }),
  }),
});

export const { useGetTeamsQuery } = teamsApi;
