import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { theme } from './theme/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import './styles/base.css';
import { store } from './store.ts';
import { AppRoutes } from './router/AppRoutes.tsx';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
