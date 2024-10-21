import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../buttons/login-button";
import LogoutButton from "../../buttons/logout-button";
import SignupButton from "../../buttons/signup-button";

function MobileNavBarButtons() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="mobile-nav-bar__buttons">
      {!isAuthenticated && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {isAuthenticated && (
        <>
          <LogoutButton />
        </>
      )}
    </div>
  );
};

export default MobileNavBarButtons;
