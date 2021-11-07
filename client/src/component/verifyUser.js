import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from '../axios';
export default function VerifyUser() {
  const [message, setMessage] = useState({
    status: false,
    error: false,
    message: '',
  });
  const params = useParams();

  useEffect(() => {
    const verify = async () => {
      try {
        const result = await axios.post('/users/verifyEmail/' + params.token);

        setMessage({
          status: true,
          error: false,
          message: result.data.message,
        });
      } catch (err) {
        console.log(err.response.data.message);
        setMessage({
          status: true,
          error: true,
          message: err?.response?.data?.message || 'Something went wrong',
        });
      }
    };
    verify();
  }, []);

  if (message.status) {
    return (
      <div
        style={{ height: '100vh' }}
        className="w-100 d-flex justify-content-center align-items-center"
      >
        <div
          className={`alert ${
            message.error ? 'alert-danger' : 'alert-success'
          } alert-dismissible fade show`}
          role="alert"
        >
          {message.message}{' '}
          <Link to="/login" target="_blank" className="ml-1">
            Login
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{ height: '100vh' }}
      className="w-100 d-flex justify-content-center align-items-center"
    >
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
