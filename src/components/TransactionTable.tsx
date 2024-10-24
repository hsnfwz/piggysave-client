
import { formatCurrency, formatDateTime } from '../services/helpers';

function TransactionTable({ transactions, setTransactionId, setName, setType, setAmount, setShowAddEditModal, setShowDeleteModal }) {

  return (
    <table className="max-w-screen-lg block overflow-x-scroll rounded-2xl bg-gradient-to-t from-0% from-slate-900 to-100% to-slate-800 border-2 border-slate-700">
      <thead>
        <tr className="border-b-2 border-b-slate-700">
          <th className="whitespace-nowrap px-4 py-2 text-left w-2/6">Name</th>
          <th className="whitespace-nowrap px-4 py-2 text-left w-1/6">Type</th>
          <th className="whitespace-nowrap px-4 py-2 text-left w-1/6">Amount</th>
          <th className="whitespace-nowrap px-4 py-2 text-left w-1/6">Date Time</th>
          <th className="whitespace-nowrap px-4 py-2 text-right w-1/6"></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index} className="border-b-2 border-b-slate-700">
            <td className="whitespace-nowrap px-4 py-2 text-left w-2/6">{transaction.name}</td>
            <td className="whitespace-nowrap px-4 py-2 text-left w-1/6">
              <span className={`text-center px-4 py-2 rounded-full text-white ${transaction.type === 'INCOME' ? 'bg-teal-700': 'bg-sky-700'}`}>
                {transaction.type}
              </span>
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-left w-1/6">{formatCurrency(transaction.amount)}</td>
            <td className="whitespace-nowrap px-4 py-2 text-left w-1/6">{formatDateTime(transaction.date_time_utc)}</td>
            <td className="whitespace-nowrap px-4 py-2 text-right w-1/6 flex gap-2">
              <button type="button" className="px-4 py-2 bg-sky-700 rounded" onClick={() => {
                setTransactionId(transaction.transaction_id)
                setName(transaction.name);
                setType(transaction.type);
                setAmount(transaction.amount);
                setShowAddEditModal(true);
              }}>
                Edit
              </button>
                <button type="button" className="px-4 py-2 bg-rose-700 rounded" onClick={() => {
                  setTransactionId(transaction.transaction_id)
                  setShowDeleteModal(true)
                }}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2">$$$</td>
          <td className="px-4 py-2"></td>
          <td className="px-4 py-2"></td>
        </tr>
      </tfoot>
    </table>
  );
}

export default TransactionTable;
