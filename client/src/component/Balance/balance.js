import React, { useContext } from 'react';

// Import the Global State
import { GlobalContext } from '../../context/GlobalContext';

const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amount = transactions
    .map((transaction) => transaction.amount)
    .reduce((bal, item) => (bal += item), 0);

  return (
    <div>
      <h5 className="font-weight-bolder">CURRENT BALANCE</h5>
      <h1 className="text-center">${amount.toFixed(2)}</h1>
    </div>
  );
};

export default Balance;
