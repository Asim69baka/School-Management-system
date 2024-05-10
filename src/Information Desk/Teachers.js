import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Add as AddIcon } from '@mui/icons-material';

const StackList = () => {
  const [employees, setEmployees] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, searchQuery]); // Include searchQuery in the dependency array

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/getDataTeachers?page=${currentPage}&pageSize=${pageSize}&search=${searchQuery}`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleRowExpansion = (index) => {
    const newExpandedRows = [...expandedRows];
    newExpandedRows[index] = !newExpandedRows[index];
    setExpandedRows(newExpandedRows);
  };

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset current page when search query changes
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Employee Stack List</h1>
      <div className="overflow-x-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((employee, index) => (
              <React.Fragment key={employee.id}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={employee.Image} // Assuming you have a 'photoUrl' field in your employee data
                      alt={`${employee.firstName} ${employee.lastName}`}
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.name} {employee.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-blue-500"
                      onClick={() => toggleRowExpansion(index)}
                    >
                      <AddIcon />
                    </button>
                  </td>
                </tr>
                {expandedRows[index] && (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div><strong>Department:</strong> {employee.department}</div>
                        <div><strong>Phone Number:</strong> {employee.phoneNumber}</div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center my-4">
          <ul className="flex list-none">
            {employees.length > pageSize &&
              Array.from({ length: Math.ceil(filteredEmployees.length / pageSize) }).map((_, index) => (
                <li key={index} className="mx-1">
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1 rounded focus:outline-none ${currentPage === index + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                      }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StackList;
