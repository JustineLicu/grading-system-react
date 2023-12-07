import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  return (
    <>
      <nav className="sticky top-0 z-[999] flex min-h-[10vh] items-center bg-green shadow-lg">
        <div
          id="nav-container"
          className="flex w-full items-center justify-between py-1 md:px-7 md:py-2"
        >
          <div id="titles" className="flex items-center gap-5">
            <Link href={`/`}>
              <div id="logo" className="h-10 w-10 rounded-full bg-gray  md:h-12 md:w-12" />
            </Link>
            <div className="leading-3 text-white">
              <div
                id="title"
                className="ms-2 text-lg font-medium sm:text-xl md:text-2xl lg:text-3xl"
              >
                Account Management
              </div>
            </div>
          </div>
          <Image
            src="/notification_icon.svg"
            className="h-10 text-black md:h-12"
            alt="Notification Bell"
            height={100}
            width={100}
          />
        </div>
      </nav>
    </>
  );
}
