import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layout/Layout.tsx';
import { AIVisualization } from '../pages/AIVisualization.tsx';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AIVisualization />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
