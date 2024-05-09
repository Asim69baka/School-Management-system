import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import avatar from '../../assets/profile.png';
import AddStudentForm from '../../Functions/StudentAdd'; // Import the AddStudentForm component
import { fetchDataStudents } from '../../Utils/FetchData';

const InformationTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [showAddStudentWindow, setShowAddStudentWindow] = useState(false); // State to control visibility of AddStudentForm


    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/deleteInfoStudents/${id}`);
            if (response.data.message === 'Information deleted successfully') {
                const updatedData = await fetchDataStudents();
                setData(updatedData);
                toast.success('Information deleted successfully.');
            } else {
                toast.error('Failed to delete information.');
            }
        } catch (error) {
            console.error('Error deleting information:', error);
            toast.error('Failed to delete information. Please try again later.');
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                const fetchedData = await fetchDataStudents();
                setData(fetchedData); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to fetch data. Please try again later.');
            }
        };

        fetchDataAndSetState();
    }, []);

    const handleOpenAddStudentWindow = () => {
        setShowAddStudentWindow(true); // Set showAddStudentWindow to true to display the AddStudentForm
    };

    const handleCloseAddStudentWindow = () => {
        setShowAddStudentWindow(false); // Set showAddStudentWindow to false to hide the AddStudentForm
    };

    return (
        <div className="container mx-auto p-4">
            <Toaster position="top-center" reverseOrder={false} />
            <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
                Information Table
                <button
                    onClick={handleOpenAddStudentWindow}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Add Student
                </button>
            </h2>

            {/* Render AddStudentForm conditionally based on showAddStudentWindow state */}
            {showAddStudentWindow && <AddStudentForm onClose={handleCloseAddStudentWindow} />}

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 bg-gray-200 text-gray-800 border border-gray-200">Image</th>
                            <th className="px-4 py-2 bg-gray-200 text-gray-800 border border-gray-200">Name</th>
                            <th className="px-4 py-2 bg-gray-200 text-gray-800 border border-gray-200">Class</th>
                            <th className="px-4 py-2 bg-gray-200 text-gray-800 border border-gray-200">Roll</th>
                            <th className="px-4 py-2 bg-gray-200 text-gray-800 border border-gray-200">Section</th>
                            <th className="px-4 py-2 bg-gray-200 text-gray-800 border border-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border border-gray-200">
                                    {item.Image ? (
                                        <img src={item.Image} alt="User" className="w-10 h-10 rounded-full" />
                                    ) : (
                                        <img src={avatar} alt="Placeholder" className="w-10 h-10 rounded-full" />
                                    )}
                                </td>
                                <td className="px-4 py-2 border border-gray-200">{item.name}</td>
                                <td className="px-4 py-2 border border-gray-200">{item.className}</td>
                                <td className="px-4 py-2 border border-gray-200">{item.roll}</td>
                                <td className="px-4 py-2 border border-gray-200">{item.section}</td>
                                <td className="px-4 py-2 border border-gray-200">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center my-4">
                <ul className="flex list-none">
                    {data.length > itemsPerPage &&
                        Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
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
    )
};

export default InformationTable;
