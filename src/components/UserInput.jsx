import React, { useState } from "react";

const UserInput = ({ onCalculate }) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleCalculate = () => {
    if (name && startDate) {
      onCalculate(name, startDate);
      // Reset input fields after submission
      setName("");
      setStartDate("");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="input px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <button
        onClick={handleCalculate}
        className="btn px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Calculate
      </button>
    </div>
  );
};

export default UserInput;
