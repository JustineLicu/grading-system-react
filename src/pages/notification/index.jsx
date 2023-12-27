import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import { useRouter } from 'next/router';

const host = 'http://localhost:8080'; // host

const NotificationMod = () => {
  const router = useRouter();

  useEffect(() => {
    // Fetch emails from API endpoint
    const fetchEmails = async () => {
      try {
        const response = await fetch(`${host}/emails`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched Emails:', data);

          const emailAnnouncements = Array.isArray(data)
            ? data.map((email) => ({ studentEmail: email.email }))
            : [];
          setAnnouncements(emailAnnouncements);
        } else {
          console.error('Failed to fetch emails');
          // Proper error handling (e.g., show an error toast)
          toast.error('Error fetching emails', { position: toast.POSITION.TOP_RIGHT });
        }
      } catch (error) {
        console.error('Error fetching emails:', error);
        // Proper error handling (e.g., show an error toast)
        toast.error('Error fetching emails', { position: toast.POSITION.TOP_RIGHT });
      }
    };

    fetchEmails();
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  // Dummy data for testing
  const initialAnnouncements = [
    {
      studentEmail: 'studentEmail.email', // Replace with the correct property
      notificationSubject: 'Laude',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae ex quis mi fermentum tincidunt.',
    },
    {
      studentEmail: 'johnbryan.vergara@cvsu.edu.ph',
      notificationSubject: 'SampleSubject',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae ex quis mi fermentum tincidunt.',
    },
  ];

  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [sendAllClicked, setSendAllClicked] = useState(false);

  const sendEmail = async (to, subject, text) => {
    const endpoint = `${host}/email`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, text }),
      });

      if (response.ok) {
        // Show success toaster
        toast.success('Email sent successfully', { position: toast.POSITION.TOP_RIGHT });
      } else {
        // Show error toaster
        toast.error('Failed to send email', { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      // Show error toaster
      toast.error('Error sending email', { position: toast.POSITION.TOP_RIGHT });
    }
  };

  const handleSendAll = async () => {
    setSendAllClicked(true);

    for (const announcement of announcements) {
      const { studentEmail, content } = announcement;
      const subject = 'Greetings from NotificationMod';
      const text = `Dear Student with Email ${studentEmail},\n\n${content}`;

      await sendEmail(studentEmail, subject, text);
    }

    // Show success toaster if all emails are sent successfully
    toast.success('All emails sent successfully', { position: toast.POSITION.TOP_RIGHT });
  };

  return (
    <>
      <NavBar />
      <main className="flex">
        <SideBarMenu />
        <div className="max-w-container mx-auto border-green p-4" style={{ width: '800px' }}>
          <div className="border border-green pb-2">
            <div className="flex items-center justify-center border border-green bg-green">
              <h2 className="mb-4 mr-1 text-2xl font-bold text-yellow ">Notification</h2>
            </div>
            {announcements.map(({ studentEmail, content }, index) => (
              <div key={index} className="mb-2">
                <div className="p-2 shadow-md">
                  {/* Announcement card for fetched data */}
                  <div className="mb-4 flex justify-between">
                    <div className="ml-4 rounded-md border border-green p-4">
                      <p>{content}</p>
                    </div>
                    <button
                      className="ml-3 rounded-full bg-green p-4 font-bold text-white"
                      onClick={() => sendEmail(studentEmail, 'Greetings', content)}
                      disabled={sendAllClicked}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {/* Display dummy data in the announcement card */}
            {initialAnnouncements.map(({ studentEmail, content }, index) => (
              <div key={index} className="mb-2">
                <div className="p-2 shadow-md">
                  {/* Announcement card for dummy data */}
                  <div className="mb-4 flex justify-between">
                    <div className="ml-4 rounded-md border border-green p-4">
                      <p>{content}</p>
                    </div>
                    <button
                      className="ml-3 rounded-full bg-green p-4 font-bold text-white"
                      onClick={() => sendEmail(studentEmail, 'Greetings', content)}
                      disabled={sendAllClicked}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="ml-4 self-end rounded-full bg-green px-4 py-2 font-bold text-yellow"
              onClick={handleSendAll}
            >
              Send All
            </button>
          </div>
        </div>
        {/* Toast container */}
        <ToastContainer />
      </main>
    </>
  );
};

export default NotificationMod;
