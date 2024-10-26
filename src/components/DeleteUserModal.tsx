function DeleteUserModal({
  handleDeleteUser,
  handleCancel,
  showDeleteUserModal,
}) {
  if (!showDeleteUserModal) {
    return <></>;
  }

  if (showDeleteUserModal) {
    return (
      <div className="relative top-0 left-0 z-50">
        <div className="fixed top-0 left-0 w-full h-screen bg-slate-800/75 backdrop-blur flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-8 max-w-screen-lg mx-auto w-full grow justify-center">
            <h1 className="text-2xl font-bold">Delete Account</h1>
            <div className="flex flex-col gap-4">
              Are you sure you want to delete this account?
            </div>
            <div className="flex gap-2 self-end">
              <button
                type="button"
                className="px-4 py-2 bg-sky-700 text-white rounded hover:bg-sky-800"
                onClick={async () => await handleDeleteUser()}
              >
                Submit
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-rose-700 rounded hover:bg-rose-700"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteUserModal;
