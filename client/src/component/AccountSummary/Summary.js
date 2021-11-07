import React, { useContext } from 'react';

import { GlobalContext } from '../../context/GlobalContext';
import Card from './card';
export const AccountSummary = () => {
  const { transactions } = useContext(GlobalContext);

  const transactionAmounts = transactions.map(
    (transaction) => transaction.amount
  );

  const income = transactionAmounts
    .filter((transaction) => transaction > 0)
    .reduce((bal, item) => (bal += item), 0);

  const expense = Math.abs(
    transactionAmounts
      .filter((transaction) => transaction < 0)
      .reduce((bal, item) => (bal += item), 0)
  );

  return (
    <div className="d-flex w-100">
      <Card title="INCOME" amount={income.toFixed(2)} />

      <Card title="EXPENSE" amount={expense.toFixed(2)} />
    </div>
  );
};

export default AccountSummary;
