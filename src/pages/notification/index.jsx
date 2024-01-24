import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import { useEffect, useState } from 'react';

const host = 'http://localhost:8080';

const Toaster = ({ message, success }) => (
  <div
    style={{
      position: 'fixed',
      bottom: 10,
      right: 10,
      background: success ? 'rgba(0, 128, 0, 0.8)' : 'rgba(255, 0, 0, 0.8)',
      padding: 10,
      color: 'white',
      borderRadius: 8,
      display: 'block',
    }}
  >
    {message}
  </div>
);

const NotificationMod = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const [toasterVisible, setToasterVisible] = useState(false);
  const [toasterSuccess, setToasterSuccess] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const notificationsResponse = await fetch(`${host}/outbox`, {
        credentials: 'include',
      });

      if (notificationsResponse.ok) {
        const notificationsData = await notificationsResponse.json();
        if (Array.isArray(notificationsData)) {
          setNotifications(notificationsData);
        } else {
          setNotifications([]);
        }
      } else {
        showToast(`Error fetching outbox emails: ${notificationsResponse.statusText}`, false);
      }
    } catch (error) {
      showToast(`Error fetching outbox emails: ${error}`, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const sendEmail = async (outboxId) => {
    try {
      setLoading(true);

      const emailResponse = await fetch(`${host}/outbox/send/${outboxId}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (emailResponse.ok) {
        showToast('Email sent successfully!');
        fetchNotifications();
      } else {
        showToast('Failed to send email', false);
      }
    } catch (error) {
      showToast(`Error: ${error}`, false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSingle = (outboxId) => {
    setDeleteItemId(outboxId);
    setShowDeleteModal(true);
  };

  const confirmDeleteSingle = async () => {
    try {
      setLoading(true);

      const deleteResponse = await fetch(`${host}/outbox/${deleteItemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (deleteResponse.ok) {
        showToast('Notification deleted successfully!');
        fetchNotifications();
        setShowDeleteModal(false);
      } else {
        showToast('Failed to delete notification', false);
      }
    } catch (error) {
      showToast(`Error: ${error}`, false);
    } finally {
      setLoading(false);
    }
  };

  const deleteAllNotifications = async () => {
    try {
      setLoading(true);

      const deleteResponse = await fetch(`${host}/outbox`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (deleteResponse.ok) {
        showToast('All notifications deleted successfully!');
        fetchNotifications();
      } else {
        showToast('Failed to delete all notifications', false);
      }
    } catch (error) {
      showToast(`Error: ${error}`, false);
    } finally {
      setLoading(false);
    }
  };

  const sendAllEmails = async () => {
    try {
      setLoading(true);

      if (notifications.length === 0) {
        showToast('No outbox emails to send.', false);
        return;
      }

      for (const notification of notifications) {
        await sendEmail(notification.id);
      }

      showToast('All emails sent successfully!');
    } catch (error) {
      showToast(`Error: ${error}`, false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAll = async () => {
    setShowDeleteModal(false);
    await deleteAllNotifications();
  };

  const showToast = (message, success = true) => {
    setToasterMessage(message);
    setToasterSuccess(success);
    setToasterVisible(true);

    setTimeout(() => {
      setToasterVisible(false);
    }, 5000);
  };

  return (
    <>
      <NavBar />
      <main className="flex">
        <SideBarMenu />
        <div
          className="max-w-container mx-auto border-green p-4"
          style={{ width: '800px', padding: '20px' }}
        >
          <div className="border border-green pb-2">
            <div className="flex items-center justify-center border border-green bg-green p-4">
              <h2 className="text-2xl font-bold text-yellow">Notification</h2>
            </div>
            {loading ? (
              <div className="mt-2 flex justify-center">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="mb-2 p-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="mb-2 rounded-md border border-green p-2 shadow-md"
                  >
                    <div className="mb-2">
                      <p className="font-bold">Subject:</p>
                      <div className="bg-gray-100 rounded-md p-2">
                        <p>{notification.emailSubject}</p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="font-bold">Notification Message:</p>
                      <div className="bg-gray-100 rounded-md p-2">
                        <p>{notification.message}</p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="font-bold">Student Full Name:</p>
                      <div className="bg-gray-100 rounded-md p-2">
                        <p>
                          {`${notification.student.firstName} ${notification.student.middleName} ${notification.student.lastName}`}
                        </p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="font-bold">Course:</p>
                      <div className="bg-gray-100 rounded-md p-2">
                        <p>{notification.student.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-bold">Student ID: {notification.studentId}</p>
                      <div className="flex space-x-2">
                        <button
                          className="rounded-full bg-green p-2 font-bold text-white"
                          onClick={() => sendEmail(notification.id)}
                        >
                          Send Email
                        </button>
                        <button
                          className="bg-red-500 rounded-full p-2 font-bold text-black"
                          onClick={() => handleDeleteSingle(notification.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <button
                className="ml-2 self-end rounded-full bg-green px-2 py-1 font-bold text-yellow"
                onClick={sendAllEmails}
              >
                Send All
              </button>
              <button
                className="ml-2 self-end rounded-full bg-green px-2 py-1 font-bold text-white"
                onClick={handleDeleteAll}
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="bg-gray-500 absolute inset-0 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            <div
              className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="bg-red-100 mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="text-red-600 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-gray-900 text-lg font-medium leading-6" id="modal-headline">
                      Delete Confirmation
                    </h3>
                    <div className="mt-2">
                      <p className="text-gray-500 text-sm">
                        Are you sure you want to delete{' '}
                        {deleteItemId ? 'this notification' : 'all notifications'}? This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={deleteItemId ? confirmDeleteSingle : confirmDeleteAll}
                  type="button"
                  className="bg-red-600 hover:bg-red-700 focus:ring-red-500 inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-red shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  type="button"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 mt-3 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster message={toasterMessage} success={toasterSuccess} />
    </>
  );
};

export default NotificationMod;
