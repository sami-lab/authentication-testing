import React, { useContext } from "react";

import Header from "./Header/header";
import Balance from "./Balance/balance";
import Summary from "./AccountSummary/Summary";
import TransactionHistory from "./TransactionHistory/transactionHistory";
import AddTransaction from "./AddTransaction/AddTransaction";
import { GlobalContext } from "../context/GlobalContext";

export default function Main() {
  const { user } = useContext(GlobalContext);

  return (
    <div className="mx-auto mt-2">
      <Header name={user.name} id={user._id} />
      <div className="d-flex justify-content-center flex-xl-row flex-lg-row flex-md-row flex-column">
        <div className="col-md-5 col-lg-5 col-xl-5 col-12 ">
          <div className="d-flex  align-items-center  flex-column">
            <Balance />
            <Summary />
          </div>
        </div>
        <div className="col-md-5 col-lg-5 col-xl-5 col-12">
          <div className="d-flex  align-items-center  flex-column">
            <AddTransaction />
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
