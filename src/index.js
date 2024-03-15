import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RouteProvider } from './Components/RouteContext'; // Import the context provider
import Map from './Pages/Map';
import Risk from './Pages/Risk';

import Dashboard from './Pages/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Home" element={<Dashboard />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/Risk" element={<Risk />} />
        </Routes>
      </RouteProvider>
    </BrowserRouter>
  </React.StrictMode>
);