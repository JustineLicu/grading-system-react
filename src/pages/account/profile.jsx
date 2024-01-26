import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const host = 'http://localhost:8080';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [updatedProfileData, setUpdatedProfileData] = useState({
    firstName: userData?.firstName || '',
    middleName: userData?.middleName || '',
    lastName: userData?.lastName || '',
    nameSuffix: userData?.nameSuffix || '',
    email: userData?.email || '',
    username: userData?.username || '',
    contactNumber: userData?.contactNumber || '',
    department: userData?.department || '',
    idNumber: userData?.idNumber || '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const fetchUserData = async () => {
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
        setUserData(user);
      } else {
        handleError(response);
      }
    } catch (error) {
      console.error('Error fetching current user:', error.message);
    }
  };
  const validateRequiredField = (value, fieldName) => {
    if (!value) {
      window.alert(`${fieldName} is required.`);
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.alert('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const validateUsernameLength = (username) => {
    if (!username || username.length < 8) {
      window.alert('Username should be at least 8 characters long.');
      return false;
    }
    return true;
  };

  const validateContactNumberLength = (contactNumber) => {
    const contactNumberRegex = /^\d{10}$/;
    if (!contactNumber || !contactNumberRegex.test(contactNumber)) {
      window.alert('Contact number should be 10 digits long.');
      return false;
    }
    return true;
  };

  const handleUpdateProfile = async () => {
    // Simple validations
    if (
      !validateRequiredField(updatedProfileData.firstName, 'First Name') ||
      !validateRequiredField(updatedProfileData.lastName, 'Last Name') ||
      !validateRequiredField(updatedProfileData.email, 'Email') ||
      !validateEmail(updatedProfileData.email) || // Use the email validation
      !validateRequiredField(updatedProfileData.username, 'Username') ||
      !validateUsernameLength(updatedProfileData.username) || // Use the username length validation
      !validateRequiredField(updatedProfileData.contactNumber, 'Contact Number') ||
      !validateContactNumberLength(updatedProfileData.contactNumber) // Use the contact number length validation
    ) {
      return;
    }

    try {
      const response = await fetch(`${host}/auth/user`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfileData),
      });

      if (response.ok) {
        // Update the user data after a successful update
        fetchUserData();
        // Close the modal
        setUpdateProfileModalOpen(false);
      } else {
        handleError(response);
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  const handleError = (response) => {
    if (response.status === 401) {
      // Redirect to login page or handle unauthorized access
    } else {
      console.error(`Request failed. Status: ${response.status}`);
    }
  };
  const handleChangePassword = async () => {
    try {
      // Simple validation
      if (newPassword !== confirmPassword) {
        setPasswordError("Passwords don't match");
        return;
      }

      // Clear password error if previous error exists
      setPasswordError('');

      const response = await fetch(`${host}/auth/user/password`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword, // Correct key: 'password' instead of 'newPassword'
        }),
      });

      if (response.ok) {
        alert('Password Changed');
        console.error('Password Changed');
        setChangePasswordModalOpen(false);
      } else {
        handleError(response);
      }
    } catch (error) {
      console.error('Error changing password:', error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      {/* HEADER */}
      <Head>
        <title>Profile</title>
      </Head>

      {/* NAVIGATION BAR COMPONENT */}
      <NavBar />

      {/* MAIN COMPONENT */}
      <main className="flex">
        {/* SIDE BAR COMPONENT */}
        <SideBarMenu />
        <div className="flex">
          <div className="content p-5 text-xl">
            Hello Professor, <span className="text-gray-500">{userData?.lastName}</span>
            <div className="account-details mt-4">
              <div className="label">My Profile</div>
              <form className="mt-5 flex flex-col gap-5">
                {/* Display user information */}
                {userData && (
                  <>
                    {/* Add more fields based on your user data structure */}
                    <div className="flex gap-5">
                      <div className="flex-grow">
                        <label className="block">
                          <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                            Surname
                          </span>
                          <input
                            type="text"
                            name=""
                            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                            placeholder="Enter surname"
                            value={userData?.lastName}
                            disabled
                          />
                        </label>
                      </div>
                      <div className="flex-grow">
                        <label className="block">
                          <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                            First Name
                          </span>
                          <input
                            type="text"
                            name=""
                            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                            placeholder="Enter firstname"
                            value={userData?.firstName}
                            disabled
                          />
                        </label>
                      </div>
                      <div className="flex-grow">
                        <label className="block">
                          <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                            Middle Name
                          </span>
                          <input
                            type="text"
                            name=""
                            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                            placeholder="Enter middlename"
                            value={userData?.middleName}
                            disabled
                          />
                        </label>
                      </div>
                      <div className="flex-grow">
                        <label className="block">
                          <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                            Suffix
                          </span>
                          <input
                            type="text"
                            name=""
                            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                            placeholder="Enter suffix"
                            value={userData?.nameSuffix}
                            disabled
                          />
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {/* Add the rest of your form fields here (Username, Email, ID Number, Department, Contact Number) */}
                {/* Ensure to replace placeholder values with actual field names from your user data */}
                <div className="flex gap-5">
                  <div className="flex-grow">
                    <label className="block">
                      <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Username
                      </span>
                      <input
                        type="text"
                        name=""
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter username"
                        value={userData?.username}
                        disabled
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label className="block">
                      <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Email Address
                      </span>
                      <input
                        type="text"
                        name=""
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="you@example.com"
                        value={userData?.email}
                        disabled
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label className="block">
                      <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        ID Number
                      </span>
                      <input
                        type="number"
                        name=""
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter ID"
                        value={userData?.idNumber}
                        disabled
                      />
                    </label>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-grow">
                    <label className="block">
                      <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Department
                      </span>
                      <input
                        type="text"
                        name=""
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter department"
                        value={userData?.department}
                        disabled
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label className="block">
                      <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Contact Number
                      </span>
                      <input
                        type="number"
                        name=""
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter number"
                        value={userData?.contactNumber}
                        disabled
                      />
                    </label>
                  </div>
                </div>
                <div className="button flex justify-end gap-3">
                  <button
                    type="button"
                    className="border p-2 text-xs"
                    onClick={() => setUpdateProfileModalOpen(true)}
                  >
                    Update Profile
                  </button>
                  <button
                    type="button"
                    className="border p-2 text-xs"
                    onClick={() => setChangePasswordModalOpen(true)}
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
            {/* Update Profile Modal */}
            {updateProfileModalOpen && (
              <div className=" modal fixed inset-0 mt-10 flex items-center justify-center bg-black bg-opacity-50">
                <div className="modal-content rounded-md bg-white p-8 shadow-md">
                  <h2 className="mb-4 text-2xl font-bold">Update Profile</h2>
                  <form className="mb-2 flex max-h-80 flex-col gap-3 overflow-y-auto p-3">
                    <label className="field">
                      First Name:
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-black border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        value={updatedProfileData.firstName}
                        onChange={(e) =>
                          setUpdatedProfileData({
                            ...updatedProfileData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="field">
                      Middle Name:
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-black border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        value={updatedProfileData.middleName}
                        onChange={(e) =>
                          setUpdatedProfileData({
                            ...updatedProfileData,
                            middleName: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="field">
                      Last Name:
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-black border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        value={updatedProfileData.lastName}
                        onChange={(e) =>
                          setUpdatedProfileData({
                            ...updatedProfileData,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="field">
                      Name Suffix:
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-black border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        value={updatedProfileData.nameSuffix}
                        onChange={(e) =>
                          setUpdatedProfileData({
                            ...updatedProfileData,
                            nameSuffix: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="field">
                      Email:
                      <input
                        type="email"
                        className="mt-1 block w-full rounded-md border border-black border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        value={updatedProfileData.email}
                        onChange={(e) =>
                          setUpdatedProfileData({
                            ...updatedProfileData,
                            email: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="field">
                      Username:
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-black border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        value={updatedProfileData.username}
                        onChange={(e) =>
                          setUpdatedProfileData({
                            ...updatedProfileData,
                            username: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="field">
                      Contact Number:
                      <input
                        type="number"
                        className="mt-1 block w-full rounded-md border border-black border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        value={updatedProfileData.contactNumber}
                        onChange={(e) =>
                          setUpdatedProfileData({
                            ...updatedProfileData,
                            contactNumber: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="field">
                      Department:
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-black border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        value={updatedProfileData.department}
                        onChange={(e) =>
                          setUpdatedProfileData({
                            ...updatedProfileData,
                            department: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="field">
                      ID Number:
                      <input
                        type="number"
                        className="mt-1 block w-full rounded-md border border-black border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter ID"
                        value={updatedProfileData.idNumber}
                        onChange={(e) =>
                          setUpdatedProfileData({
                            ...updatedProfileData,
                            idNumber: e.target.value,
                          })
                        }
                      />
                    </label>
                  </form>
                  <div className="mt-4 flex justify-end">
                    <button
                      className="rounded-md bg-yellow px-4 py-2 text-white"
                      onClick={handleUpdateProfile}
                    >
                      Save Changes
                    </button>
                    <button
                      className="bg-gray-300 text-gray-800 ml-2 rounded-md px-4 py-2"
                      onClick={() => setUpdateProfileModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Change Password Modal */}
            {changePasswordModalOpen && (
              <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-3">
                <div className="modal-content rounded-md bg-white p-8 shadow-md">
                  <h2 className="mb-4 text-2xl font-bold">Change Password</h2>
                  <form className="flex flex-col gap-3">
                    <label className="field">
                      New Password:
                      <input
                        type="password"
                        className="mt-1 block w-full rounded-md border border-black border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </label>
                    <label className="field">
                      Confirm Password:
                      <input
                        type="password"
                        className="mt-1 block w-full rounded-md border border-black border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </label>
                    {passwordError && <p className="text-red-500">{passwordError}</p>}
                  </form>
                  <div className="mt-4 flex justify-end">
                    <button
                      className="rounded-md bg-yellow px-4 py-2 text-white"
                      onClick={handleChangePassword}
                    >
                      Save Changes
                    </button>
                    <button
                      className="bg-gray-300 text-gray-800 ml-2 rounded-md px-4 py-2"
                      onClick={() => setChangePasswordModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
