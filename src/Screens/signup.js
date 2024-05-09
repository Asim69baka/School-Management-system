import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import ConvertToBase64 from '../Helper/Convert';
import profile from '../assets/profile.png';

function Signup() {
  const [file, setFile] = useState('');
  const History = useNavigate();

  const initialValues = {
    UserName: '',
    email: '',
    password: ''
  };

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/api/signup", {
        UserName: values.UserName,
        email: values.email,
        password: values.password
      });

      if (response.data === "User already exists") {
        toast.success("User already exists. Please try with another email.");
      } else if (response.data === "User created successfully") {
        toast.success("Signed up successfully!");

        // Generate and send OTP after successful signup
        // const otpResponse = await generateOTP(values.email);
        // if (otpResponse === 'OTP sent successfully') {
        //   toast.success("OTP sent successfully");
        // } else {
        //   toast.error("Failed to send OTP");
        // }

        // Redirect to OTP verification page
        History("/verify");
      }
    } catch (error) {
      if (error) {

        console.log("The error is ", error)
        toast.error(`The error is ${error}`);


      } else {
        console.error('Error:', error.message);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate: (values) => {
      const errors = {};
      if (values.UserName.length < 3) {
        errors.UserName = 'Username must be at least 3 characters';
      }
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = 'Invalid email format';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 5) {
        errors.password = "Password must be at least 5 characters";
      }
      return errors;
    }
  });

  const onUpload = async (e) => {
    const base64 = await ConvertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative bg-white pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 my-10">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="profile flex justify-center py-3">
                <label htmlFor="profile" className="cursor-pointer">
                  <img
                    className="mx-auto h-20 w-20 rounded-full"
                    src={file || profile}
                    alt=""
                  />
                  <input
                    onChange={onUpload}
                    type="file"
                    name="profile"
                    id="profile"
                    className="hidden"
                  />
                </label>
              </div>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up for your account
              </h2>
            </div>
            <div>
              <label htmlFor="UserName" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="UserName"
                  name="UserName"
                  type="text"
                  value={formik.values.UserName}
                  onChange={formik.handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.errors.UserName ? <div className="text-red-500">{formik.errors.UserName}</div> : null}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2 ">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
                {formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..."
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account? {' '}
            <Link to="/Login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Log in now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
