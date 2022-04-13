import { App } from '@app';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = document.getElementById('root');
if (root) {
  ReactDOM.hydrateRoot(root, <App />);
}
