import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [selectedClass, setSelectedClass] = useState(null);
  const [nameQuery, setNameQuery] = useState('');
  const [rollQuery, setRollQuery] = useState('');
  const [sectionQuery, setSectionQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedClass) {
          const response = await axios.get(`http://localhost:8000/api/getDataStudents?class=${selectedClass}&name=${nameQuery}&roll=${rollQuery}&section=${sectionQuery}`);
          setStudents(response.data);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, pageSize, selectedClass, nameQuery, rollQuery, sectionQuery]);

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentStudents = students.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClassChange = (event) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
    setCurrentPage(1);
  };

  const handleNameChange = (event) => {
    setNameQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleRollChange = (event) => {
    setRollQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSectionChange = (event) => {
    setSectionQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      <div className="mb-4">
        <label className="block mb-2">Select Class:</label>
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={selectedClass || ''}
          onChange={handleClassChange}
        >
          <option value="">Select Class</option>
          <option value="1">Class 1</option>
          <option value="2">Class 2</option>
          {/* Add more options for other classes */}
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={nameQuery}
          onChange={handleNameChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by roll..."
          value={rollQuery}
          onChange={handleRollChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by section..."
          value={sectionQuery}
          onChange={handleSectionChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
              {/* Add more table headers if needed */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentStudents.map((student, index) => (
              <React.Fragment key={student.id}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={student.Image}
                      alt={`${student.firstName} ${student.lastName}`}
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.className}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.roll}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.section}</td>
                  {/* Add more table data cells if needed */}
                </tr>
                {/* Add expandable row logic if needed */}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center my-4">
          <ul className="flex list-none">
            {students.length > pageSize &&
              Array.from({ length: Math.ceil(students.length / pageSize) }).map((_, index) => (
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

export default StudentList;
