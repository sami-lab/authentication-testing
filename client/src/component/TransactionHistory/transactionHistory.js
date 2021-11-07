import React, { useContext } from 'react';
import axios from '../../axios';

import { GlobalContext } from '../../context/GlobalContext';
import Transaction from './transaction';

const TransactionHistory = () => {
  const { transactions, deleteTransaction, user } = useContext(GlobalContext);

  const deleteClickHandler = async (id) => {
    try {
      await axios.delete('/transactions/' + id, {
        headers: {
          authorization: 'Bearer ' + user.token,
        },
      });
      deleteTransaction(id);
    } catch (err) {
      alert('Something went wrong');
    }
  };
  return (
    <div className="w-100">
      <h3 className="text-center mt-3">Transaction History</h3>
      <hr style={{ width: '90%' }} />
      <ul className="list-unstyled">
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            deleteTransaction={deleteClickHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
