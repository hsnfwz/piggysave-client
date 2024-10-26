import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import {
  getProtectedResource,
  postProtectedResource,
  putProtectedResource,
  deleteProtectedResource,
} from '../services/message.service.js';
import {
  formatDateTimeYear,
  formatDateTimeMonth,
  formatDateTimeDay,
} from '../services/helpers';
import PageLayout from '../layouts/PageLayout';
import TransactionTable from '../components/TransactionTable.js';
import AddEditTransactionModal from '../components/AddEditTransactionModal.js';
import DeleteTransactionModal from '../components/DeleteTransactionModal.js';
import CustomBarChart from '../components/CustomBarChart.js';
import CustomLineChart from '../components/CustomLineChart.js';
import ComponentLoader from '../components/ComponentLoader.js';

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [
    transactionsByTotalAmountPerYearExpense,
    setTransactionsByTotalAmountPerYearExpense,
  ] = useState([]);
  const [
    transactionsByTotalAmountPerMonthExpense,
    setTransactionsByTotalAmountPerMonthExpense,
  ] = useState([]);
  const [
    transactionsByTotalAmountPerDayExpense,
    setTransactionsByTotalAmountPerDayExpense,
  ] = useState([]);
  const [
    transactionsByTotalAmountPerYearIncome,
    setTransactionsByTotalAmountPerYearIncome,
  ] = useState([]);
  const [
    transactionsByTotalAmountPerMonthIncome,
    setTransactionsByTotalAmountPerMonthIncome,
  ] = useState([]);
  const [
    transactionsByTotalAmountPerDayIncome,
    setTransactionsByTotalAmountPerDayIncome,
  ] = useState([]);

  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [
    isLoadingTransactionsByTotalAmountPerYearIncome,
    setIsLoadingTransactionsByTotalAmountPerYearIncome,
  ] = useState(false);
  const [
    isLoadingTransactionsByTotalAmountPerMonthIncome,
    setIsLoadingTransactionsByTotalAmountPerMonthIncome,
  ] = useState(false);
  const [
    isLoadingTransactionsByTotalAmountPerDayIncome,
    setIsLoadingTransactionsByTotalAmountPerDayIncome,
  ] = useState(false);
  const [
    isLoadingTransactionsByTotalAmountPerYearExpense,
    setIsLoadingTransactionsByTotalAmountPerYearExpense,
  ] = useState(false);
  const [
    isLoadingTransactionsByTotalAmountPerMonthExpense,
    setIsLoadingTransactionsByTotalAmountPerMonthExpense,
  ] = useState(false);
  const [
    isLoadingTransactionsByTotalAmountPerDayExpense,
    setIsLoadingTransactionsByTotalAmountPerDayExpense,
  ] = useState(false);

  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);
  const [showDeleteTransactionModal, setShowDeleteTransactionModal] =
    useState(false);

  const [transaction, setTransaction] = useState(undefined);
  const [name, setName] = useState('');
  const [type, setType] = useState('INCOME');
  const [amount, setAmount] = useState(1);

  const [yearMonthExpense, setYearMonthExpense] = useState('2024-10');
  const [yearExpense, setYearExpense] = useState('2024');
  const [yearMonthIncome, setYearMonthIncome] = useState('2024-10');
  const [yearIncome, setYearIncome] = useState('2024');

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      setIsLoadingTransactions(true);
      setIsLoadingTransactionsByTotalAmountPerYearExpense(true);
      setIsLoadingTransactionsByTotalAmountPerMonthExpense(true);
      setIsLoadingTransactionsByTotalAmountPerDayExpense(true);
      setIsLoadingTransactionsByTotalAmountPerYearIncome(true);
      setIsLoadingTransactionsByTotalAmountPerMonthIncome(true);
      setIsLoadingTransactionsByTotalAmountPerDayIncome(true);

      const [yearYearMonthExpense, monthYearMonthExpense] =
        yearMonthExpense.split('-');
      const [yearYearMonthIncome, monthYearMonthIncome] =
        yearMonthIncome.split('-');

      const accessToken = await getAccessTokenSilently();

      const [
        _transactions,
        _transactionsByTotalAmountPerYearExpense,
        _transactionsByTotalAmountPerMonthExpense,
        _transactionsByTotalAmountPerDayExpense,
        _transactionsByTotalAmountPerYearIncome,
        _transactionsByTotalAmountPerMonthIncome,
        _transactionsByTotalAmountPerDayIncome,
      ] = await Promise.all([
        getProtectedResource(
          accessToken,
          'http://localhost:5174/api/transactions'
        ),
        getProtectedResource(
          accessToken,
          'http://localhost:5174/api/transactions/total-amount-per-year/EXPENSE'
        ),
        getProtectedResource(
          accessToken,
          `http://localhost:5174/api/transactions/total-amount-per-month/${yearExpense}/EXPENSE`
        ),
        getProtectedResource(
          accessToken,
          `http://localhost:5174/api/transactions/total-amount-per-day/${yearYearMonthExpense}/${monthYearMonthExpense}/EXPENSE`
        ),
        getProtectedResource(
          accessToken,
          'http://localhost:5174/api/transactions/total-amount-per-year/INCOME'
        ),
        getProtectedResource(
          accessToken,
          `http://localhost:5174/api/transactions/total-amount-per-month/${yearIncome}/INCOME`
        ),
        getProtectedResource(
          accessToken,
          `http://localhost:5174/api/transactions/total-amount-per-day/${yearYearMonthIncome}/${monthYearMonthIncome}/INCOME`
        ),
      ]);

      if (!isMounted) {
        return;
      }

      // TRANSACTIONS
      if (_transactions.data) {
        setTransactions(_transactions.data.rows);
        setIsLoadingTransactions(false);
      }

      if (_transactions.error) {
        console.log(_transactions.error);
        setTransactions([]);
      }

      // EXPENSE
      if (_transactionsByTotalAmountPerYearExpense.data) {
        const chartData =
          _transactionsByTotalAmountPerYearExpense.data.rows.map((row) => {
            return {
              time: formatDateTimeYear(row.year),
              amount: row.total_amount,
            };
          });
        setTransactionsByTotalAmountPerYearExpense(chartData);
        setIsLoadingTransactionsByTotalAmountPerYearExpense(false);
      }

      if (_transactionsByTotalAmountPerYearExpense.error) {
        console.log(_transactionsByTotalAmountPerYearExpense.error);
        setTransactionsByTotalAmountPerYearExpense([]);
      }

      if (_transactionsByTotalAmountPerMonthExpense.data) {
        const chartData =
          _transactionsByTotalAmountPerMonthExpense.data.rows.map((row) => {
            return {
              time: formatDateTimeMonth(row.month),
              amount: row.total_amount,
            };
          });
        setTransactionsByTotalAmountPerMonthExpense(chartData);
        setIsLoadingTransactionsByTotalAmountPerMonthExpense(false);
      }

      if (_transactionsByTotalAmountPerMonthExpense.error) {
        console.log(_transactionsByTotalAmountPerMonthExpense.error);
        setTransactionsByTotalAmountPerMonthExpense([]);
      }

      if (_transactionsByTotalAmountPerDayExpense.data) {
        const chartData = _transactionsByTotalAmountPerDayExpense.data.rows.map(
          (row) => {
            return {
              time: formatDateTimeDay(row.day),
              amount: row.total_amount,
            };
          }
        );
        setTransactionsByTotalAmountPerDayExpense(chartData);
        setIsLoadingTransactionsByTotalAmountPerDayExpense(false);
      }

      if (_transactionsByTotalAmountPerDayExpense.error) {
        console.log(_transactionsByTotalAmountPerDayExpense.error);
        setTransactionsByTotalAmountPerDayExpense([]);
      }

      // INCOME
      if (_transactionsByTotalAmountPerYearIncome.data) {
        const chartData = _transactionsByTotalAmountPerYearIncome.data.rows.map(
          (row) => {
            return {
              time: formatDateTimeYear(row.year),
              amount: row.total_amount,
            };
          }
        );
        setTransactionsByTotalAmountPerYearIncome(chartData);
        setIsLoadingTransactionsByTotalAmountPerYearIncome(false);
      }

      if (_transactionsByTotalAmountPerYearIncome.error) {
        console.log(_transactionsByTotalAmountPerYearIncome.error);
        setTransactionsByTotalAmountPerYearIncome([]);
      }

      if (_transactionsByTotalAmountPerMonthIncome.data) {
        const chartData =
          _transactionsByTotalAmountPerMonthIncome.data.rows.map((row) => {
            return {
              time: formatDateTimeMonth(row.month),
              amount: row.total_amount,
            };
          });
        setTransactionsByTotalAmountPerMonthIncome(chartData);
        setIsLoadingTransactionsByTotalAmountPerMonthIncome(false);
      }

      if (_transactionsByTotalAmountPerMonthIncome.error) {
        console.log(_transactionsByTotalAmountPerMonthIncome.error);
        setTransactionsByTotalAmountPerMonthIncome([]);
      }

      if (_transactionsByTotalAmountPerDayIncome.data) {
        const chartData = _transactionsByTotalAmountPerDayIncome.data.rows.map(
          (row) => {
            return {
              time: formatDateTimeDay(row.day),
              amount: row.total_amount,
            };
          }
        );
        setTransactionsByTotalAmountPerDayIncome(chartData);
        setIsLoadingTransactionsByTotalAmountPerDayIncome(false);
      }

      if (_transactionsByTotalAmountPerDayIncome.error) {
        console.log(_transactionsByTotalAmountPerDayIncome.error);
        setTransactionsByTotalAmountPerDayIncome([]);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  const refreshChartDataExpense = async () => {
    setIsLoadingTransactionsByTotalAmountPerYearExpense(true);
    setIsLoadingTransactionsByTotalAmountPerMonthExpense(true);
    setIsLoadingTransactionsByTotalAmountPerDayExpense(true);

    const [yearYearMonthExpense, monthYearMonthExpense] =
      yearMonthExpense.split('-');

    const accessToken = await getAccessTokenSilently();

    const [
      _transactionsByTotalAmountPerYearExpense,
      _transactionsByTotalAmountPerMonthExpense,
      _transactionsByTotalAmountPerDayExpense,
    ] = await Promise.all([
      getProtectedResource(
        accessToken,
        'http://localhost:5174/api/transactions/total-amount-per-year/EXPENSE'
      ),
      getProtectedResource(
        accessToken,
        `http://localhost:5174/api/transactions/total-amount-per-month/${yearExpense}/EXPENSE`
      ),
      getProtectedResource(
        accessToken,
        `http://localhost:5174/api/transactions/total-amount-per-day/${yearYearMonthExpense}/${monthYearMonthExpense}/EXPENSE`
      ),
    ]);

    // EXPENSE
    if (_transactionsByTotalAmountPerYearExpense.data) {
      const chartData = _transactionsByTotalAmountPerYearExpense.data.rows.map(
        (row) => {
          return {
            time: formatDateTimeYear(row.year),
            amount: row.total_amount,
          };
        }
      );
      setTransactionsByTotalAmountPerYearExpense(chartData);
      setIsLoadingTransactionsByTotalAmountPerYearExpense(false);
    }

    if (_transactionsByTotalAmountPerYearExpense.error) {
      setTransactionsByTotalAmountPerYearExpense([]);
    }

    if (_transactionsByTotalAmountPerMonthExpense.data) {
      const chartData = _transactionsByTotalAmountPerMonthExpense.data.rows.map(
        (row) => {
          return {
            time: formatDateTimeMonth(row.month),
            amount: row.total_amount,
          };
        }
      );
      setTransactionsByTotalAmountPerMonthExpense(chartData);
      setIsLoadingTransactionsByTotalAmountPerMonthExpense(false);
    }

    if (_transactionsByTotalAmountPerMonthExpense.error) {
      setTransactionsByTotalAmountPerMonthExpense([]);
    }

    if (_transactionsByTotalAmountPerDayExpense.data) {
      const chartData = _transactionsByTotalAmountPerDayExpense.data.rows.map(
        (row) => {
          return {
            time: formatDateTimeDay(row.day),
            amount: row.total_amount,
          };
        }
      );
      setTransactionsByTotalAmountPerDayExpense(chartData);
      setIsLoadingTransactionsByTotalAmountPerDayExpense(false);
    }

    if (_transactionsByTotalAmountPerDayExpense.error) {
      setTransactionsByTotalAmountPerDayExpense([]);
    }
  };

  const refreshChartDataIncome = async () => {
    setIsLoadingTransactionsByTotalAmountPerYearIncome(true);
    setIsLoadingTransactionsByTotalAmountPerMonthIncome(true);
    setIsLoadingTransactionsByTotalAmountPerDayIncome(true);

    const [yearYearMonthIncome, monthYearMonthIncome] =
      yearMonthIncome.split('-');

    const accessToken = await getAccessTokenSilently();

    const [
      _transactionsByTotalAmountPerYearIncome,
      _transactionsByTotalAmountPerMonthIncome,
      _transactionsByTotalAmountPerDayIncome,
    ] = await Promise.all([
      getProtectedResource(
        accessToken,
        'http://localhost:5174/api/transactions/total-amount-per-year/INCOME'
      ),
      getProtectedResource(
        accessToken,
        `http://localhost:5174/api/transactions/total-amount-per-month/${yearIncome}/INCOME`
      ),
      getProtectedResource(
        accessToken,
        `http://localhost:5174/api/transactions/total-amount-per-day/${yearYearMonthIncome}/${monthYearMonthIncome}/INCOME`
      ),
    ]);

    // INCOME
    if (_transactionsByTotalAmountPerYearIncome.data) {
      const chartData = _transactionsByTotalAmountPerYearIncome.data.rows.map(
        (row) => {
          return {
            time: formatDateTimeYear(row.year),
            amount: row.total_amount,
          };
        }
      );
      setTransactionsByTotalAmountPerYearIncome(chartData);
      setIsLoadingTransactionsByTotalAmountPerYearIncome(false);
    }

    if (_transactionsByTotalAmountPerYearIncome.error) {
      setTransactionsByTotalAmountPerYearIncome([]);
    }

    if (_transactionsByTotalAmountPerMonthIncome.data) {
      const chartData = _transactionsByTotalAmountPerMonthIncome.data.rows.map(
        (row) => {
          return {
            time: formatDateTimeMonth(row.month),
            amount: row.total_amount,
          };
        }
      );
      setTransactionsByTotalAmountPerMonthIncome(chartData);
      setIsLoadingTransactionsByTotalAmountPerMonthIncome(false);
    }

    if (_transactionsByTotalAmountPerMonthIncome.error) {
      setTransactionsByTotalAmountPerMonthIncome([]);
    }

    if (_transactionsByTotalAmountPerDayIncome.data) {
      const chartData = _transactionsByTotalAmountPerDayIncome.data.rows.map(
        (row) => {
          return {
            time: formatDateTimeDay(row.day),
            amount: row.total_amount,
          };
        }
      );
      setTransactionsByTotalAmountPerDayIncome(chartData);
      setIsLoadingTransactionsByTotalAmountPerDayIncome(false);
    }

    if (_transactionsByTotalAmountPerDayIncome.error) {
      setTransactionsByTotalAmountPerDayIncome([]);
    }
  };

  const refreshTransactionsByTotalAmountPerMonthExpense = async () => {
    const accessToken = await getAccessTokenSilently();
    const _transactionsByTotalAmountPerMonthExpense =
      await getProtectedResource(
        accessToken,
        `http://localhost:5174/api/transactions/total-amount-per-month/${yearExpense}/EXPENSE`
      );

    if (_transactionsByTotalAmountPerMonthExpense.data) {
      const chartData = _transactionsByTotalAmountPerMonthExpense.data.rows.map(
        (row) => {
          return {
            time: formatDateTimeMonth(row.month),
            amount: row.total_amount,
          };
        }
      );
      setTransactionsByTotalAmountPerMonthExpense(chartData);
    }

    if (_transactionsByTotalAmountPerMonthExpense.error) {
      setTransactionsByTotalAmountPerMonthExpense([]);
    }
  };

  const refreshTransactionsByTotalAmountPerDayExpense = async () => {
    const [yearYearMonthExpense, monthYearMonthExpense] =
      yearMonthExpense.split('-');

    const accessToken = await getAccessTokenSilently();
    const _transactionsByTotalAmountPerDayExpense = await getProtectedResource(
      accessToken,
      `http://localhost:5174/api/transactions/total-amount-per-day/${yearYearMonthExpense}/${monthYearMonthExpense}/EXPENSE`
    );

    if (_transactionsByTotalAmountPerDayExpense.data) {
      const chartData = _transactionsByTotalAmountPerDayExpense.data.rows.map(
        (row) => {
          return {
            time: formatDateTimeDay(row.day),
            amount: row.total_amount,
          };
        }
      );
      setTransactionsByTotalAmountPerDayExpense(chartData);
    }

    if (_transactionsByTotalAmountPerDayExpense.error) {
      setTransactionsByTotalAmountPerDayExpense([]);
    }
  };

  const refreshTransactionsByTotalAmountPerMonthIncome = async () => {
    const accessToken = await getAccessTokenSilently();
    const _transactionsByTotalAmountPerMonthIncome = await getProtectedResource(
      accessToken,
      `http://localhost:5174/api/transactions/total-amount-per-month/${yearIncome}/INCOME`
    );

    if (_transactionsByTotalAmountPerMonthIncome.data) {
      const chartData = _transactionsByTotalAmountPerMonthIncome.data.rows.map(
        (row) => {
          return {
            time: formatDateTimeMonth(row.month),
            amount: row.total_amount,
          };
        }
      );
      setTransactionsByTotalAmountPerMonthIncome(chartData);
    }

    if (_transactionsByTotalAmountPerMonthIncome.error) {
      setTransactionsByTotalAmountPerMonthIncome([]);
    }
  };

  const refreshTransactionsByTotalAmountPerDayIncome = async () => {
    const [yearYearMonthIncome, monthYearMonthIncome] =
      yearMonthIncome.split('-');

    const accessToken = await getAccessTokenSilently();
    const _transactionsByTotalAmountPerDayIncome = await getProtectedResource(
      accessToken,
      `http://localhost:5174/api/transactions/total-amount-per-day/${yearYearMonthIncome}/${monthYearMonthIncome}/INCOME`
    );

    if (_transactionsByTotalAmountPerDayIncome.data) {
      const chartData = _transactionsByTotalAmountPerDayIncome.data.rows.map(
        (row) => {
          return {
            time: formatDateTimeDay(row.day),
            amount: row.total_amount,
          };
        }
      );
      setTransactionsByTotalAmountPerDayIncome(chartData);
    }

    if (_transactionsByTotalAmountPerDayIncome.error) {
      setTransactionsByTotalAmountPerDayIncome([]);
    }
  };

  const handleAddEditTransaction = async (transaction) => {
    try {
      const accessToken = await getAccessTokenSilently();

      const _transactions = [...transactions];

      let result;

      if (transaction) {
        result = await putProtectedResource(
          accessToken,
          `http://localhost:5174/api/transactions/${transaction.transaction_id}`,
          {
            name,
            type,
            amount,
          }
        );

        if (result.data) {
          const index = _transactions.findIndex(
            (_transaction) =>
              _transaction.transaction_id === transaction.transaction_id
          );
          if (index !== -1) _transactions[index] = result.data.rows[0];

          if (transaction.type === 'EXPENSE') {
            await refreshChartDataExpense();
          } else if (transaction.type === 'INCOME') {
            await refreshChartDataIncome();
          }
        }
      } else {
        result = await postProtectedResource(
          accessToken,
          'http://localhost:5174/api/transactions',
          {
            name,
            type,
            amount,
          }
        );

        if (result.data) {
          _transactions.unshift(result.data.rows[0]);

          if (result.data.rows[0].type === 'EXPENSE') {
            await refreshChartDataExpense();
          } else if (result.data.rows[0].type === 'INCOME') {
            await refreshChartDataIncome();
          }
        }
      }

      if (result.error) {
        setTransactions([]);
      }

      setTransactions(_transactions);

      setShowAddEditTransactionModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTransaction = async (transaction) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const result = await deleteProtectedResource(
        accessToken,
        `http://localhost:5174/api/transactions/${transaction.transaction_id}`
      );

      const _transactions = [...transactions];

      if (result.data) {
        const index = _transactions.findIndex(
          (_transaction) =>
            _transaction.transaction_id === transaction.transaction_id
        );
        _transactions.splice(index, 1);
      }

      if (result.error) {
        setTransactions([]);
      }

      setTransactions(_transactions);

      if (transaction.type === 'EXPENSE') {
        await refreshChartDataExpense();
      } else if (transaction.type === 'INCOME') {
        await refreshChartDataIncome();
      }

      setShowDeleteTransactionModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'auto';
    }
    setShowAddEditTransactionModal(false);
    setShowDeleteTransactionModal(false);
    setTransaction(undefined);
    setName('');
    setAmount(1);
    setType('INCOME');
  };

  return (
    <PageLayout>
      <AddEditTransactionModal
        transaction={transaction}
        name={name}
        type={type}
        amount={amount}
        setName={setName}
        setType={setType}
        setAmount={setAmount}
        handleAddEditTransaction={handleAddEditTransaction}
        handleCancel={handleCancel}
        showAddEditTransactionModal={showAddEditTransactionModal}
      />

      <DeleteTransactionModal
        transaction={transaction}
        handleDeleteTransaction={handleDeleteTransaction}
        handleCancel={handleCancel}
        showDeleteTransactionModal={showDeleteTransactionModal}
      />

      <h1 className="font-bold text-2xl">Dashboard</h1>

      <div className="flex flex-col gap-8 bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <h2 className="text-xl">Expense Transaction Total Per Year</h2>
        <div className="flex flex-col gap-4 lg:flex-row">
          <ComponentLoader
            isLoading={isLoadingTransactionsByTotalAmountPerYearExpense}
          >
            <CustomBarChart
              data={transactionsByTotalAmountPerYearExpense}
              syncId="1"
              barColor="#0369a1"
            />
          </ComponentLoader>
          <ComponentLoader
            isLoading={isLoadingTransactionsByTotalAmountPerYearExpense}
          >
            <CustomLineChart
              data={transactionsByTotalAmountPerYearExpense}
              syncId="1"
              lineColor="#0369a1"
            />
          </ComponentLoader>
        </div>
      </div>

      <div className="flex flex-col gap-8 bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <h2 className="text-xl">Expense Transaction Total Per Month</h2>
        <div className="flex gap-4 max-w-[400px] w-full">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="year" className="text-xs">
              Year
            </label>
            <input
              id="year"
              type="number"
              min="1900"
              max="2099"
              value={yearExpense}
              onChange={(event) => setYearExpense(event.target.value)}
              className="w-full px-4 py-2 bg-transparent text-white rounded border border-slate-700"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 border border-transparent bg-sky-700 rounded disabled:opacity-50 disabled:pointer-events-none self-end hover:bg-sky-800"
            onClick={refreshTransactionsByTotalAmountPerMonthExpense}
            disabled={isLoadingTransactionsByTotalAmountPerMonthExpense}
          >
            Go
          </button>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <ComponentLoader
            isLoading={isLoadingTransactionsByTotalAmountPerMonthExpense}
          >
            <CustomBarChart
              data={transactionsByTotalAmountPerMonthExpense}
              syncId="2"
              barColor="#0369a1"
            />
          </ComponentLoader>
          <ComponentLoader
            isLoading={isLoadingTransactionsByTotalAmountPerMonthExpense}
          >
            <CustomLineChart
              data={transactionsByTotalAmountPerMonthExpense}
              syncId="2"
              lineColor="#0369a1"
            />
          </ComponentLoader>
        </div>
      </div>

      <div className="flex flex-col gap-8 bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <h2 className="text-xl">Expense Transaction Total Per Day</h2>
        <div className="flex gap-4 max-w-[400px] w-full">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="month" className="text-xs">
              Month
            </label>
            <input
              id="month"
              type="month"
              min="1900-01"
              max="2099-12"
              value={yearMonthExpense}
              onChange={(event) => setYearMonthExpense(event.target.value)}
              className="w-full px-4 py-2 bg-transparent text-white rounded border border-slate-700"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 border border-transparent bg-sky-700 rounded disabled:opacity-50 disabled:pointer-events-none self-end hover:bg-sky-800"
            onClick={refreshTransactionsByTotalAmountPerDayExpense}
            disabled={isLoadingTransactionsByTotalAmountPerDayExpense}
          >
            Go
          </button>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <ComponentLoader
            isLoading={isLoadingTransactionsByTotalAmountPerDayExpense}
          >
            <CustomBarChart
              data={transactionsByTotalAmountPerDayExpense}
              syncId="3"
              barColor="#0369a1"
            />
          </ComponentLoader>
          <ComponentLoader
            isLoading={isLoadingTransactionsByTotalAmountPerDayExpense}
          >
            <CustomLineChart
              data={transactionsByTotalAmountPerDayExpense}
              syncId="3"
              lineColor="#0369a1"
            />
          </ComponentLoader>
        </div>
      </div>

      <div className="flex flex-col gap-8 bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <h2 className="text-xl">Income Transaction Total Per Year</h2>
        <div className="flex flex-col gap-4 lg:flex-row">
          <ComponentLoader
            isLoading={isLoadingTransactionsByTotalAmountPerYearIncome}
          >
            <CustomBarChart
              data={transactionsByTotalAmountPerYearIncome}
              syncId="4"
              barColor="#0f766e"
            />
          </ComponentLoader>
          <ComponentLoader
            isLoading={isLoadingTransactionsByTotalAmountPerYearIncome}
          >
            <CustomLineChart
              data={transactionsByTotalAmountPerYearIncome}
              syncId="4"
              lineColor="#0f766e"
            />
          </ComponentLoader>
        </div>
      </div>

      <div className="flex flex-col gap-8 bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <h2 className="text-xl">Income Transaction Total Per Month</h2>
        <div className="flex gap-4 max-w-[400px] w-full">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="year" className="text-xs">
              Year
            </label>
            <input
              id="year"
              type="number"
              min="1900"
              max="2099"
              value={yearIncome}
              onChange={(event) => setYearIncome(event.target.value)}
              className="w-full px-4 py-2 bg-transparent text-white rounded border border-slate-700"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 border border-transparent bg-sky-700 rounded disabled:opacity-50 disabled:pointer-events-none self-end hover:bg-sky-800"
            onClick={refreshTransactionsByTotalAmountPerMonthIncome}
            disabled={isLoadingTransactionsByTotalAmountPerMonthIncome}
          >
            Go
          </button>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <ComponentLoader
            isLoading={isLoadingTransactionsByTotalAmountPerMonthIncome}
          >
            <CustomBarChart
              data={transactionsByTotalAmountPerMonthIncome}
              syncId="5"
              barColor="#0f766e"
            />
          </ComponentLoader>
          <ComponentLoader
            isLoading={isLoadingTransactionsByTotalAmountPerMonthIncome}
          >
            <CustomLineChart
              data={transactionsByTotalAmountPerMonthIncome}
              syncId="5"
              lineColor="#0f766e"
            />
          </ComponentLoader>
        </div>
      </div>

      <div className="flex flex-col gap-8 bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <h2 className="text-xl">Income Transaction Total Per Day</h2>
        <div className="flex gap-4 max-w-[400px] w-full">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="month" className="text-xs">
              Month
            </label>
            <input
              id="month"
              type="month"
              min="1900-01"
              max="2099-12"
              value={yearMonthIncome}
              onChange={(event) => setYearMonthIncome(event.target.value)}
              className="w-full px-4 py-2 bg-transparent text-white rounded border border-slate-700"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 border border-transparent bg-sky-700 rounded disabled:opacity-50 disabled:pointer-events-none self-end hover:bg-sky-800"
            onClick={refreshTransactionsByTotalAmountPerDayIncome}
            disabled={isLoadingTransactionsByTotalAmountPerDayIncome}
          >
            Go
          </button>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <ComponentLoader
            isLoading={isLoadingTransactionsByTotalAmountPerDayIncome}
          >
            <CustomBarChart
              data={transactionsByTotalAmountPerDayIncome}
              syncId="6"
              barColor="#0f766e"
            />
          </ComponentLoader>
          <ComponentLoader
            isLoading={isLoadingTransactionsByTotalAmountPerDayIncome}
          >
            <CustomLineChart
              data={transactionsByTotalAmountPerDayIncome}
              syncId="6"
              lineColor="#0f766e"
            />
          </ComponentLoader>
        </div>
      </div>

      <div className="flex flex-col gap-8 bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="flex justify-between gap-4">
          <h2 className="text-xl">Transactions</h2>
          <button
            type="button"
            className="px-4 py-2 bg-teal-700 rounded disabled:opacity-50 disabled:pointer-events-none hover:bg-teal-800"
            onClick={() => {
              const body = document.querySelector('body');
              if (body) {
                body.style.overflow = 'hidden';
              }
              setShowAddEditTransactionModal(true);
            }}
            disabled={isLoadingTransactions}
          >
            Add
          </button>
        </div>
        <ComponentLoader isLoading={isLoadingTransactions}>
          <TransactionTable
            transactions={transactions}
            setTransaction={setTransaction}
            setName={setName}
            setType={setType}
            setAmount={setAmount}
            setShowAddEditTransactionModal={setShowAddEditTransactionModal}
            setShowDeleteTransactionModal={setShowDeleteTransactionModal}
          />
        </ComponentLoader>
      </div>
    </PageLayout>
  );
}

export default DashboardPage;
