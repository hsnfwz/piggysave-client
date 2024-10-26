import { formatCurrency, formatDateTime } from '../services/helpers';

function TransactionTable({
  transactions,
  setTransaction,
  setName,
  setType,
  setAmount,
  setShowAddEditTransactionModal,
  setShowDeleteTransactionModal,
}: any) {
  return (
    <table className="w-full block overflow-x-scroll">
      <thead>
        <tr className="border-b border-b-slate-700">
          <th className="whitespace-nowrap p-4 text-left w-1/4">Name</th>
          <th className="whitespace-nowrap p-4 text-left w-1/4">Type</th>
          <th className="whitespace-nowrap p-4 text-left w-1/4">Amount</th>
          <th className="whitespace-nowrap p-4 text-left w-1/4">Date Time</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction: any, index: number) => (
          <tr key={index} className="border-b border-b-slate-700">
            <td className="p-4 text-left w-1/4">{transaction.name}</td>
            <td className="p-4 text-left w-1/4">
              <span
                className={`text-center px-4 py-2 rounded-full text-white ${transaction.type === 'INCOME' ? 'bg-teal-700' : 'bg-sky-700'}`}
              >
                {transaction.type}
              </span>
            </td>
            <td className="p-4 text-left w-1/4">
              {formatCurrency(transaction.amount)}
            </td>
            <td className="p-4 text-left w-1/4">
              {formatDateTime(transaction.date_time_utc)}
            </td>
            <td className="p-4 flex gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-sky-700 rounded hover:bg-sky-800"
                onClick={() => {
                  const body = document.querySelector('body');
                  if (body) {
                    body.style.overflow = 'hidden';
                  }
                  setTransaction(transaction);
                  setName(transaction.name);
                  setType(transaction.type);
                  setAmount(transaction.amount);
                  setShowAddEditTransactionModal(true);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-rose-700 hover:bg-rose-700 rounded"
                onClick={() => {
                  setTransaction(transaction);
                  setShowDeleteTransactionModal(true);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="p-4"></td>
          <td className="p-4"></td>
          <td className="p-4">$$$</td>
          <td className="p-4"></td>
          <td className="p-4"></td>
        </tr>
      </tfoot>
    </table>
  );
}

export default TransactionTable;
