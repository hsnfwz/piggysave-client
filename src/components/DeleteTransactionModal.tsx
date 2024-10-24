
function DeleteTransactionModal({ transactionId, handleDeleteTransaction, handleCancel }) {

  return (
    <div className="relative top-0 left-0 z-50">
      <div className="fixed top-0 left-0 w-full h-screen bg-slate-700/75 backdrop-blur flex flex-col justify-between gap-4 p-4">
        <div className="flex flex-col gap-4">
          Are you sure you want to delete this transaction?
        </div>
        <div className="flex gap-2 self-end">
          <button type="button" className="px-4 py-2 bg-sky-700 text-white rounded" onClick={async() => await handleDeleteTransaction(transactionId)}>
            Submit
          </button>
          <button type="button" className="px-4 py-2 border-2 border-rose-700 rounded" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTransactionModal;
