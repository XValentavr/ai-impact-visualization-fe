import { configureStore } from '@reduxjs/toolkit';
import { projectsApi } from './services/projects.ts';
import { jiraIssuesApi } from './services/jiraIssues.ts';
import { teamsApi } from './services/teams.ts';

export const store = configureStore({
  reducer: {
    [projectsApi.reducerPath]: projectsApi.reducer,
    [jiraIssuesApi.reducerPath]: jiraIssuesApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(projectsApi.middleware)
      .concat(jiraIssuesApi.middleware)
      .concat(teamsApi.middleware),
});
