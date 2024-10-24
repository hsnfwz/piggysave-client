import { useAuth0 } from '@auth0/auth0-react';

function NavBar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
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
    <div className="w-full flex justify-between bg-slate-800 border-b-2 border-b-slate-700">
      <div className="flex">
        <a href="/" className={`${window.location.pathname === '/' ? 'bg-sky-300 text-white pointer-events-none' : ''} px-4 py-2 hover:bg-black hover:text-white`}>Home</a>
        <a href="/z" className={`${window.location.pathname === '/z' ? 'bg-sky-300 text-white pointer-events-none' : ''} px-4 py-2 hover:bg-black hover:text-white`}>Not Found</a>
        {isAuthenticated && (
          <>
            <a href="/dashboard" className={`${window.location.pathname === '/dashboard' ? 'bg-sky-300 text-white pointer-events-none' : ''} px-4 py-2 hover:bg-black hover:text-white`}>Dashboard</a>
            <a href="/profile" className={`${window.location.pathname === '/profile' ? 'bg-sky-300 text-white pointer-events-none' : ''} px-4 py-2 hover:bg-black hover:text-white`}>Profile</a>
            {/* <a href="/admin" className={`${window.location.pathname === '/admin' ? 'bg-sky-300 text-white' : 'bg-white text-black'} px-4 py-2 hover:bg-black hover:text-white`}>Admin</a> */}
          </>
        )}
      </div>
      <div className="flex">
        {!isAuthenticated && (
          <>
            <button type="button" onClick={handleSignUp} className="px-4 py-2 bg-sky-300 hover:bg-sky-500">Sign Up</button>
            <button type="button" onClick={handleLogin} className="px-4 py-2 bg-sky-300 hover:bg-sky-500">Log In</button>
          </>
        )}
        {isAuthenticated && (
          <>
            <button type="button" onClick={handleLogout} className="px-4 py-2 bg-sky-300 hover:bg-sky-500">Log Out</button>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
