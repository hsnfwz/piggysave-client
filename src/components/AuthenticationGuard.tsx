import { withAuthenticationRequired } from '@auth0/auth0-react';

import PageLoader from './PageLoader';

function AuthenticationGuard({ component }: any) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => {
      return <PageLoader />;
    },
  });

  return <Component />;
}

export default AuthenticationGuard;
