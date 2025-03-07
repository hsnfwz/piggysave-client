import { useAuth0 } from '@auth0/auth0-react';

import logoSvg from '../assets/logo.svg';

function HomePage() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/dashboard',
      },
      authorizationParams: {
        prompt: 'login',
      },
    });
  };

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/dashboard',
      },
      authorizationParams: {
        prompt: 'login',
        screen_hint: 'signup',
      },
    });
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-8 items-center justify-center p-8 bg-gradient-to-br from-0% from-slate-950 to-100% to-teal-700">
      <div className="flex gap-4 items-center">
        <img src={logoSvg} alt="logo" className="object-contain h-[64px] lg:h-[128px]" />
        <h1 className="text-center text-5xl lg:text-8xl font-bold">PiggySave</h1>
      </div>
      <p className="text-xl text-center lg:text-left">
        Track your income and expense transactions and get visual breakdowns
        per year, month, and day!
      </p>
      <div className="flex gap-4">
        {!isAuthenticated && (
          <>
            <button
              type="button"
              onClick={handleSignUp}
              className="rounded px-4 py-2 bg-teal-700 hover:bg-teal-800"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleLogin}
              className="rounded px-4 py-2 bg-sky-700 hover:bg-sky-800"
            >
              Log In
            </button>
          </>
        )}
        {isAuthenticated && (
          <>
            <a
              href="/dashboard"
              className={`${window.location.pathname === '/dashboard' ? 'bg-slate-800 text-white pointer-events-none' : ''} rounded border border-slate-700 px-4 py-2 hover:bg-slate-700`}
            >
              Dashboard
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded px-4 py-2 bg-sky-700 hover:bg-sky-800"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
