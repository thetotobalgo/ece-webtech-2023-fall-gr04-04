// pages/login-native.js
import React from 'react';

const LoginNativePage = () => {
  const handleLogin = () => {
    // Use FormData to get form data
    const formData = new FormData(document.getElementById('loginForm'));
    console.log('Username:', formData.get('username'));
    console.log('Password:', formData.get('password'));
  };

  return (
    <div>
      <h1>Login Native Page</h1>
      <form id="loginForm">
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginNativePage;
