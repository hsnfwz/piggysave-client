import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';

// components
import AuthenticationGuard from './components/AuthenticationGuard';
import PageLoader from './components/PageLoader';

// pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import ServerErrorPage from './pages/ServerErrorPage';
import CallbackPage from './pages/CallbackPage';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <PageLoader />;
  }

  {/* TODO: create profile in neon on sign up */}
  {/* TODO: delete profile in auth0 and neon on delete account */}


      {/* TODO: table totals + filters */}
      {/* TODO: limit table transactions displayed at once + load more button  */}
      {/* TODO: prevent tab focus behind modal - look into "focus trap" */}
      {/* TODO: exit modal with escape key */}
      {/* TODO: only call refresh chart data for edits that changed their amounts and their types (not for name changes) */}
      {/* TODO: only refresh chart data by filters when filters are different than before */}

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
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/server-error" element={<ServerErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
