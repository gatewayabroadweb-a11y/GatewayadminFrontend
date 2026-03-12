import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { constant } from '../constant/index.constant';

function Login({ handleLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${constant.REACT_APP_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      handleLogin()
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.user.name);
      navigate(`/admin/dashboard`);
      // Redirect or do something else upon successful login
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href=" "><b>Gateway</b>Abroad</a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fa fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fa fa-lock" />
                  </div>
                </div>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">
                      Remember Me
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
