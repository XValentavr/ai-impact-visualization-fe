import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ListIssueMetrics } from '../types/jiraIssues.ts';

const BASE_URL = `${import.meta.env.VITE_API_URL}/jira-issues`;

interface GetIssuesStatsParams {
  projectId?: string;
  teamId?: string;
  engineerId?: string;
}

export const jiraIssuesApi = createApi({
  reducerPath: 'jiraIssuesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getIssuesStats: builder.query<ListIssueMetrics, GetIssuesStatsParams>({
      query: ({ projectId, teamId, engineerId }) => ({
        url: '/stats',
        params: {
          ...(projectId !== undefined && { project_id: projectId }),
          ...(teamId !== undefined && { team_id: teamId }),
          ...(engineerId !== undefined && { engineer_id: engineerId }),
        },
      }),
    }),
  }),
});

export const { useGetIssuesStatsQuery } = jiraIssuesApi;
