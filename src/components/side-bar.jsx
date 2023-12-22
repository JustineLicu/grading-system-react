import Image from 'next/image';
import Link from 'next/link';

export default function SideBarMenu() {
  const sidebarMenu = [
    {
      id: 1,
      name: 'Announcement',
      imageLink: '/announcement_icon.svg',
      urlLink: `/`,
      name: 'Grade Configuration',
      imageLink: '/configuration_icon.svg',
      urlLink: `/grades/config`,
    },
    {
      id: 2,
      name: 'Notification',
      imageLink: '/notification_icon.png',
      urlLink: `/notification`,
    },
    {
      id: 3,
      name: 'Student Information',
      imageLink: '/book-open-text.svg',
      urlLink: `/subject`,
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
          <Link
            href={item.urlLink}
            key={item.id}
            className={`mx-1  mt-2 flex h-12 w-12 items-center justify-center rounded-md  bg-yellow p-1 hover:bg-yellow
            `}
          >
            <Image src={item.imageLink} alt={item.name} width={20} height={20} />
          </Link>
        ))}
      </div>
    </>
  );
}
