import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const host = 'http://localhost:8080';

const LoginPage = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showResetConfirmationModal, setShowResetConfirmationModal] = useState(false);
  const [userData, setUserData] = useState(null); // Add state for user data

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForgotPasswordModal = () => {
    setShowForgotPasswordModal(!showForgotPasswordModal);
  };

  const toggleResetConfirmationModal = () => {
    setShowResetConfirmationModal(!showResetConfirmationModal);
  };

  const handleChange = (e) => {
    setCredentials((prevCredentials) => ({ ...prevCredentials, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      alert('Username and password are required.');
      return;
    }

    try {
      const response = await fetch(`${host}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(credentials).toString(),
      });

      if (response.ok) {
        console.log('Login successful');
        getCurrentUser();
        router.push('/account/profile'); // Redirect to the profile page
      } else {
        const responseData = await response.json();
        handleError(responseData, response.status);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await fetch(`${host}/auth/user`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUserData(user); // Update the user data state
      } else {
        handleError(response);
      }
    } catch (error) {
      console.error('Error fetching current user:', error.message);
    }
  };

  const handleError = (response) => {
    if (response.status === 401) {
      alert('Authentication failed: Invalid credentials');
    } else {
      alert(`Request failed. Status: ${response.status}`);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>

      <div className="flex h-screen items-center justify-center bg-gray">
        <div className="w-96 bg-white shadow-lg">
          <div className="font-serif">
            <h1 className="font-rubik flex justify-center gap-3 bg-[#2A9134] p-5 text-center font-sans text-2xl font-bold text-white ">
              <div id="logo" className="h-10 w-10 md:h-12 md:w-12">
                <img src="/CvSULogo.png" alt="logo" className="h-full w-full object-cover" />
              </div>
              WELCOME TO PORTAL
            </h1>
          </div>
          <form className="p-6">
            <div className="mt-3">
              <label className="text-gray-700 mb-1 mt-1 block font-medium" htmlFor="username">
                Username
              </label>
              <input
                className="border-gray-300 bg-gray-100 text-gray-700 w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
                id="username"
                type="text"
                name="username"
                autoComplete="off"
                autoFocus
                onChange={handleChange}
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
                  className="border-gray-300 bg-gray-100 text-gray-700 js-password w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="off"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <Link
              href="#"
              onClick={toggleForgotPasswordModal}
              className="flex justify-center underline"
            >
              Forgot Password?
            </Link>
            <button
              onClick={async () => await handleLogin()}
              className="focus:shadow-outline mt-3 w-full rounded bg-[#2A9134] px-4 py-3 font-medium text-white hover:bg-[#023020] focus:outline-none"
              type="button"
            >
              SIGN IN
            </button>
            <label className="text-gray-700 mb-1 mt-1 flex justify-center font-medium">
              - or -
            </label>
            <Link
              href="/account/registration_page"
              className="focus:shadow-outline mt-3 block w-full rounded bg-[#2A9134] px-4 py-3 text-center font-medium text-white hover:bg-[rgb(2,48,32)] focus:outline-none"
            >
              SIGN UP
            </Link>
            {/* Reset Confirmation Modal */}
            {showResetConfirmationModal && (
              <div className="fixed inset-0 overflow-y-auto">
                {/* Reset Confirmation Modal JSX */}
                <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                  {/* Background overlay */}
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="bg-gray-500 absolute inset-0 opacity-75"></div>
                  </div>

                  {/* Modal */}
                  <span
                    className="hidden sm:inline-block sm:h-screen sm:align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                    {/* Modal Content */}
                    <div className="bg-white p-4">
                      <h1 className="mb-4 text-center text-2xl font-bold">Forgot Password</h1>

                      <p className="text-center font-bold">
                        A mail has been sent to your E-Mail account.
                      </p>
                      <br></br>
                      <p className="text-center ">
                        Please follow the instructions from the mail and go back to the portal's
                        login page. Thank you!
                      </p>

                      <button
                        onClick={handleResetConfirmation}
                        className="mt-3 w-full rounded bg-[#2A9134] px-4 py-3 font-medium text-white hover:bg-[#023020] focus:outline-none"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Forgot Password Modal */}
            {showForgotPasswordModal && (
              <div className="fixed inset-0 overflow-y-auto">
                {/* Forgot Password Modal JSX */}
                <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                  {/* Background overlay */}
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="bg-gray-500 absolute inset-0 opacity-75"></div>
                  </div>

                  {/* Modal */}
                  <span
                    className="hidden sm:inline-block sm:h-screen sm:align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                    {/* Modal Content */}
                    <div className="bg-white p-4">
                      <h1 className="mb-4 text-center text-2xl font-bold">Forgot Password</h1>
                      {/* Add your forgot password form or instructions here */}
                      <p>Enter your email to reset your password.</p>
                      {/* Example: */}
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="border-gray-300 bg-gray-100 text-gray-700 w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
                      />
                      <button
                        onClick={toggleResetConfirmationModal}
                        className="mt-3 w-full rounded bg-[#2A9134] px-4 py-3 font-medium text-white hover:bg-[#023020] focus:outline-none"
                      >
                        Continue
                      </button>
                      <button
                        onClick={toggleForgotPasswordModal}
                        className="bg-gray-300 text-gray-700 hover:bg-gray-400 mt-3 w-full rounded px-4 py-3 font-medium focus:outline-none"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
