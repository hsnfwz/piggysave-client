import { redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

// import { deleteProtectedResource } from '../services/message.service';

import PageLayout from '../layouts/PageLayout';
import DeleteUserModal from '../components/DeleteUserModal';

function ProfilePage() {
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  const { user/* , getAccessTokenSilently */ } = useAuth0();

  if (!user) {
    return null;
  }

  const handleDeleteUser = async () => {
    try {
      /* delete profile in Neon database */
      // const accessToken = await getAccessTokenSilently();
      // const neonResult = await deleteProtectedResource(
      //   accessToken,
      //   `http://localhost:5174/api/profiles/${user.sub}`
      // );

      // if (neonResult.data) {
      //   console.log(neonResult.data);
      // }

      // if (neonResult.error) {
      //   console.log(neonResult.error);
      // }

      /* delete user in Auth0 database */
      // redirect('/');
    } catch (error) {
      console.log(error);
      redirect('/server-error');
    }
  };

  const handleCancel = () => {
    setShowDeleteUserModal(false);
  };

  return (
    <PageLayout>
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl">Email</h2>
        <p>{user.email}</p>
      </div>
      {/* <div className="flex flex-col gap-4">
        <h2 className="text-xl">Account</h2>
        <button
          type="button"
          onClick={() => {
            const body = document.querySelector('body');
            if (body) {
              body.style.overflow = 'hidden';
            }
            setShowDeleteUserModal(true);
          }}
          className="px-4 py-2 rounded border border-rose-700 hover:bg-rose-700 self-start"
        >
          Delete Account
        </button>
      </div> */}
      <DeleteUserModal
        showDeleteUserModal={showDeleteUserModal}
        handleCancel={handleCancel}
        handleDeleteUser={handleDeleteUser}
      />
    </PageLayout>
  );
}

export default ProfilePage;
