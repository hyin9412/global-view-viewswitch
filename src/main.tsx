import '@arco-design/theme-ve-o-design/css/arco.css';
import '@tod-m/materials/ve-o/es/style/index.css';
import '@tod-m/materials/es/style/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { XConfigProvider } from '@tod-m/materials';
import App from './App';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <XConfigProvider>
      <App />
    </XConfigProvider>
  </React.StrictMode>,
);
