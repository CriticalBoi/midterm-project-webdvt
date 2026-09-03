import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
// Our overrides load after Bootstrap so they can flatten/restyle it.
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* ThemeProvider wraps the whole router so theme is available
          to every route without prop drilling (Context API requirement). */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
