import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isRegister ? 'Register:' : 'Login:', formData);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <button className="back-btn" onClick={() => window.history.back()}>
          ← Back
        </button>

        <div className="login-left">
          <div className="logo-section">
            <div className="logo-icon">
              <span className="mountain">⛰️</span>
              <span className="shield">🛡️</span>
            </div>
            <h1>MountainShield</h1>
          </div>
          
          {isRegister ? (
            <>
              <h2>Start Protecting Your</h2>
              <h3>Join Thousands who trust MountainShield</h3>
              <p>for real-time hazard monitoring & AI-powered alerts</p>
            </>
          ) : (
            <>
              <h2>Welcome Back to</h2>
              <h3>MountainShield</h3>
              <p>Continue monitoring mountain hazards and protecting your community with AI-powered risk assessment</p>
            </>
          )}
          
          <div className="features">
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <div>
                <h4>24/7 Monitoring</h4>
                <p>Instant Alerts</p>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="form-header">
            <h4>{isRegister ? 'Create your MountainShield account' : 'Sign in to MountainShield'}</h4>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {isRegister && (
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {isRegister && (
              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isRegister ? 'Create Account →' : 'Sign In →'}
            </button>
          </form>

          {/* FIXED: class → className */}
          <div className="form-footer">
            {isRegister ? (
              <>
                <p>Already have an account? <button type="button" className="switch-link" onClick={() => setIsRegister(false)}>Login</button></p>
              </>
            ) : (
              <>
                <p>Don't have an account? <button type="button" className="switch-link" onClick={() => setIsRegister(true)}>Create Account</button></p>
                <a href="#" className="forgot-link">Forgot Password?</a>
              </>
            )}
            <p className="terms">By creating an account, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
