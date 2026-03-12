import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './screens/HomePage';
import { AttendancePage } from './screens/AttendancePage';
import { SchedulePage } from './screens/SchedulePage';
import { RequestsPage } from './screens/RequestsPage';
import { ChatPage } from './screens/ChatPage';
// NavBar is imported inside each screen component

const rootElement = document.getElementById('app') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

