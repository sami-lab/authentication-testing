import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import axios from "../axios";
export default function User() {
  const { user: globaluser, setAuth } = useContext(GlobalContext);

  const [updating, setUpdating] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [user, setUser] = useState({
    name: {
      value: globaluser.name,
      error: false,
      errorMessage: "",
    },
    email: {
      value: globaluser.email,
      error: false,
      errorMessage: "",
    },
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (!updating) {
      setUpdating(true);
      return;
    }
    setError({
      status: false,
      message: "",
    });
    if (user.name.value === "") {
      setUser({
        ...user,
        name: {
          value: user.name.value,
          error: true,
          errorMessage: "Name cannot be empty",
        },
      });
      return;
    }
    try {
      setLoading(true);
      const result = await axios.patch(
        "/users/updateMe",
        {
          name: user.name.value,
        },
        {
          headers: {
            authorization: "Bearer " + globaluser.token,
          },
        }
      );

      if (result.data.status === "success") {
        setAuth({ ...result.data.data.user, token: globaluser.token });
        setUpdating(false);
      } else {
        setError({
          status: true,
          message: result.message,
        });
      }

      setLoading(false);
    } catch (err) {
      console.log(err.response.data.message);

      setLoading(false);
      setError({
        status: true,
        message: err?.response?.data?.message || "Something went wrong",
      });
    }
  };
  return (
    <div
      className="w-100"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        className="col-md-6 col-12 p-5 border rounded"
        style={{ backgroundColor: "#F1F2F4" }}
      >
        <h3 className="text-center">Profile</h3>
        <hr style={{ width: "90%" }} />
        <form onSubmit={SubmitHandler}>
          <div className="form-group">
            <label htmlFor="name" className="control-label font-weight-bolder">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${user.name.error ? "is-invalid" : ""} `}
              id="name"
              disabled={!updating}
              value={user.name.value}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: {
                    value: e.target.value,
                    error: false,
                    errorMessage: "",
                  },
                })
              }
              placeholder="Full name"
            />
            {user.name.error && (
              <div className="invalid-feedback">{user.name.errorMessage}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="control-label font-weight-bolder">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${
                user.email.error ? "is-invalid" : ""
              } `}
              disabled
              id="email"
              value={user.email.value}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: {
                    value: e.target.value,
                    error: false,
                    errorMessage: "",
                  },
                })
              }
              placeholder="Email"
            />
            {user.email.error && (
              <div className="invalid-feedback">{user.email.errorMessage}</div>
            )}
          </div>
          <div className="form-group">
            {error.status && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {" "}
                {error.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`btn btn-block ${
              loading ? "btn-secondary" : "btn-primary"
            }  `}
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : updating ? (
              "Submit"
            ) : (
              "Update"
            )}
          </button>
          <div className="d-flex justify-content-center mt-2">
            Back to
            <Link to="/" className="ml-1" style={{ textAlign: "center" }}>
              Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
