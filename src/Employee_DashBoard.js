import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs for employees

const App = () => {
  const initialEmployees = [
    {
      id: uuidv4(),
      imageUrl:
        "https://cdn-icons-png.flaticon.com/512/0/93.png",
      firstName: "Thomas",
      lastName: "Leannon",
      email: "Thomas.Leannon@dummyapis.com",
      contactNumber: "4121091095",
      age: 43,
      dob: "26/08/1979",
      address: "Address1",
    },
    {
      id: uuidv4(),
      imageUrl:
        "https://cdn-icons-png.flaticon.com/512/0/93.png",
      firstName: "Faye",
      lastName: "Sauer",
      email: "Faye.Sauer@dummyapis.com",
      contactNumber: "4914696673",
      age: 60,
      dob: "28/06/1962",
      address: "Address2",
    },
    // Add more employees here
  ];

  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);  

  const handleEmployeeClick = (employeeId) => {
    setSelectedEmployee(employees.find((emp) => emp.id === employeeId));
  };

  const handleDeleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== employeeId);
    setEmployees(updatedEmployees);
    if (selectedEmployee.id === employeeId) {
      setSelectedEmployee(updatedEmployees? updatedEmployees[0] : {});
    }
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEmployee = {
      id: uuidv4(),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      contactNumber: formData.get("contactNumber"),
      dob: formData.get("dob"),
      address: formData.get("address"),
      imageUrl:
        formData.get("imageUrl") ||
        "https://cdn-icons-png.flaticon.com/512/0/93.png",
      age: new Date().getFullYear() - new Date(formData.get("dob")).getFullYear(),
    };
    setEmployees([...employees, newEmployee]);
    setShowAddEmployeeModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Employee Management System</h1>
        <button
          onClick={() => setShowAddEmployeeModal(true)}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Add Employee
        </button>
      </div>

      <div className="flex space-x-4">
        {/* Employee List */}
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-md overflow-y-auto">
          <h2 className="text-xl font-semibold mb-3">Employees</h2>
          <div className="space-y-3">   
            {employees.map((emp) => (
              <div
                key={emp.id}
                className={`cursor-pointer p-3 rounded-lg shadow-sm hover:bg-gray-200 ${
                  selectedEmployee.id === emp.id ? "bg-indigo-100" : ""
                }`}
                onClick={() => handleEmployeeClick(emp.id)}
              >
                <div className="flex items-center justify-between">
                 <div className="flex space-x-3">
                 <img
                    src={emp.imageUrl}
                    alt="Employee"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">
                      {emp.firstName} {emp.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{emp.email}</div>
                  </div>
                 </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteEmployee(emp.id);
                    }}
                    className="ml-auto text-red-500 hover:text-red-700"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Details */}
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Employee Details</h2>
          {selectedEmployee && (
            <div className="flex flex-col items-center space-y-4">
              <img
                src={selectedEmployee.imageUrl}
                alt="Employee"
                className="w-32 h-32 rounded-full object-cover"
              />
              <div className="text-2xl font-semibold">
                {selectedEmployee.firstName} {selectedEmployee.lastName} ({selectedEmployee.age} years old)
              </div>
              <div className="text-lg text-gray-600">{selectedEmployee.address}</div>
              <div className="text-sm text-gray-500">{selectedEmployee.email}</div>
              <div className="text-sm text-gray-500">Mobile: {selectedEmployee.contactNumber}</div>
              <div className="text-sm text-gray-500">DOB: {selectedEmployee.dob}</div>
            </div>
          )}
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onSubmit={handleAddEmployee}
          >
            <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="date"
                name="dob"
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="url"
                name="imageUrl"
                placeholder="Image URL"
                className="w-full p-2 border rounded-lg"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                >
                  Add Employee
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddEmployeeModal(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;