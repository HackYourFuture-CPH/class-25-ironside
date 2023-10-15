import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUpPage from './pages/signup/Signup';
import LoginPage from './pages/login/Login';
import { AuthProvider } from './contexts/authContext';
import ResetPassword from './pages/password/Reset';
import PrivateRoute from './routes/PrivateRoute';
import Main from './pages/main/Main';
import Home from './pages/home/Home';
import Schedule from './pages/schedule/Schedule';
import Company from './pages/company/Company';
import Messages from './pages/messages/Messages';
import History from './pages/history/History';
import EventPage from './pages/eventPage/EventPage';
import JobDetail from './components/JobDetail/JobDetail';
import AdminRoute from './routes/AdminRoute';
import AdminPage from './pages/admin/adminPage/AdminPage';
import AllJobsApply from './pages/admin/allJobsApply/AllJobs';
import ApplyForm from './components/ApplyForm/ApplyForm';
import CompanyDetail from './components/Company/CompanyDetails';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/password',
    element: <ResetPassword />,
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/event',
        element: <EventPage />,
      },
      {
        path: '/schedule',
        element: <Schedule />,
      },
      {
        path: '/history',
        element: <History />,
      },
      {
        path: '/company',
        element: <Company />,
      },
      {
        path: '/messages',
        element: <Messages />,
      },
      {
        path: '/jobdetails/:jobId',
        element: <JobDetail />,
      },
      {
        path: '/applyform/:jobId',
        element: <ApplyForm />,
      },
      {
        path: '/CompanyDetails/:companyId',
        element: <CompanyDetail />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <Main />
      </AdminRoute>
    ),
    children: [
      {
        path: '',
        element: <AdminPage />,
      },
      {
        path: 'see-all',
        element: <AllJobsApply />,
      },
    ],
  },
]);

function App(): JSX.Element {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
