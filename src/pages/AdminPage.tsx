import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

import PageLayout from '../layouts/page-layout';
import { getAdminResource } from '../services/message.service';

function AdminPage() {
  const [message, setMessage] = useState('');

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getAdminResource(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  return (
    <PageLayout>
      <span>
        <strong>
          Only authenticated users with the{" "}
          <code>read:admin-messages</code> permission should access this
          page.
        </strong>
      </span>
      <p>{JSON.stringify(message, undefined, 2)}</p>
    </PageLayout>
  );
};

export default AdminPage;
