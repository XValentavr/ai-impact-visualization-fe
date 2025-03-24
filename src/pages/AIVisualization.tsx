import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useGetProjectsQuery } from '../services/projects.ts';
import { BubbleChart } from '../components/BubbleChart.tsx';
import { useSearchParams } from 'react-router-dom';
import { useGetIssuesStatsQuery } from '../services/jiraIssues.ts';
import { useGetTeamsQuery } from '../services/teams.ts';
import { Close, Search } from '@mui/icons-material';

const formatter = Intl.NumberFormat('en', { notation: 'compact' });

const infoBoxStyles = {
  border: 1,
  borderColor: 'grey.400',
  borderRadius: 1,
  p: 2,
  width: { xs: '100%', sm: '50%' },
};

export const AIVisualization: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(key, value);
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const deleteParam = useCallback(
    (key: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete(key);
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const { data: projects } = useGetProjectsQuery();
  const { data: teams } = useGetTeamsQuery();
  const { data, error, isLoading, isFetching } = useGetIssuesStatsQuery({
    projectId: searchParams.get('project') || undefined,
    teamId: searchParams.get('team') || undefined,
    engineerId: searchParams.get('engineer') || undefined,
  });

  const [engineerValue, setEngineerValue] = useState(
    searchParams.get('engineer') || '',
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      if (engineerValue.trim()) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('engineer', engineerValue);
        setSearchParams(newParams);
      } else {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('engineer');
        setSearchParams(newParams);
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [engineerValue, searchParams, setSearchParams]);

  return (
    <Stack
      sx={{
        paddingTop: 5,
        paddingBottom: 5,
        gap: 6,
        minHeight: '100vh',
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h1">Copilot Impact</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="engineer-search">
              Search by engineer id
            </InputLabel>
            <Input
              type="number"
              id="engineer-search"
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
              onChange={(e) => setEngineerValue(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="select-project-label">Project</InputLabel>
            <Select
              labelId="select-project-label"
              value={searchParams.get('project') || ''}
              label="Project"
              onChange={(e) => setParam('project', e.target.value)}
              variant="outlined"
              endAdornment={
                <InputAdornment
                  sx={{ position: 'absolute', right: 32 }}
                  position="end"
                >
                  <IconButton onClick={() => deleteParam('project')}>
                    <Close />
                  </IconButton>
                </InputAdornment>
              }
            >
              {projects?.results?.map((project) => (
                <MenuItem key={project.id + project.name} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="select-team-label">Team</InputLabel>
            <Select
              labelId="select-team-label"
              value={searchParams.get('team') || ''}
              label="Team"
              onChange={(e) => setParam('team', e.target.value)}
              variant="outlined"
              endAdornment={
                <InputAdornment
                  sx={{ position: 'absolute', right: 32 }}
                  position="end"
                >
                  <IconButton onClick={() => deleteParam('team')}>
                    <Close />
                  </IconButton>
                </InputAdornment>
              }
            >
              {teams?.results?.map((team) => (
                <MenuItem key={team.id + team.name} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <Box
        sx={{
          width: '100%',
          minHeight: '70vh',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {isLoading || isFetching ? (
          <CircularProgress sx={{ margin: 'auto' }} />
        ) : error ? (
          <Typography variant="h1">Error fetching data</Typography>
        ) : (
          <>
            <Stack
              spacing={3}
              direction={{ xs: 'column', sm: 'row' }}
              sx={{ width: '100%' }}
            >
              <Box sx={infoBoxStyles}>
                <Typography variant="subtitle1">
                  Issues assisted by Copilot
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Typography variant="h1">
                    {formatter.format(data?.results?.length || 0)}
                  </Typography>
                  <Typography variant="subtitle1">
                    ({formatter.format(data?.total_ai_commits || 0)} commits)
                  </Typography>
                </Box>
              </Box>
              <Box sx={infoBoxStyles}>
                <Typography variant="subtitle1">
                  Percentage of AI commits
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Typography variant="h1">
                    {formatter.format(data?.avg_proportion_ai_commits || 0)}%
                  </Typography>
                </Box>
              </Box>
            </Stack>
            <Box
              sx={{
                width: '100%',
                position: 'relative',
                minHeight: '50vh',
                height: '100%',
              }}
            >
              {data && <BubbleChart data={data} />}
            </Box>
          </>
        )}
      </Box>
    </Stack>
  );
};
