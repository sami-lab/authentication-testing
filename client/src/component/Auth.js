import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';

import { GlobalContext } from '../context/GlobalContext';

const AuthRoute = (props) => {
  const { user } = useContext(GlobalContext);
  if (Object.keys(user).length === 0 || !user.email)
    return <Redirect to="/login" />;

  return <Route {...props} />;
};

export default AuthRoute;
