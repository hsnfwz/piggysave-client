import { useAuth0 } from '@auth0/auth0-react';

import logoSvg from '../assets/logo.svg';
import profileCircleSvg from '../assets/profile-circle.svg';
import graphUp from '../assets/graph-up.svg';

function NavBarMobile() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <div className="w-full fixed bottom-0 left-0 z-50 bg-slate-900/75 border-t border-t-slate-800 flex lg:hidden backdrop-blur">
      <div className="flex w-full">
        <a
          href="/"
          className={`${window.location.pathname === '/' ? 'bg-slate-800 text-white pointer-events-none' : ''} p-4 hover:bg-slate-700 flex items-center w-full`}
        >
          <img
            src={logoSvg}
            alt="logo"
            className="object-contain w-full h-[40px]"
          />
        </a>

        <a
          href="/dashboard"
          className={`${window.location.pathname === '/dashboard' ? 'bg-slate-800 text-white pointer-events-none' : ''} p-4 hover:bg-slate-700 flex items-center w-full`}
        >
          <img
            src={graphUp}
            alt="dashboard"
            className="object-contain w-full h-[24px]"
          />
        </a>
        <a
          href="/profile"
          className={`${window.location.pathname === '/profile' ? 'bg-slate-800 text-white pointer-events-none' : ''} p-4 hover:bg-slate-700 flex items-center w-full`}
        >
          <img
            src={profileCircleSvg}
            alt="profile"
            className="object-contain w-full h-[24px]"
          />
        </a>
      </div>
      <div className="flex p-4 gap-4 w-full">
        <button
          type="button"
          onClick={handleLogout}
          className="rounded px-4 py-2 bg-sky-700 hover:bg-sky-800 ml-auto"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default NavBarMobile;
