import React, { useState, useEffect } from "react";
import UserInput from "./components/UserInput";
import ResultsTable from "./components/ResultsTable";
import "./App.css";

const App = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("results")) || [];
    setResults(storedResults);
  }, []);

  const handleCalculate = (name, startDate) => {
    const startDay = new Date(startDate);
    const ninetiethDay = new Date(startDay);
    ninetiethDay.setDate(startDay.getDate() + 90);

    const result = {
      profilePicture: "https://via.placeholder.com/50",
      name,
      startDay: startDay.toLocaleDateString(),
      ninetiethDay: ninetiethDay.toLocaleDateString(),
      countdown: calculateCountdown(ninetiethDay),
    };

    const updatedResults = [...results, result];
    setResults(updatedResults);
    localStorage.setItem("results", JSON.stringify(updatedResults));
  };

  const calculateCountdown = (ninetiethDay) => {
    const now = new Date();
    const timeDiff = ninetiethDay - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff > 0 ? `${daysDiff} days` : "Expired";
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          90 Day Calculator
        </h1>
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <UserInput onCalculate={handleCalculate} />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <ResultsTable results={results} />
        </div>
      </div>
    </div>
  );
};

export default App;
