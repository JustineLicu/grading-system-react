import Link from 'next/link';

export default function NavBar() {
  return (
    <>
      <nav className="sticky top-0 z-[999] flex max-h-[12vh] min-h-[4vh] items-center bg-green">
        <div
          id="nav-container"
          className="flex w-full items-center justify-between py-1 md:px-7 md:py-2"
        >
          <div id="titles" className="flex px-1">
            <Link href={`/`}>
              <div id="logo" className="h-10 w-10 rounded-full bg-gray  md:h-12 md:w-12" />
            </Link>
            <div className="mt-[-5px] leading-3 text-white">
              <div id="title" className="ms-2 text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Office of Student Development Services
              </div>
              <div id="sub-title" className="ms-14">
                Scheduling System For Reporting and File Management
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
