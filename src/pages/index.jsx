import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      {/* HEADER */}
      <Head>
        <title>Index Page</title>
      </Head> 

      {/* NAVIGATION BAR COMPONENT */}
      <NavBar />

      {/* MAIN COMPONENT */}
      <main className="flex">
        {/* SIDE BAR COMPONENT */}
        <SideBarMenu />

        <h1 className=" p-4 text-center text-3xl">Hello from HomePage!</h1>
      </main>
    </>
  );
}
