import React from "react";
import { Link } from "react-router-dom";
export default (props) => {
  return (
    <h3 className="text-center my-5 text-primary font-weight-bolder">
      Expense Tracker for{" "}
      <Link to={`/user/${props.id}`} style={{ color: "#0056b3" }}>
        {props.name}
      </Link>{" "}
    </h3>
  );
};
