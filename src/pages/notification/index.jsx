import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import { useEffect, useState } from 'react';

const host = 'http://localhost:8080';
//Last task : Put dynamic user id
const NotificationMod = ({ userId = 1 }) => {
  const [notifications, setNotifications] = useState([]);
  const [toasterMessage, setToasterMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [toasterVisible, setToasterVisible] = useState(false);
  const [toasterSuccess, setToasterSuccess] = useState(true);

  // Function 1: Fetch notifications from the endpoint
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      // Fetch all notifications
      const notificationsResponse = await fetch(`${host}/users/${userId}/notifications`);
      const notificationsData = await notificationsResponse.json();

      // Ensure that notificationsData is an array
      if (Array.isArray(notificationsData)) {
        setNotifications(notificationsData);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      showToast(`Error fetching notifications: ${error}`, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch notifications when the component mounts and when userId changes
    fetchNotifications();
  }, [userId]);

  // Function 2: Send email. Fetch info from notification endpoint, then use the email endpoint API to send info.
  const sendEmail = async (notificationId) => {
    try {
      setLoading(true);

      // Fetch notification information
      const notificationResponse = await fetch(
        `${host}/users/${userId}/notifications/${notificationId}`
      );
      const notificationData = await notificationResponse.json();

      // Prepare email data
      const emailData = {
        to: notificationData.email,
        subject: notificationData.subjectCode,
        text: notificationData.message,
      };

      // Send email
      const emailResponse = await fetch(`${host}/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (emailResponse.ok) {
        // Delete the notification after sending the email
        await fetch(`${host}/users/${userId}/notifications/${notificationId}`, {
          method: 'DELETE',
        });

        showToast('Email sent successfully, and notification deleted!');
        // Auto-refresh after deletion
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

  // Function 3: Send all. Just send every email
  const sendAllEmails = async () => {
    try {
      setLoading(true);

      // Check if there are notifications
      if (notifications.length === 0) {
        showToast('No notifications to send.', false);
        return;
      }

      // Iterate through notifications and send emails
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

  // Function 4: Toaster. If email is sent, when an error occurs, when send all is clicked without fetched notif, it will give a message saying there's no notification.
  const Toaster = ({ message, success }) => {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          background: success ? 'rgba(0, 128, 0, 0.8)' : 'rgba(255, 0, 0, 0.8)',
          padding: 10,
          color: 'white',
          borderRadius: 8,
          display: toasterVisible ? 'block' : 'none',
        }}
      >
        {message}
      </div>
    );
  };

  const showToast = (message, success = true) => {
    setToasterMessage(message);
    setToasterSuccess(success);
    setToasterVisible(true);

    setTimeout(() => {
      setToasterVisible(false);
    }, 5000); // Adjust the time (in milliseconds) the toaster stays visible
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
              // Display notifications as cards
              <div className="mb-2 p-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="mb-2 rounded-md border border-green p-2 shadow-md"
                  >
                    <div className="mb-2">
                      <p className="font-bold">Message:</p>
                      <div className="bg-gray-100 rounded-md p-2">
                        <p>{notification.message}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">Student Name: {notification.fullName}</p>
                      <button
                        className="rounded-full bg-green p-2 font-bold text-white"
                        onClick={() => sendEmail(notification.id)}
                      >
                        Send Email
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              className="ml-2 self-end rounded-full bg-green px-2 py-1 font-bold text-yellow"
              onClick={sendAllEmails}
            >
              Send All
            </button>
          </div>
        </div>
      </main>
      <Toaster message={toasterMessage} success={toasterSuccess} />
    </>
  );
};

export default NotificationMod;
