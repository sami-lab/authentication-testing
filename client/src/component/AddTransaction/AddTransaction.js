import React, { useState, useContext } from 'react';
import axios from '../../axios';
import { GlobalContext } from '../../context/GlobalContext';

const AddTransaction = () => {
  const { addTransaction, user } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [transaction, setTransaction] = useState({
    description: {
      value: '',
      error: false,
      errorMessage: '',
    },
    amount: {
      value: '',
      error: false,
      errorMessage: '',
    },
  });
  const SubmitHandler = async (e) => {
    e.preventDefault();
    setError({
      status: false,
      message: '',
    });
    if (transaction.description.value === '') {
      setTransaction({
        ...transaction,
        description: {
          value: transaction.description.value,
          error: true,
          errorMessage: 'Description cannot be empty',
        },
      });
      return;
    }
    if (transaction.amount.value === '' || transaction.amount.value === 0) {
      setTransaction({
        ...transaction,
        amount: {
          value: transaction.amount.value,
          error: true,
          errorMessage: 'Amount cannot be empty or zero',
        },
      });
      return;
    }
    try {
      setLoading(true);
      const result = await axios.post(
        '/transactions/',
        {
          description: transaction.description.value,
          amount: transaction.amount.value,
        },
        {
          headers: {
            authorization: 'Bearer ' + user.token,
          },
        }
      );
      if (result.data.status === 'success') {
        addTransaction(result.data.data.doc);
        setTransaction({
          description: {
            value: '',
            error: false,
            errorMessage: '',
          },
          amount: {
            value: '',
            error: false,
            errorMessage: '',
          },
        });
      } else {
        setError({
          status: true,
          message: result.message,
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError({
        status: true,
        message: err.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <div className="w-100">
      <h3 className="text-center">Add Transaction</h3>
      <hr style={{ width: '90%' }} />
      <form onSubmit={SubmitHandler}>
        <div className="form-group">
          <label
            htmlFor="description"
            className="control-label font-weight-bolder"
          >
            Description
          </label>
          <input
            type="text"
            className={`form-control ${
              transaction.description.error ? 'is-invalid' : ''
            } `}
            id="description"
            value={transaction.description.value}
            onChange={(e) =>
              setTransaction({
                ...transaction,
                description: {
                  value: e.target.value,
                  error: false,
                  errorMessage: '',
                },
              })
            }
            placeholder="Detail of Transaction"
          />
          {transaction.description.error && (
            <div className="invalid-feedback">
              {transaction.description.errorMessage}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="amount" className="control-label font-weight-bolder">
            Transaction Amount{' '}
            <span className="font-weight-smaller">
              (Negative- Expense, Postive+ income)
            </span>
          </label>
          <input
            type="number"
            className={`form-control ${
              transaction.amount.error ? 'is-invalid' : ''
            } `}
            id="amount"
            value={transaction.amount.value}
            onChange={(e) =>
              setTransaction({
                ...transaction,
                amount: {
                  value: e.target.value,
                  error: false,
                  errorMessage: '',
                },
              })
            }
            placeholder="Dollar Value of Transaction"
          />
          {transaction.amount.error && (
            <div className="invalid-feedback">
              {transaction.amount.errorMessage}
            </div>
          )}
        </div>
        <div className="form-group">
          {error.status && <div style={{ color: 'red' }}> {error.message}</div>}
        </div>
        <button
          type="submit"
          disabled={
            transaction.amount.value.length === 0 ||
            transaction.amount.value * 1 === 0 ||
            transaction.description.value.length === 0
          }
          className="btn btn-block btn-primary"
        >
          {loading ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            ' Add Transaction'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
