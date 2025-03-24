export type IssueMetrics = {
  jira_issue_id: number;
  ai_commits: number;
  non_ai_commits: number;
  lines_of_code_ai: number;
  lines_of_code_non_ai: number;
};

export type ListIssueMetrics = {
  results: IssueMetrics[];
  total_ai_commits: number;
  avg_proportion_ai_commits: number;
};
