function AddEditTransactionModal({
  transaction,
  name,
  type,
  amount,
  setName,
  setType,
  setAmount,
  handleAddEditTransaction,
  handleCancel,
  showAddEditTransactionModal,
}) {
  if (!showAddEditTransactionModal) {
    return <></>;
  }

  if (showAddEditTransactionModal) {
    return (
      <div className="relative top-0 left-0 z-50">
        <div className="fixed top-0 left-0 w-full h-screen bg-slate-800/75 backdrop-blur flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-8 max-w-screen-lg mx-auto w-full grow justify-center">
            {transaction && (
              <h1 className="text-2xl font-bold">Edit Transaction</h1>
            )}
            {!transaction && (
              <h1 className="text-2xl font-bold">Add Transaction</h1>
            )}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs">Type</span>
                <div id="type" className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setType('INCOME')}
                    className={`px-4 py-2 rounded border border-sky-700 ${type === 'INCOME' ? 'bg-sky-700 text-white' : ''}`}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('EXPENSE')}
                    className={`px-4 py-2 rounded  border border-sky-700 ${type === 'EXPENSE' ? 'bg-sky-700 text-white' : ''}`}
                  >
                    Expense
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  autoComplete="off"
                  onChange={(event) => setName(event.target.value)}
                  className="text-white bg-transparent px-4 py-2 border border-white rounded"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xs">
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  min={1}
                  max={1000000000000}
                  value={amount}
                  onChange={(event) => setAmount(+event.target.value)}
                  className="text-white bg-transparent px-4 py-2 border border-white rounded"
                />
              </div>
            </div>
            <div className="flex gap-4 self-end">
              <button
                type="button"
                className="px-4 py-2 bg-sky-700 text-white rounded disabled:opacity-50 disabled:pointer-events-none hover:bg-sky-800"
                onClick={async () =>
                  await handleAddEditTransaction(transaction)
                }
                disabled={name === '' || type === '' || amount <= 0}
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

export default AddEditTransactionModal;
