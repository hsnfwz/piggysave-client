import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';

// components
import AuthenticationGuard from './components/AuthenticationGuard';
import PageLoader from './components/PageLoader';

// pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
// import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import CallbackPage from './pages/CallbackPage';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <PageLoader />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/dashboard"
        element={<AuthenticationGuard component={DashboardPage} />}
      />
      <Route
        path="/profile"
        element={<AuthenticationGuard component={ProfilePage} />}
      />
      {/* <Route
        path="/admin"
        element={<AuthenticationGuard component={AdminPage} />}
      /> */}
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
