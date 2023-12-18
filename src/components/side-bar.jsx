<<<<<<< HEAD
=======
import Image from 'next/image';
>>>>>>> 5c44ed4deaaf778d1abe4cb7999fb2b6751f48f9
import Link from 'next/link';

export default function SideBarMenu() {
  const sidebarMenu = [
<<<<<<< HEAD
    { id: 1, name: 'Home', imageLink: '/home_icon.svg', urlLink: `/` },
    {
      id: 2,
      name: 'Organizations',
=======
    { id: 1, name: '', imageLink: '/home_icon.svg', urlLink: `/` },
    {
      id: 2,
      name: '',
>>>>>>> 5c44ed4deaaf778d1abe4cb7999fb2b6751f48f9
      imageLink: '/organizations_icon.svg',
      urlLink: `/`,
    },
    {
      id: 3,
<<<<<<< HEAD
      name: 'Announcement',
      imageLink: '/announcement_icon.svg',
      urlLink: `/`,
=======
      name: 'Grade Configuration',
      imageLink: '/configuration_icon.svg',
      urlLink: `/grades/config`,
    },
    {
      id: 4,
      name: 'Notification',
      imageLink: '/notification_icon.png',
      urlLink: `/notification`,
>>>>>>> 5c44ed4deaaf778d1abe4cb7999fb2b6751f48f9
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
            className={`group relative mt-1 flex h-10 w-10 items-center justify-center rounded-md bg-yellow p-1 hover:bg-yellow md:mx-1  lg:mt-2 lg:h-12 lg:w-12
            `}
<<<<<<< HEAD
          ></Link>
=======
          >
            <Image src={item.imageLink} alt={item.name} width={20} height={20} />
          </Link>
>>>>>>> 5c44ed4deaaf778d1abe4cb7999fb2b6751f48f9
        ))}
      </div>
    </>
  );
}
