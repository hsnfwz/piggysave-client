import { useAuth0 } from '@auth0/auth0-react';

import PageLayout from '../layouts/PageLayout';

function CallbackPage() {
  const { error } = useAuth0();

  if (error) {
    return (
      <PageLayout>
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="">{error.message}</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <h1 className="text-2xl font-bold">Success</h1>
    </PageLayout>
  );
}

export default CallbackPage;
