import Logo from 'img/logo.png';
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
              <div id="logo" className="h-10 w-10  bg-gray md:h-12 md:w-12">
                <img src={Logo} alt="logo" className="h-full w-full object-cover" />
              </div>
            </Link>
            <div className="leading-3 text-white">
              <div
                id="title"
                className="ms-2 text-lg font-medium sm:text-xl md:text-2xl lg:text-3xl"
              >
                Grading System
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
