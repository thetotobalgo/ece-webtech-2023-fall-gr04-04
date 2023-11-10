// pages/login-native.js
import React from 'react';

const LoginNativePage = () => {
  const handleLogin = () => {
    const formData = new FormData(document.getElementById('loginForm'));
    console.log('Username:', formData.get('username'));
    console.log('Password:', formData.get('password'));
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Login Native Page</h1>
        <form id="loginForm">
          <label className="block mb-2">
            Username:
            <input
              className="border w-full p-2"
              type="text"
              name="username"
            />
          </label>
          <br />
          <label className="block mb-2">
            Password:
            <input
              className="border w-full p-2"
              type="password"
              name="password"
            />
          </label>
          <br />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginNativePage;
