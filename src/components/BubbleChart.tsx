import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { ListIssueMetrics } from '../types/jiraIssues.ts';
import { useMemo } from 'react';

const options = {
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Commits',
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Lines of code',
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

type BubbleChartProps = {
  data: ListIssueMetrics;
};

export const BubbleChart = ({ data }: BubbleChartProps) => {
  const chartData = useMemo(
    () => ({
      datasets: [
        {
          label: 'AI dataset',
          data: data.results.map((result) => ({
            x: result.ai_commits,
            y: result.lines_of_code_ai,
          })),
          backgroundColor: 'rgba(28, 60, 108, 0.5)',
        },
        {
          label: 'Non AI dataset',
          data: data.results.map((result) => ({
            x: result.non_ai_commits,
            y: result.lines_of_code_non_ai,
          })),
          backgroundColor: 'rgba(254, 136, 54, 0.5)',
        },
      ],
    }),
    [data],
  );

  return <Scatter data={chartData} options={options} />;
};
