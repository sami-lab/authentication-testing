import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { GlobalProvider, GlobalContext } from "./context/GlobalContext";
import { Switch, Route } from "react-router-dom";
import AuthRoute from "./component/Auth";
import Main from "./component/main";
import Login from "./component/login";
import Signup from "./component/signup";
import VerifyUser from "./component/verifyUser";
import User from "./component/user";

import axios from "./axios";
const Routes = () => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const { setAuth, addTransactions } = useContext(GlobalContext);

  useEffect(() => {
    const fetchToken = async () => {
      setLoadingAuth(true);
      let Token = null;
      try {
        Token = await localStorage.getItem("jwt");
      } catch (e) {
        console.log("Error Fetching Token");
        setLoadingAuth(false);
      }

      if (Token != null) {
        //validate Token Here from server or async storage to find user state
        //validating through server
        try {
          const result = await axios.post("/users/validateToken", null, {
            headers: {
              authorization: "Bearer " + Token,
            },
          });
          if (result.data.status === "success") {
            setAuth({ ...result.data.data.user, token: Token });
            addTransactions(result.data.data.transactions);
          }
          setLoadingAuth(false);
        } catch (e) {
          setLoadingAuth(false);
        }
      } else {
        setLoadingAuth(false);
      }
    };
    fetchToken();
  }, []);

  if (loadingAuth) {
    return (
      <div
        style={{ height: "100vh" }}
        className="w-100 d-flex justify-content-center align-items-center"
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <Switch>
      <Route path="/register" render={(props) => <Signup />} />
      <Route path="/login" render={(props) => <Login />} />
      <Route path="/verifyUser/:token" render={(props) => <VerifyUser />} />
      <AuthRoute path="/user/:id" render={(props) => <User />} />
      <AuthRoute path="/" exact render={(props) => <Main />} />
    </Switch>
  );
};

const App = () => {
  return (
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  );
};

export default App;
