import { useAuth0 } from '@auth0/auth0-react';

import logoSvg from '../assets/logo.svg';

function NavBar() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <div className="w-full max-w-max h-screen sticky top-0 left-0 z-50 bg-slate-900 border-r border-r-slate-800 hidden lg:flex lg:flex-col">
      <div className="flex flex-col">
        <a
          href="/"
          className={`${window.location.pathname === '/' ? 'bg-slate-800 text-white pointer-events-none' : ''} px-4 py-2 hover:bg-slate-700 flex gap-2 items-center`}
        >
          <img
            src={logoSvg}
            alt="logo"
            className="object-contain w-full h-[40px]"
          />
          <span className="text-2xl font-bold">PiggySave</span>
        </a>
        <a
          href="/dashboard"
          className={`${window.location.pathname === '/dashboard' ? 'bg-slate-800 text-white pointer-events-none' : ''} px-4 py-2 hover:bg-slate-700`}
        >
          Dashboard
        </a>
        <a
          href="/profile"
          className={`${window.location.pathname === '/profile' ? 'bg-slate-800 text-white pointer-events-none' : ''} px-4 py-2 hover:bg-slate-700`}
        >
          Profile
        </a>
      </div>
      <div className="flex flex-col mt-auto p-4 gap-4">
        <button
          type="button"
          onClick={handleLogout}
          className="rounded px-4 py-2 bg-sky-700 hover:bg-sky-800"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default NavBar;
