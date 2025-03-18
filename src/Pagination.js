import { useState } from 'react';

const UsersTable = () => {
  // Sample user data
  const users = [
    { id: 1, name: 'John Doe', age: 25, occupation: 'Developer' },
    { id: 2, name: 'Jane Smith', age: 30, occupation: 'Designer' },
    { id: 3, name: 'Bob Johnson', age: 35, occupation: 'Manager' },
    { id: 4, name: 'Alice Brown', age: 28, occupation: 'Engineer' },
    { id: 5, name: 'Charlie Wilson', age: 32, occupation: 'Analyst' },
    { id: 6, name: 'Eva Davis', age: 27, occupation: 'Developer' },
    { id: 7, name: 'Frank Miller', age: 40, occupation: 'Director' },
    { id: 8, name: 'Grace Taylor', age: 29, occupation: 'Designer' },
    { id: 9, name: 'Henry Clark', age: 33, occupation: 'Engineer' },
    { id: 10, name: 'Ivy Anderson', age: 31, occupation: 'Manager' },
    { id: 11, name: 'Jack White', age: 36, occupation: 'Analyst' },
    { id: 12, name: 'Kelly Green', age: 34, occupation: 'Developer' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Calculate pagination values
  const totalPages = Math.ceil(users.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentUsers = users.slice(startIndex, endIndex);

  // Navigation handlers
  const goToNextPage = () => {
    setCurrentPage(page => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(page => Math.max(page - 1, 1));
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Page Size Selector */}
      <div className="mb-4 flex items-center">
        <label className="mr-2">Users per page:</label>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="border rounded p-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Age</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Occupation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.age}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.occupation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default UsersTable;