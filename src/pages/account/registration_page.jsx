import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function registration_page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisteredModal, setShowRegisteredModal] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRegisteredModal = () => {
    setShowRegisteredModal(!showRegisteredModal);
  };

  return (
    <>
      {/* HEADER */}
      <Head>
        <title>Registration Page</title>
      </Head>

      <div className="flex h-screen items-center justify-center  bg-gray">
        <div className="shadow-1g w-96 bg-white ">
          <div className="font-serif">
            <h1 className="font-rubik flex justify-center gap-3 bg-[#2A9134] p-5 text-center font-sans text-2xl font-bold text-white ">
              <div className="logo">logo</div>
              REGISTER ACCOUNT
            </h1>
          </div>
          <form className=" p-6">
            <div className="mt-3">
              <label className="text-gray-700 mb-1 mt-1 block font-medium" htmlFor="idNumber">
                ID Number
              </label>
              <input
                className="border-gray-300 bg-gray-100 text-gray-700 w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
                id="idNumber"
                type="text"
                autoComplete="off"
                autoFocus
                required
              />
            </div>
            <div className="mt-3">
              <label className="text-gray-700 mb-1 mt-1 block font-medium" htmlFor="email">
                Email
              </label>
              <input
                className="border-gray-300 bg-gray-100 text-gray-700 w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
                id="email"
                type="text"
                autoComplete="off"
                autoFocus
                required
              />
            </div>
            <div className="mt-3">
              <label className="text-gray-700 mb-1 mt-1 block font-medium" htmlFor="username">
                Username
              </label>
              <input
                className="border-gray-300 bg-gray-100 text-gray-700 w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
                id="username"
                type="text"
                autoComplete="off"
                autoFocus
                required
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
                  className="border-gray-300 bg-gray-100 text-gray-700 js-password w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="text-gray-700 mb-1 mt-6 block font-medium" htmlFor="password">
                Confirm Password
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
                  className="border-gray-300 bg-gray-100 text-gray-700 js-password w-full appearance-none rounded border-2 px-3 py-3 pr-16 font-mono leading-tight focus:border-[#2A9134] focus:bg-white focus:outline-none"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="off"
                />
              </div>
            </div>
            <button
              onClick={toggleRegisteredModal}
              className="focus:shadow-outline mb-5 mt-5 w-full rounded bg-[#2A9134] px-4 py-3 font-medium text-white hover:bg-[rgb(2,48,32)] focus:outline-none"
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
            {/* Background overlay */}
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="bg-gray-500 absolute inset-0 opacity-75"></div>
            </div>

            {/* Modal */}
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              {/* Modal Content */}
              <div className="bg-white p-4">
                <h1 className="mb-4 text-center text-2xl font-bold">Register Account</h1>

                <p className="text-center font-bold">
                  You have successfully registered your Account.
                </p>
                <br></br>
                <p className="text-center ">You can now go back to the log in page.</p>

                <Link
                  href="/account/login_page"
                  className="focus:shadow-outline mt-3 block w-full rounded bg-[#2A9134] px-4 py-3 text-center font-medium text-white hover:bg-[rgb(2,48,32)] focus:outline-none"
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
