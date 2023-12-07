import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import { useRouter } from 'next/router';

const getAnnouncements = () => [
  {
    id: '1',
    content: 'Student Jesusa Claridad is currently failing the subject ITEC-111 with a GWA of 1.25',
  },
  {
    id: '2',
    content:
      'Student Romeo Cobreta is a candidate for honors the subject ITEC 111 with a GWA of 1.00',
  },
];

export default function NotificationMod() {
  const router = useRouter();
  const { id } = router.query;

  const announcements = getAnnouncements();

  // If an id is provided, filter announcements based on the id
  const filteredAnnouncements = id
    ? announcements.filter((announcement) => announcement.id === id)
    : announcements;

  return (
    <>
      <NavBar />
      <main className="flex">
        <SideBarMenu />
        <div className="max-w-container mx-auto border-green p-4">
          <div className="border border-green pb-2">
            <div className="flex items-center justify-center border border-green bg-green">
              <h2 className="mb-4 mr-1 text-2xl font-bold text-yellow ">Notification</h2>
            </div>
            {filteredAnnouncements.map((announcement) => (
              <div key={announcement.id} className="mb-2">
                <div className="p-2 shadow-md">
                  {/* Announcement card */}
                  <div className="mb-4 flex justify-between">
                    <div className="ml-4 rounded-md border border-green p-4">
                      <p>{announcement.content}</p>
                    </div>
                    <button className="ml-3 rounded-full bg-green p-4 font-bold text-white">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button className="ml-4 self-end rounded-full bg-green px-4 py-2 font-bold text-yellow">
              Send All
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
