import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

import PageLayout from '../layouts/PageLayout';

import {
  getProtectedResource,
  postProtectedResource,
  putProtectedResource,
  deleteProtectedResource
} from '../services/message.service.js';

function DashboardPage() {
  const [message, setMessage] = useState('');

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getProtectedResource(accessToken);

      console.log(data, error);

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
      <p>{message}</p>
      <div className="flex gap-4">
        <button type="button" className="p-4 bg-red-300 rounded" onClick={async() => {
          const accessToken = await getAccessTokenSilently();
          const result = await getProtectedResource(accessToken, 'http://localhost:5174/api/transactions');
          console.log('result', result)
        }}>TEST getAll</button>
        <button type="button" className="p-4 bg-red-300 rounded" onClick={async() => {
          const accessToken = await getAccessTokenSilently();
          const result = await getProtectedResource(accessToken, 'http://localhost:5174/api/transactions/1');
          console.log('result', result)
        }}>TEST getOne</button>
        <button type="button" className="p-4 bg-red-300 rounded" onClick={async() => {
          const accessToken = await getAccessTokenSilently();
          const result = await postProtectedResource(accessToken, 'http://localhost:5174/api/transactions', {
            name: 'Boba',
            type: 'EXPENSE',
            amount: 7.5,
          });
          console.log('result', result)
        }}>TEST add</button>
          <button type="button" className="p-4 bg-red-300 rounded" onClick={async() => {
          const accessToken = await getAccessTokenSilently();
          const result = await putProtectedResource(accessToken, 'http://localhost:5174/api/transactions/1', {
            name: 'Salary',
            type: 'INCOME',
            amount: 5000
          });
          console.log('result', result)
        }}>TEST update</button>
          <button type="button" className="p-4 bg-red-300 rounded" onClick={async() => {
          const accessToken = await getAccessTokenSilently();
          const result = await deleteProtectedResource(accessToken, 'http://localhost:5174/api/transactions/3');
          console.log('result', result)
        }}>TEST delete</button>
      </div>
    </PageLayout>
  );
}

export default DashboardPage;
