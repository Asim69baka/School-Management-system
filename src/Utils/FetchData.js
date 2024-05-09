// utils.js
import axios from 'axios';

export const fetchDataTeachers = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/getDataTeachers');
    if (!response.data) {
      throw new Error('Failed to fetch data');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data. Please try again later.');
  }
};

export const fetchDataStudents = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/getDataStudents');
    if (!response.data) {
      throw new Error('Failed to fetch data');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data. Please try again later.');
  }
};
