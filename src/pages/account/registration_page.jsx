import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    idNumber: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRegisteredModal, setShowRegisteredModal] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRegisteredModal = () => {
    setShowRegisteredModal(!showRegisteredModal);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    if (
      formData.idNumber.trim() === '' ||
      formData.email.trim() === '' ||
      formData.username.trim() === '' ||
      formData.password.trim() === '' ||
      formData.confirmPassword.trim() === ''
    ) {
      setRegistrationError('All fields are required.');
      return false;
    }

    // Email validation using a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setRegistrationError('Please enter a valid email address.');
      return false;
    }

    // Password should be at least 8 characters long
    if (formData.password.length < 8) {
      setRegistrationError('Password should be at least 8 characters long.');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setRegistrationError('Password and Confirm Password do not match.');
      return false;
    }
    if (formData.contactNumber.length !== 10 || isNaN(formData.contactNumber)) {
      setRegistrationError('Contact Number should be a 10-digit number.');
      return false;
    }

    if (formData.firstName.match(/\d/)) {
      setRegistrationError('First Name should not contain numbers.');
      return false;
    }

    if (formData.lastName.match(/\d/)) {
      setRegistrationError('Last Name should not contain numbers.');
      return false;
    }
    // Add more validation as needed

    return true;
  };

  const handleRegistration = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idNumber: formData.idNumber,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        console.log('Registration successful!');
        toggleRegisteredModal();
      } else {
        const errorData = await response.json();
        setRegistrationError(errorData.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setRegistrationError('An error occurred during registration.');
    }
  };

  return (
    <>
      <Head>
        <title>Registration Page</title>
      </Head>

      <div className="flex h-screen items-center justify-center bg-gray">
        <div className="shadow-1g w-96 bg-white">
          <div className="font-serif">
            <h1 className="font-rubik flex justify-center gap-3 bg-[#2A9134] p-5 text-center font-sans text-2xl font-bold text-white">
              <div id="logo" className="h-10 w-10 md:h-12 md:w-12">
                <img src="/CvSULogo.png" alt="logo" className="h-full w-full object-cover" />
              </div>
              REGISTER ACCOUNT
            </h1>
          </div>
          <form className="mb-2 max-h-80 overflow-y-auto p-6">
            <div className="mt-3">
              <label className="text-gray-700 mb-1 mt-1 block font-medium" htmlFor="idNumber">
                ID Number
              </label>
              <input
                id="idNumber"
                type="text"
                autoComplete="off"
                autoFocus
                required
                value={formData.idNumber}
                onChange={handleInputChange}
                className="border-gray-300 bg-gray-100 text-gray-700 w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
              />
            </div>
            <div className="mt-3">
              <label className="text-gray-700 mb-1 mt-1 block font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="text"
                autoComplete="off"
                value={formData.email}
                onChange={handleInputChange}
                className="border-gray-300 bg-gray-100 text-gray-700 w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
              />
            </div>
            <div className="mt-3">
              <label className="text-gray-700 mb-1 mt-1 block font-medium" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="off"
                value={formData.username}
                onChange={handleInputChange}
                className="border-gray-300 bg-gray-100 text-gray-700 w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
              />
            </div>
            <div className="mt-3">
              <label className="text-gray-700 mb-1 mt-1 block font-medium" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                autoComplete="off"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="border-gray-300 bg-gray-100 text-gray-700 w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
              />
            </div>
            <div className="mt-3">
              <label className="text-gray-700 mb-1 mt-1 block font-medium" htmlFor="middleName">
                Middle Name
              </label>
              <input
                id="middleName"
                type="text"
                autoComplete="off"
                value={formData.middleName}
                onChange={handleInputChange}
                className="border-gray-300 bg-gray-100 text-gray-700 w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
              />
            </div>
            <div className="mt-3">
              <label className="text-gray-700 mb-1 mt-1 block font-medium" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                autoComplete="off"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="border-gray-300 bg-gray-100 text-gray-700 w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
              />
            </div>
            <div className="mt-3">
              <label className="text-gray-700 mb-1 mt-1 block font-medium" htmlFor="nameSuffix">
                Name Suffix
              </label>
              <input
                id="nameSuffix"
                type="text"
                autoComplete="off"
                value={formData.nameSuffix}
                onChange={handleInputChange}
                className="border-gray-300 bg-gray-100 text-gray-700 w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
              />
            </div>
            <div className="mt-3">
              <label className="text-gray-700 mb-1 mt-1 block font-medium" htmlFor="contactNumber">
                Contact Number
              </label>
              <input
                id="contactNumber"
                type="text"
                autoComplete="off"
                required
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="border-gray-300 bg-gray-100 text-gray-700 w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
              />
            </div>
            <div className="mt-3">
              <label className="text-gray-700 mb-1 mt-1 block font-medium" htmlFor="department">
                Department
              </label>
              <input
                id="department"
                type="text"
                autoComplete="off"
                value={formData.department}
                onChange={handleInputChange}
                className="border-gray-300 bg-gray-100 text-gray-700 w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
              />
            </div>
            <div className="mt-3">
              <label className="text-gray-700 mb-1 mt-6 block font-medium" htmlFor="password">
                Password
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 right-0 flex items-center px-2">
                  <input
                    className="js-password-toggle hidden"
                    id="passwordToggle"
                    type="checkbox"
                    required
                    onChange={togglePasswordVisibility}
                  />
                  <label
                    className="bg-gray-300 hover:bg-gray-400 text-gray-600 js-password-label cursor-pointer rounded px-2 py-1 font-mono text-sm"
                    htmlFor="passwordToggle"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </label>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="off"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border-gray-300 bg-gray-100 text-gray-700 js-password w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-3">
              <label
                className="text-gray-700 mb-1 mt-6 block font-medium"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 right-0 flex items-center px-2">
                  <input
                    className="js-password-toggle hidden"
                    id="confirmPasswordToggle"
                    type="checkbox"
                    required
                    onChange={togglePasswordVisibility}
                  />
                  <label
                    className="bg-gray-300 hover-bg-gray-400 text-gray-600 js-password-label cursor-pointer rounded px-2 py-1 font-mono text-sm"
                    htmlFor="confirmPasswordToggle"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </label>
                </div>
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="off"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="border-gray-300 bg-gray-100 text-gray-700 js-password w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
                />
              </div>
            </div>
            {registrationError && <p className="mt-2 text-red">{registrationError}</p>}
            <button
              onClick={handleRegistration}
              className="focus:shadow-outline hover-bg-[rgb(2,48,32)] mb-5 mt-5 w-full rounded bg-[#2A9134] px-4 py-3 font-medium text-white focus:outline-none"
              type="button"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>

      {showRegisteredModal && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="bg-gray-500 absolute inset-0 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white p-4">
                <h1 className="mb-4 text-center text-2xl font-bold">Register Account</h1>
                <p className="text-center font-bold">
                  You have successfully registered your Account.
                </p>
                <br></br>
                <p className="text-center ">You can now go back to the login page.</p>
                <Link
                  href="../"
                  className="focus:shadow-outline hover-bg-[rgb(2,48,32)] mt-3 block w-full rounded bg-[#2A9134] px-4 py-3 text-center font-medium text-white focus:outline-none"
                >
                  Continue
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
