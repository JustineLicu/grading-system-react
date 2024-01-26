import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const host = 'http://localhost:8080';

export default function SideBarMenu() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch current user on component mount
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(`${host}/auth/user`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
      } else {
        // Handle error fetching current user
        console.error('Error fetching current user:', response.statusText);
        setCurrentUser(null);
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      setCurrentUser(null);
      router.push('/');
    }
  };

  const handleLogout = async () => {
    // Start loading
    setLoading(true);

    // Perform the logout action using the provided endpoint
    try {
      const response = await fetch(`${host}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok || response.status === 302) {
        // Handle successful logout
        console.log('Logout successful');

        // Close the modal
        setShowLogoutModal(false);

        // Redirect to the specified href after successful logout
        router.push('/');
      } else if (response.status === 401) {
        // Handle unauthorized (401) - user not logged in
        console.warn('User is not logged in');
        setShowLogoutModal(false);
        router.push('/');
      } else {
        // Handle logout failure
        console.error('Logout failed');
        const responseData = await response.json();
        console.error('Server response:', responseData);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };
  const sidebarMenu = [
    {
      id: 1,
      name: 'My Profile',
      imageLink: '/account.svg',
      urlLink: `/account/profile`,
    },
    {
      id: 2,
      name: 'Student Information',
      imageLink: '/book-open-text.svg',
      urlLink: `/subject`,
    },
    {
      id: 3,
      name: 'Announcement',
      imageLink: '/announcement_icon.svg',
      urlLink: `/`,
      name: 'Grade Configuration',
      imageLink: '/configuration_icon.svg',
      urlLink: `/grades/config`,
    },
    {
      id: 4,
      name: 'Notification',
      imageLink: '/notification.svg',
      urlLink: `/notification`,
    },
    {
      id: 5,
      name: 'Admin Profile',
      imageLink: '/create.png',
      urlLink: `/generation/students`,
    },
    {
      id: 6,
      name: 'Admin Profile',
      imageLink: '/logout.png',
      onClick: () => setShowLogoutModal(true),
    },
  ];
  return (
    <>
      <div
        id="side-bar"
        className={`sticky top-[10vh] z-[100] h-[90vh] flex-col items-center bg-green px-1`}
      >
        {/* SIDE BAR LINKS */}
        {sidebarMenu.map((item) => (
          <div
            key={item.id}
            className={`mx-1  mt-2 flex h-12 w-12 cursor-pointer items-center justify-center  rounded-md bg-yellow p-1 hover:bg-yellow`}
            onClick={item.urlLink ? () => router.push(item.urlLink) : item.onClick}
          >
            <Image src={item.imageLink} alt={item.name} width={20} height={20} />
          </div>
        ))}
      </div>
      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
          <div className="rounded-md bg-white p-6 shadow-lg">
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 mr-2 rounded-md px-4 py-2 text-black"
                onClick={() => setShowLogoutModal(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className={`bg-red-500 rounded-md px-4 py-2 text-red ${
                  loading ? 'cursor-not-allowed opacity-50' : ''
                }`}
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
