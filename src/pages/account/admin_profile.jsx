import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
function admin_profile() {
  return (
    <>
      {/* HEADER */}
      <Head>
        <title>Admin Profile</title>
      </Head>

      {/* NAVIGATION BAR COMPONENT */}
      <NavBar />

      {/* MAIN COMPONENT */}
      <main className="flex">
        {/* SIDE BAR COMPONENT */}
        <SideBarMenu />
        <div className="container">
          <div className="content p-5 text-xl">
            Hello Admin, <span className="text-gray-500">Maria Delo Santos!</span>
            <div className="account-details mt-4">
              <div className="label">My Profile</div>
              <form className="mt-5 flex flex-col gap-5">
                <div className="flex gap-5">
                  <div className="flex-grow">
                    <label className="block">
                      <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Surname
                      </span>
                      <input
                        type="text"
                        name=""
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter surname"
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label className="block">
                      <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        First Name
                      </span>
                      <input
                        type="text"
                        name=""
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter firstname"
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label className="block">
                      <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Middle Name
                      </span>
                      <input
                        type="text"
                        name=""
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter middlename"
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label className="block">
                      <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Suffix
                      </span>
                      <input
                        type="text"
                        name=""
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter suffix"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-grow">
                    <label className="block">
                      <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Username
                      </span>
                      <input
                        type="text"
                        name=""
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter username"
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label className="block">
                      <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Email Address
                      </span>
                      <input
                        type="text"
                        name=""
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="you@example.com"
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label className="block">
                      <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        ID Number
                      </span>
                      <input
                        type="number"
                        name=""
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter ID"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-grow">
                    <label className="block">
                      <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Department
                      </span>
                      <input
                        type="text"
                        name=""
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter department"
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label className="block">
                      <span className="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Contact Number
                      </span>
                      <input
                        type="number"
                        name=""
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter number"
                      />
                    </label>
                  </div>
                </div>

                <div className="button flex justify-end gap-3">
                  <button className="border p-2 text-xs">Update Profile</button>
                  <button className="border p-2 text-xs">Manage Roles</button>
                  <button className="border p-2 text-xs">Change Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default admin_profile;
