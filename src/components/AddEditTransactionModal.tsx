
function AddEditTransactionModal({ transactionId, name, type, amount, setName, setType, setAmount, handleAddEditTransaction, handleCancel }) {

  return (
    <div className="relative top-0 left-0 z-50">
      <div className="fixed top-0 left-0 w-full h-screen bg-slate-700/75 backdrop-blur flex flex-col justify-between gap-4 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs">Type</span>
            <div id="type" className="flex gap-2">
              <button type="button" onClick={() => setType('INCOME')} className={`px-4 py-2 rounded border-2 border-sky-700 ${type === 'INCOME' ? 'bg-sky-700 text-white' : ''}`}>Income</button>
              <button type="button" onClick={() => setType('EXPENSE')} className={`px-4 py-2 rounded  border-2 border-sky-700 ${type === 'EXPENSE' ? 'bg-sky-700 text-white' : ''}`}>Expense</button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs">Name</label>
            <input id="name" type="text" value={name} autoComplete="off" onChange={(event) => setName(event.target.value)} className="text-white bg-transparent px-4 py-2 border-2 border-white rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xs">Amount</label>
            <input id="amount" type="number" min={1} max={1000000000000} value={amount} onChange={(event) => setAmount(+event.target.value)} className="text-white bg-transparent px-4 py-2 border-2 border-white rounded" />
          </div>
        </div>
        <div className="flex gap-2 self-end">
          <button type="button" className="px-4 py-2 bg-sky-700 text-white rounded" onClick={async() => await handleAddEditTransaction(transactionId)}>
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

export default AddEditTransactionModal;
