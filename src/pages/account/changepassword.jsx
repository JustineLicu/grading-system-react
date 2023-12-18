import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';

export default function changepassword() {
  return (
    <>
      {/* HEADER */}
      <Head>
        <title>Change Password</title>
      </Head>

      {/* NAVIGATION BAR COMPONENT */}
      <NavBar />

      {/* MAIN COMPONENT */}
      <main className="flex">
        {/* SIDE BAR COMPONENT */}
        <SideBarMenu />

        <div className="flex w-full flex-col items-center bg-gray">
          <div className="flex w-full bg-green p-4">
            <h3 className="font-serif">Hello Admin: Juan</h3>
          </div>

          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex h-min w-96 flex-col border-solid bg-white shadow-lg">
              <div className="flex justify-center bg-green p-3">
                <h2 className="font-serif text-white">Change Password:</h2>
              </div>
              <div className="h-100 flex flex-col justify-center p-2">
                <div className="my-2 flex flex-col items-center">
                  <label className="font-serif">Current Password:</label>
                  <input
                    type="password"
                    className="w-60 rounded-sm border-2 border-solid border-green p-1"
                  ></input>
                </div>
                <div className="my-2 flex flex-col items-center">
                  <label className="font-serif">New Password:</label>
                  <input
                    type="password"
                    className="w-60 rounded-sm border-2 border-solid border-green p-1"
                  ></input>
                </div>
                <div className="my-2 flex flex-col items-center">
                  <label className="font-serif">Confirm Password:</label>
                  <input
                    type="password"
                    className="w-60 rounded-sm border-2 border-solid border-green p-1"
                  ></input>
                </div>

                <div className="mt-3 flex flex-col items-center py-2">
                  <p className="font-serif">Password must have at least 8 Characters</p>
                  <button className="mt-1 w-32 rounded-sm bg-green p-1 font-serif text-white">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
