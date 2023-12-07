import Link from 'next/link';

export default function SideBarMenu() {
  const sidebarMenu = [
    { id: 1, name: 'Home', imageLink: '/home_icon.svg', urlLink: `/` },
    {
      id: 2,
      name: 'Organizations',
      imageLink: '/organizations_icon.svg',
      urlLink: `/`,
    },
    {
      id: 3,
      name: 'Announcement',
      imageLink: '/announcement_icon.svg',
      urlLink: `/`,
    },
  ];
  return (
    <>
      <div
        id="side-bar"
        className={`sticky top-20 z-[100] my-2 ml-1 h-[90vh] flex-col items-center bg-green px-1 md:sticky md:my-3 md:ml-2  md:h-[87vh] lg:ml-3`}
      >
        {/* SIDE BAR LINKS */}
        {sidebarMenu.map((item) => (
          <Link
            href={item.urlLink}
            key={item.id}
            className={`group relative mt-1 flex h-10 w-10 items-center justify-center rounded-md bg-yellow p-1 hover:bg-yellow md:mx-1  lg:mt-2 lg:h-12 lg:w-12
            `}
          ></Link>
        ))}
      </div>
    </>
  );
}
