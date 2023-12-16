import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function SideBarMenu() {
  const sidebarMenu = [
    { id: 1, name: '', imageLink: '/home_icon.svg', urlLink: `/` },
    {
      id: 2,
      name: '',
      imageLink: '/organizations_icon.svg',
      urlLink: `/`,
    },
    {
      id: 3,
      name: 'Grade Configuration',
      imageLink: '/configuration_icon.svg',
      urlLink: `/grades/config`,
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
          >
            <Image src={item.imageLink} alt={item.name} width={20} height={20} />
          </Link>
        ))}
      </div>
    </>
  );
}
