// pages/use-state.js
import React, { useState } from 'react';
import Header from '../components/Header';


const UseStatePage = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-200 min-h-screen flex items-center justify-center">

        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4">Use State Page</h1>
          <p className="text-lg mb-4">Count: {count}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={handleIncrement}
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseStatePage;
