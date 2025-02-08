import React, { useState, useEffect } from "react";
import UserInput from "./components/UserInput";
import ResultsTable from "./components/ResultsTable";
import EditModal from "./components/EditModal";
import "./App.css";

const App = () => {
  const [results, setResults] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("results")) || [];
    setResults(storedResults);

    // Update countdown every minute
    const interval = setInterval(() => {
      setResults((prevResults) => {
        const updatedResults = prevResults.map((result) => ({
          ...result,
          countdown: calculateCountdown(new Date(result.ninetiethDay)),
        }));
        localStorage.setItem("results", JSON.stringify(updatedResults));
        return updatedResults;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleCalculate = (name, startDate) => {
    const startDay = new Date(startDate);
    const ninetiethDay = new Date(startDate);
    ninetiethDay.setDate(startDay.getDate() + 89); // Adding 89 because start day counts as day 1

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

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedResults = results.filter((_, i) => i !== index);
    setResults(updatedResults);
    localStorage.setItem("results", JSON.stringify(updatedResults));
  };

  const handleSaveEdit = (editedData) => {
    const startDay = new Date(editedData.startDate);
    const ninetiethDay = new Date(editedData.startDate);
    ninetiethDay.setDate(startDay.getDate() + 89);

    const updatedResults = results.map((result, index) => {
      if (index === editingIndex) {
        return {
          ...result,
          name: editedData.name,
          startDay: startDay.toLocaleDateString(),
          ninetiethDay: ninetiethDay.toLocaleDateString(),
          countdown: calculateCountdown(ninetiethDay),
        };
      }
      return result;
    });

    setResults(updatedResults);
    localStorage.setItem("results", JSON.stringify(updatedResults));
    setEditingIndex(null);
  };

  const calculateCountdown = (ninetiethDay) => {
    const now = new Date();
    const endDate = new Date(ninetiethDay);
    endDate.setHours(23, 59, 59, 999); // Set to end of the 90th day

    const timeDiff = endDate - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) return "Expired";
    if (daysDiff === 0) return "Last day";
    return `${daysDiff} days`;
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
          <ResultsTable
            results={results}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
      {editingIndex !== null && (
        <EditModal
          result={results[editingIndex]}
          onSave={handleSaveEdit}
          onClose={() => setEditingIndex(null)}
        />
      )}
    </div>
  );
};

export default App;
