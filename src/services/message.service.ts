import { callExternalApi } from './external-api.service';

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

const getPublicResource = async () => {
  const config = {
    url: `${apiServerUrl}/api/messages/public`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  };

  const { data, error } = await callExternalApi(config);

  return {
    data: data || null,
    error,
  };
};

const getProtectedResource = async (accessToken:any, url:any) => {
  const config = {
    url: url || `${apiServerUrl}/api/messages/protected`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi(config);

  return {
    data: data || null,
    error,
  };
};

const postProtectedResource = async (accessToken:any, url:any, body:any) => {
  const config = {
    url: url || `${apiServerUrl}/api/messages/protected`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  };

  const { data, error } = await callExternalApi(config);

  return {
    data: data || null,
    error,
  };
};

const putProtectedResource = async (accessToken:any, url:any, body:any) => {
  const config = {
    url: url || `${apiServerUrl}/api/messages/protected`,
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  };

  const { data, error } = await callExternalApi(config);

  return {
    data: data || null,
    error,
  };
};

const deleteProtectedResource = async (accessToken:any, url:any) => {
  const config = {
    url: url || `${apiServerUrl}/api/messages/protected`,
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi(config);

  return {
    data: data || null,
    error,
  };
};

const getAdminResource = async (accessToken:any) => {
  const config = {
    url: `${apiServerUrl}/api/messages/admin`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi(config);

  return {
    data: data || null,
    error,
  };
};

export {
  getPublicResource,
  getProtectedResource,
  getAdminResource,
  postProtectedResource,
  putProtectedResource,
  deleteProtectedResource,
};
