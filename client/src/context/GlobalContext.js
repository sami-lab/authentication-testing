import React, { createContext, useReducer } from 'react';

import * as actionTypes from './actions';
import reducer from './reducer';

const initialState = {
  transactions: [],
  user: {},
};
export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addTransactions(transactions) {
    dispatch({
      type: actionTypes.ADD_TRANSACTIONS,
      payload: transactions,
    });
  }
  function addTransaction(transaction) {
    dispatch({
      type: actionTypes.ADD_TRANSACTION,
      payload: transaction,
    });
  }
  function deleteTransaction(id) {
    dispatch({
      type: actionTypes.REMOVE_TRANSACTION,
      payload: id,
    });
  }
  function setAuth(user) {
    dispatch({
      type: actionTypes.SET_USER,
      payload: user,
    });
  }
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        user: state.user,
        addTransactions,
        addTransaction,
        deleteTransaction,
        setAuth,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
