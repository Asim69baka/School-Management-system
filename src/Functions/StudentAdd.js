// AddStudentForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { fetchDataStudents } from '../Utils/FetchData';

const AddStudentForm = ({ onClose, setData }) => {
    const [newName, setNewName] = useState('');
    const [newClass, setNewClass] = useState('');
    const [newRoll, setNewRoll] = useState('');
    const [newSection, setNewSection] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validating the inputs
        if (!newName || !newClass || !newRoll || !newSection) {
            toast.error('Please fill out all fields.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/sendDataStudents', {
                name: newName,
                className: newClass,
                roll: newRoll,
                section: newSection,
                Image: selectedFile
            });
            if (response.data === 'Roll number already exists') {
                toast.error('Roll number already exists');
            } else {
                onClose(); // Close the window after successful submission
                toast.success('Information added successfully.');
                fetchDataStudents()
                    .then(data => setData(data)) // Update data with fetched data
                    .catch(error => console.error('Error updating data:', error));
            }
        } catch (error) {
            console.error('Error adding new information:', error);
            toast.error(error.message || 'Failed to add new information. Please try again later.');
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !(file instanceof Blob)) {
            return; // Return early if file is not valid
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedFile(reader.result); // Update selected file state with base64 string
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Add Student</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="Name"
                            className="px-4 py-2 border border-gray-300 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={newClass}
                            onChange={(e) => setNewClass(e.target.value)}
                            placeholder="Class"
                            className="px-4 py-2 border border-gray-300 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={newRoll}
                            onChange={(e) => setNewRoll(e.target.value)}
                            placeholder="Roll"
                            className="px-4 py-2 border border-gray-300 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={newSection}
                            onChange={(e) => setNewSection(e.target.value)}
                            placeholder="Section"
                            className="px-4 py-2 border border-gray-300 w-full"
                        />
                    </div>
                    {/* Image upload */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mb-4"
                    />
                    {selectedFile && (
                        <img
                            src={selectedFile}
                            alt="Selected"
                            className="mb-4 w-20 h-20 object-cover rounded-full"
                        />
                    )}
                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Submit
                        </button>
                        <button onClick={onClose} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudentForm;
