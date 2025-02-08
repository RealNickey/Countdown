import React, { useState } from "react";
import { FaSort, FaEdit, FaTrash } from "react-icons/fa";

const ResultsTable = ({ results, onEdit, onDelete }) => {
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterText, setFilterText] = useState("");
  const [dateFilter, setDateFilter] = useState({ start: "", end: "" });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedAndFilteredResults = [...results]
    .filter((result) => {
      const matchesText =
        filterText.toLowerCase() === "" ||
        result.name.toLowerCase().includes(filterText.toLowerCase());

      const resultDate = new Date(result.startDay);
      const matchesDateRange =
        (!dateFilter.start || resultDate >= new Date(dateFilter.start)) &&
        (!dateFilter.end || resultDate <= new Date(dateFilter.end));

      return matchesText && matchesDateRange;
    })
    .sort((a, b) => {
      if (!sortField) return 0;

      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "countdown") {
        aValue = parseInt(a.countdown) || 0;
        bValue = parseInt(b.countdown) || 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const getRowColor = (countdown) => {
    if (countdown === "Expired") return "bg-green-100";
    const days = parseInt(countdown);
    if (days <= 15) return "bg-yellow-100";
    return "bg-red-50";
  };

  const SortHeader = ({ field, children }) => (
    <th
      className="py-2 px-4 border-b cursor-pointer hover:bg-orange-600"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center justify-between">
        {children}
        <FaSort
          className={sortField === field ? "opacity-100" : "opacity-50"}
        />
      </div>
    </th>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by name..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
        <input
          type="date"
          value={dateFilter.start}
          onChange={(e) =>
            setDateFilter((prev) => ({ ...prev, start: e.target.value }))
          }
          className="px-4 py-2 border rounded-md"
        />
        <input
          type="date"
          value={dateFilter.end}
          onChange={(e) =>
            setDateFilter((prev) => ({ ...prev, end: e.target.value }))
          }
          className="px-4 py-2 border rounded-md"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-main-color text-white">
              <SortHeader field="name">Name</SortHeader>
              <SortHeader field="startDay">Start Day</SortHeader>
              <SortHeader field="ninetiethDay">90th Day</SortHeader>
              <SortHeader field="countdown">Countdown</SortHeader>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredResults.map((result, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${getRowColor(result.countdown)}`}
              >
                <td className="py-2 px-4 border-b text-center">
                  {result.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {result.startDay}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {result.ninetiethDay}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {result.countdown}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => onEdit(index)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
