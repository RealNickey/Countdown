import React from "react";

const ResultsTable = ({ results }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-main-color text-white">
            <th className="py-2 px-4 border-b">Profile Picture</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Start Day</th>
            <th className="py-2 px-4 border-b">90th Day</th>
            <th className="py-2 px-4 border-b">Countdown</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={result.profilePicture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mx-auto"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">{result.name}</td>
              <td className="py-2 px-4 border-b text-center">
                {result.startDay}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {result.ninetiethDay}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {result.countdown}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
