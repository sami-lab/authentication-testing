import * as actionTypes from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case actionTypes.ADD_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.concat(action.payload),
      };
    case actionTypes.REMOVE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
