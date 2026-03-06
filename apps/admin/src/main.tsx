import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from './shell/AppShell';
import { DashboardPage } from './shell/DashboardPage';
import { LoginPage } from './shell/LoginPage';
import { SchedulePage } from './features/schedule/SchedulePage';
import { TimeAttendancePage } from './features/time-attendance/TimeAttendancePage';
import { RequestsPage } from './features/requests/RequestsPage';
import { PayrollPage } from './features/payroll/PayrollPage';

const rootElement = document.getElementById('app') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="time-and-attendance" element={<TimeAttendancePage />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="payroll" element={<PayrollPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

