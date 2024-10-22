import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

import PageLayout from '../layouts/PageLayout';

function ProfilePage() {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  useEffect(() => {
    let isMounted = true;

    console.log(user);

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <PageLayout>
      <span>
        You can use the <strong>ID Token</strong> to get the profile
        information of an authenticated user.
      </span>
      <p>{JSON.stringify(user, undefined, 2)}</p>
    </PageLayout>
  );
};

export default ProfilePage;
