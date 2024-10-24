import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import {
  getProtectedResource,
  postProtectedResource,
  putProtectedResource,
  deleteProtectedResource
} from '../services/message.service.js';
import { formatDateTimeYear, formatDateTimeMonth, formatDateTimeDay } from '../services/helpers';
import PageLayout from '../layouts/PageLayout';
import TransactionTable from '../components/TransactionTable.js';
import AddEditTransactionModal from '../components/AddEditTransactionModal.js';
import DeleteTransactionModal from '../components/DeleteTransactionModal.js';
import CustomBarChart from '../components/CustomBarChart.js';
import CustomLineChart from '../components/CustomLineChart.js';

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);

  const [transactionsByTotalAmountPerYearExpense, setTransactionsByTotalAmountPerYearExpense] = useState([]);
  const [transactionsByTotalAmountPerMonthExpense, setTransactionsByTotalAmountPerMonthExpense] = useState([]);
  const [transactionsByTotalAmountPerDayExpense, setTransactionsByTotalAmountPerDayExpense] = useState([]);

  const [transactionsByTotalAmountPerYearIncome, setTransactionsByTotalAmountPerYearIncome] = useState([]);
  const [transactionsByTotalAmountPerMonthIncome, setTransactionsByTotalAmountPerMonthIncome] = useState([]);
  const [transactionsByTotalAmountPerDayIncome, setTransactionsByTotalAmountPerDayIncome] = useState([]);

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [name, setName] = useState('');
  const [type, setType] = useState('INCOME');
  const [amount, setAmount] = useState(1);

  const [transactionId, setTransactionId] = useState(undefined);

  const [yearMonthExpense, setYearMonthExpense] = useState('2024-10');
  const [yearExpense, setYearExpense] = useState('2024');

  const [yearMonthIncome, setYearMonthIncome] = useState('2024-10');
  const [yearIncome, setYearIncome] = useState('2024');

  const [triggerRefreshYearMonthExpense, setTriggerRefreshYearMonthExpense] = useState(false);
  const [triggerRefreshYearExpense, setTriggerRefreshYearExpense] = useState(false);

  const [triggerRefreshYearMonthIncome, setTriggerRefreshYearMonthIncome] = useState(false);
  const [triggerRefreshYearIncome, setTriggerRefreshYearIncome] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      const [yearYearMonthExpense, monthYearMonthExpense] = yearMonthExpense.split('-');

      const accessToken = await getAccessTokenSilently();

      const _transactions = await getProtectedResource(accessToken, 'http://localhost:5174/api/transactions');

      const _transactionsByTotalAmountPerYearExpense = await getProtectedResource(accessToken, 'http://localhost:5174/api/transactions/total-amount-per-year/EXPENSE');
      const _transactionsByTotalAmountPerMonthExpense = await getProtectedResource(accessToken, `http://localhost:5174/api/transactions/total-amount-per-month/${yearExpense}/EXPENSE`);
      const _transactionsByTotalAmountPerDayExpense = await getProtectedResource(accessToken, `http://localhost:5174/api/transactions/total-amount-per-day/${yearYearMonthExpense}/${monthYearMonthExpense}/EXPENSE`);

      const _transactionsByTotalAmountPerYearIncome = await getProtectedResource(accessToken, 'http://localhost:5174/api/transactions/total-amount-per-year/INCOME');
      const _transactionsByTotalAmountPerMonthIncome = await getProtectedResource(accessToken, `http://localhost:5174/api/transactions/total-amount-per-month/${yearIncome}/INCOME`);
      const _transactionsByTotalAmountPerDayIncome = await getProtectedResource(accessToken, `http://localhost:5174/api/transactions/total-amount-per-day/${yearYearMonthExpense}/${monthYearMonthExpense}/INCOME`);

      if (!isMounted) {
        return;
      }

      if (_transactions.data) {
        setTransactions(_transactions.data.rows);
      }

      if (_transactions.error) {
        setTransactions([]);
      }

      if (_transactionsByTotalAmountPerYearExpense.data) {
        const chartData = _transactionsByTotalAmountPerYearExpense.data.rows.map(row => {
          return {
            time: formatDateTimeYear(row.year),
            amount: row.total_amount,
          }
        });
        setTransactionsByTotalAmountPerYearExpense(chartData);
      }

      if (_transactionsByTotalAmountPerYearExpense.error) {
        setTransactionsByTotalAmountPerYearExpense([]);
      }

      if (_transactionsByTotalAmountPerYearIncome.data) {
        const chartData = _transactionsByTotalAmountPerYearIncome.data.rows.map(row => {
          return {
            time: formatDateTimeYear(row.year),
            amount: row.total_amount,
          }
        });
        setTransactionsByTotalAmountPerYearIncome(chartData);
      }

      if (_transactionsByTotalAmountPerYearIncome.error) {
        setTransactionsByTotalAmountPerYearIncome([]);
      }

      if (_transactionsByTotalAmountPerMonthExpense.data) {
        const chartData = _transactionsByTotalAmountPerMonthExpense.data.rows.map(row => {
          return {
            time: formatDateTimeMonth(row.month),
            amount: row.total_amount,
          }
        });
        setTransactionsByTotalAmountPerMonthExpense(chartData);
      }

      if (_transactionsByTotalAmountPerMonthExpense.error) {
        setTransactionsByTotalAmountPerMonthExpense([]);
      }

      if (_transactionsByTotalAmountPerMonthIncome.data) {
        const chartData = _transactionsByTotalAmountPerMonthIncome.data.rows.map(row => {
          return {
            time: formatDateTimeMonth(row.month),
            amount: row.total_amount,
          }
        });
        setTransactionsByTotalAmountPerMonthIncome(chartData);
      }

      if (_transactionsByTotalAmountPerMonthIncome.error) {
        setTransactionsByTotalAmountPerMonthIncome([]);
      }

      if (_transactionsByTotalAmountPerDayExpense.data) {
        const chartData = _transactionsByTotalAmountPerDayExpense.data.rows.map(row => {
          return {
            time: formatDateTimeDay(row.day),
            amount: row.total_amount,
          }
        });
        setTransactionsByTotalAmountPerDayExpense(chartData);
      }

      if (_transactionsByTotalAmountPerDayExpense.error) {
        setTransactionsByTotalAmountPerDayExpense([]);
      }

      if (_transactionsByTotalAmountPerDayIncome.data) {
        const chartData = _transactionsByTotalAmountPerDayIncome.data.rows.map(row => {
          return {
            time: formatDateTimeDay(row.day),
            amount: row.total_amount,
          }
        });
        setTransactionsByTotalAmountPerDayIncome(chartData);
      }

      if (_transactionsByTotalAmountPerDayIncome.error) {
        setTransactionsByTotalAmountPerDayIncome([]);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      const accessToken = await getAccessTokenSilently();
      const _transactionsByTotalAmountPerMonthExpense = await getProtectedResource(accessToken, `http://localhost:5174/api/transactions/total-amount-per-month/${yearExpense}/EXPENSE`);

      if (!isMounted) {
        return;
      }

      if (_transactionsByTotalAmountPerMonthExpense.data) {
        const chartData = _transactionsByTotalAmountPerMonthExpense.data.rows.map(row => {
          return {
            time: formatDateTimeMonth(row.month),
            amount: row.total_amount,
          }
        });
        setTransactionsByTotalAmountPerMonthExpense(chartData);
      }

      if (_transactionsByTotalAmountPerMonthExpense.error) {
        setTransactionsByTotalAmountPerMonthExpense([]);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [triggerRefreshYearExpense]);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      const accessToken = await getAccessTokenSilently();
      const _transactionsByTotalAmountPerMonthIncome = await getProtectedResource(accessToken, `http://localhost:5174/api/transactions/total-amount-per-month/${yearIncome}/INCOME`);

      if (!isMounted) {
        return;
      }

      if (_transactionsByTotalAmountPerMonthIncome.data) {
        const chartData = _transactionsByTotalAmountPerMonthIncome.data.rows.map(row => {
          return {
            time: formatDateTimeMonth(row.month),
            amount: row.total_amount,
          }
        });
        setTransactionsByTotalAmountPerMonthIncome(chartData);
      }

      if (_transactionsByTotalAmountPerMonthIncome.error) {
        setTransactionsByTotalAmountPerMonthIncome([]);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [triggerRefreshYearIncome]);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      const [yearYearMonthExpense, monthYearMonthExpense] = yearMonthExpense.split('-');

      const accessToken = await getAccessTokenSilently();
      const _transactionsByTotalAmountPerDayExpense = await getProtectedResource(accessToken, `http://localhost:5174/api/transactions/total-amount-per-day/${yearYearMonthExpense}/${monthYearMonthExpense}/EXPENSE`);

      if (!isMounted) {
        return;
      }

      if (_transactionsByTotalAmountPerDayExpense.data) {
        const chartData = _transactionsByTotalAmountPerDayExpense.data.rows.map(row => {
          return {
            time: formatDateTimeDay(row.day),
            amount: row.total_amount,
          }
        });
        setTransactionsByTotalAmountPerDayExpense(chartData);
      }

      if (_transactionsByTotalAmountPerDayExpense.error) {
        setTransactionsByTotalAmountPerDayExpense([]);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [triggerRefreshYearMonthExpense]);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      const [yearYearMonthIncome, monthYearMonthIncome] = yearMonthIncome.split('-');

      const accessToken = await getAccessTokenSilently();
      const _transactionsByTotalAmountPerDayIncome = await getProtectedResource(accessToken, `http://localhost:5174/api/transactions/total-amount-per-day/${yearYearMonthIncome}/${monthYearMonthIncome}/INCOME`);

      if (!isMounted) {
        return;
      }

      if (_transactionsByTotalAmountPerDayIncome.data) {
        const chartData = _transactionsByTotalAmountPerDayIncome.data.rows.map(row => {
          return {
            time: formatDateTimeDay(row.day),
            amount: row.total_amount,
          }
        });
        setTransactionsByTotalAmountPerDayIncome(chartData);
      }

      if (_transactionsByTotalAmountPerDayIncome.error) {
        setTransactionsByTotalAmountPerDayIncome([]);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [triggerRefreshYearMonthIncome]);

  const handleAddEditTransaction = async(transactionId) => {
    try {
      const accessToken = await getAccessTokenSilently();

      let result;

      if (transactionId) {
        result = await putProtectedResource(accessToken, `http://localhost:5174/api/transactions/${transactionId}`, {
          name,
          type,
          amount
        });
      } else {
        result = await postProtectedResource(accessToken, 'http://localhost:5174/api/transactions', {
          name,
          type,
          amount,
        });
      }

      // console.log(result);

      setShowAddEditModal(false);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleDeleteTransaction = async(transactionId) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const result = await deleteProtectedResource(accessToken, `http://localhost:5174/api/transactions/${transactionId}`);

      // console.log(result);

      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCancel = () => {
    setShowAddEditModal(false);
    setShowDeleteModal(false);
    setTransactionId(undefined);
    setName('');
    setAmount(1);
    setType('INCOME');
  }

  return (
    <PageLayout>
      {/* TODO: refresh table data and any components relying on that data after transaction action is done */}
      {/* TODO: disable any interactions behind the modal when it is open */}
      {/* TODO: table loading data icon */}
      {/* TODO: add physical and online locations */}
      {/* TODO: charts to visualize by category and by location */}
      {showAddEditModal && (
        <>
          <AddEditTransactionModal
            transactionId={transactionId}
            name={name}
            type={type}
            amount={amount}
            setName={setName}
            setType={setType}
            setAmount={setAmount}
            handleAddEditTransaction={handleAddEditTransaction}
            handleCancel={handleCancel}
          />
        </>
      )}

      {showDeleteModal && (
        <>
          <DeleteTransactionModal
            transactionId={transactionId}
            handleDeleteTransaction={handleDeleteTransaction}
            handleCancel={handleCancel}
          />
        </>
      )}

      <h1 className="text-2xl font-bold">EXPENSE</h1>

      <h1 className="text-2xl font-bold">Transaction Total Per Year</h1>

      <div className="flex gap-4">
        <CustomBarChart data={transactionsByTotalAmountPerYearExpense} syncId="1" barColor="#0369a1" />
        <CustomLineChart data={transactionsByTotalAmountPerYearExpense} syncId="1" lineColor="#0369a1" />
      </div>

      <h1 className="text-2xl font-bold">Transaction Total Per Month</h1>

      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="year" className="text-xs">Year</label>
          <input id="year" type="number" min="1900" max="2099" value={yearExpense} onChange={(event) => setYearExpense(event.target.value)} className="w-full px-4 py-2 bg-transparent text-white rounded border-2 border-slate-800" />
        </div>
        <button type="button" className="self-end px-4 py-2 bg-sky-700 rounded" onClick={() => setTriggerRefreshYearExpense(!triggerRefreshYearExpense)}>Go</button>
      </div>

      <div className="flex gap-4">
        <CustomBarChart data={transactionsByTotalAmountPerMonthExpense} syncId="2" barColor="#0369a1" />
        <CustomLineChart data={transactionsByTotalAmountPerMonthExpense} syncId="2" lineColor="#0369a1" />
      </div>

      <h1 className="text-2xl font-bold">Transaction Total Per Day</h1>

      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="month" className="text-xs">Month</label>
          <input id="month" type="month" min="1900-01" max="2099-12" value={yearMonthExpense} onChange={(event) => setYearMonthExpense(event.target.value)} className="w-full px-4 py-2 bg-transparent text-white rounded border-2 border-slate-800" />
        </div>
        <button type="button" className="self-end px-4 py-2 bg-sky-700 rounded" onClick={() => setTriggerRefreshYearMonthExpense(!triggerRefreshYearMonthExpense)}>Go</button>
      </div>

      <div className="flex gap-4">
        <CustomBarChart data={transactionsByTotalAmountPerDayExpense} syncId="3" barColor="#0369a1" />
        <CustomLineChart data={transactionsByTotalAmountPerDayExpense} syncId="3" lineColor="#0369a1" />
      </div>

      <h1 className="text-2xl font-bold">INCOME</h1>

      <h1 className="text-2xl font-bold">Transaction Total Per Year</h1>

      <div className="flex gap-4">
        <CustomBarChart data={transactionsByTotalAmountPerYearIncome} syncId="4" barColor="#0f766e" />
        <CustomLineChart data={transactionsByTotalAmountPerYearIncome} syncId="4" lineColor="#0f766e" />
      </div>

      <h1 className="text-2xl font-bold">Transaction Total Per Month</h1>

      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="year" className="text-xs">Year</label>
          <input id="year" type="number" min="1900" max="2099" value={yearIncome} onChange={(event) => setYearIncome(event.target.value)} className="w-full px-4 py-2 bg-transparent text-white rounded border-2 border-slate-800" />
        </div>
        <button type="button" className="self-end px-4 py-2 bg-sky-700 rounded" onClick={() => setTriggerRefreshYearIncome(!triggerRefreshYearIncome)}>Go</button>
      </div>

      <div className="flex gap-4">
        <CustomBarChart data={transactionsByTotalAmountPerMonthIncome} syncId="5" barColor="#0f766e" />
        <CustomLineChart data={transactionsByTotalAmountPerMonthIncome} syncId="5" lineColor="#0f766e" />
      </div>

      <h1 className="text-2xl font-bold">Transaction Total Per Day</h1>

      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="month" className="text-xs">Month</label>
          <input id="month" type="month" min="1900-01" max="2099-12" value={yearMonthIncome} onChange={(event) => setYearMonthIncome(event.target.value)} className="w-full px-4 py-2 bg-transparent text-white rounded border-2 border-slate-800" />
        </div>
        <button type="button" className="self-end px-4 py-2 bg-sky-700 rounded" onClick={() => setTriggerRefreshYearMonthIncome(!triggerRefreshYearMonthIncome)}>Go</button>
      </div>

      <div className="flex gap-4">
        <CustomBarChart data={transactionsByTotalAmountPerDayIncome} syncId="6" barColor="#0f766e" />
        <CustomLineChart data={transactionsByTotalAmountPerDayIncome} syncId="6" lineColor="#0f766e" />
      </div>

      <div className="flex justify-between gap-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        {!showAddEditModal && (
          <button type="button" className="px-4 py-2 bg-teal-700 rounded" onClick={() => setShowAddEditModal(true)}>Add</button>
        )}
      </div>

      <TransactionTable
        transactions={transactions}
        setTransactionId={setTransactionId}
        setName={setName}
        setType={setType}
        setAmount={setAmount}
        setShowAddEditModal={setShowAddEditModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </PageLayout>
  );
}

export default DashboardPage;
