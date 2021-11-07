import React, { useState, useContext } from 'react';
import axios from '../axios';
import { Link, useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

export default function Signup() {
  const router = useHistory();
  const { user: globaluser } = useContext(GlobalContext);
  if (!Object.keys(globaluser).length === 0 || globaluser.email)
    router.push('/');

  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [user, setUser] = useState({
    name: {
      value: '',
      error: false,
      errorMessage: '',
    },
    email: {
      value: '',
      error: false,
      errorMessage: '',
    },
    password: {
      value: '',
      error: false,
      errorMessage: '',
    },
    confirmPassword: {
      value: '',
      error: false,
      errorMessage: '',
    },
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setSignupSuccess(false);
    setError({
      status: false,
      message: '',
    });
    if (user.name.value === '') {
      setUser({
        ...user,
        name: {
          value: user.name.value,
          error: true,
          errorMessage: 'Name cannot be empty',
        },
      });
      return;
    }
    if (user.email.value === '') {
      setUser({
        ...user,
        email: {
          value: user.email.value,
          error: true,
          errorMessage: 'Email cannot be empty',
        },
      });
      return;
    }
    if (
      !/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(
        user.email.value
      )
    ) {
      setUser({
        ...user,
        email: {
          value: user.email.value,
          error: true,
          errorMessage: 'Invalid Email',
        },
      });
      return;
    }
    if (user.password.value === '') {
      setUser({
        ...user,
        password: {
          value: user.password.value,
          error: true,
          errorMessage: 'Password cannot be empty',
        },
      });
      return;
    }
    if (user.password.value !== user.confirmPassword.value) {
      setUser({
        ...user,
        confirmPassword: {
          value: user.confirmPassword.value,
          error: true,
          errorMessage: 'Password and Confirm Password does not match',
        },
      });
      return;
    }

    try {
      setLoading(true);
      const result = await axios.post('/users/Signup', {
        name: user.name.value,
        email: user.email.value,
        password: user.password.value,
        confirmPassword: user.confirmPassword.value,
      });

      if (result.data.status === 'success') {
        setSignupSuccess(true);
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
        message: err?.response?.data?.message || 'Something went wrong',
      });
    }
  };
  return (
    <div
      className="w-100"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        className="col-md-6 col-12 p-5 border rounded"
        style={{ backgroundColor: '#F1F2F4' }}
      >
        <h3 className="text-center">Register</h3>
        <hr style={{ width: '90%' }} />
        <form onSubmit={SubmitHandler}>
          <div className="form-group">
            <label htmlFor="name" className="control-label font-weight-bolder">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${user.name.error ? 'is-invalid' : ''} `}
              id="name"
              value={user.name.value}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: {
                    value: e.target.value,
                    error: false,
                    errorMessage: '',
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
                user.email.error ? 'is-invalid' : ''
              } `}
              id="email"
              value={user.email.value}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: {
                    value: e.target.value,
                    error: false,
                    errorMessage: '',
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
            <label
              htmlFor="password"
              className="control-label font-weight-bolder"
            >
              Password
            </label>
            <input
              type="password"
              className={`form-control ${
                user.password.error ? 'is-invalid' : ''
              } `}
              id="password"
              value={user.password.value}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: {
                    value: e.target.value,
                    error: false,
                    errorMessage: '',
                  },
                })
              }
              placeholder="Password"
            />
            {user.password.error && (
              <div className="invalid-feedback">
                {user.password.errorMessage}
              </div>
            )}
          </div>
          <div className="form-group">
            <label
              htmlFor="confirmPassword"
              className="control-label font-weight-bolder"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${
                user.confirmPassword.error ? 'is-invalid' : ''
              } `}
              id="confirmPassword"
              value={user.confirmPassword.value}
              onChange={(e) =>
                setUser({
                  ...user,
                  confirmPassword: {
                    value: e.target.value,
                    error: false,
                    errorMessage: '',
                  },
                })
              }
              placeholder="Password"
            />
            {user.confirmPassword.error && (
              <div className="invalid-feedback">
                {user.confirmPassword.errorMessage}
              </div>
            )}
          </div>
          <div className="form-group">
            {signupSuccess && (
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                An Email has been sent to your email Adress.Please verify your
                email to continue
                <button
                  type="button"
                  onClick={() => setSignupSuccess(false)}
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
          </div>
          <div className="form-group">
            {error.status && (
              <div style={{ color: 'red', fontSize: '12px' }}>
                {' '}
                {error.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`btn btn-block ${
              loading ? 'btn-secondary' : 'btn-primary'
            }  `}
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              'Signup'
            )}
          </button>
          <div className="d-flex justify-content-center mt-2">
            Already have account
            <Link to="/login" className="ml-1" style={{ textAlign: 'center' }}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
