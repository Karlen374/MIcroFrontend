import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import HistoryList from './components/HistoryList/HistoryList';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<HistoryList />);