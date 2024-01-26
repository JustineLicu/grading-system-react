import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';

const host = 'http://localhost:8080';

export default function subject_grades() {
  return (
    <>
      {/* HEADER */}
      <Head>
        <title>Subject Grades</title>
      </Head>

      {/* NAVIGATION BAR COMPONENT */}
      <NavBar />
      <div className="flex">
        {/* SIDE BAR COMPONENT */}
        <SideBarMenu />
        <div className="">
          <div className="content p-5 text-xl">
            <div className="account-details mt-4">
              <div className="label">Report Generation</div>
              <div id="search-sort">
                <form method="" className="flex gap-2">
                  <input
                    type="text"
                    name=""
                    class="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    placeholder="Search"
                  />
                  <button className="mt-1 block rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm">
                    Search
                  </button>
                  <select className="mt-1 block rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </form>
              </div>
              <div className="label mt-4 text-center">Subject Grades</div>
              <form className="mt-5 flex flex-col gap-5">
                <div className="table-subjectgrades">
                  <table class="table-auto">
                    <thead>
                      <tr>
                        <th>STUDENT #</th>
                        <th>LAST NAME</th>
                        <th>FIRST NAME</th>
                        <th>MIDDLE NAME</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>202010383</td>
                        <td>Buganan</td>
                        <td>Anthony Monel</td>
                        <td>Relles</td>
                        <td className="flex justify-center">
                          <button
                            id="view-button"
                            className="flex items-center gap-2 border p-2 text-xs"
                          >
                            View Summary
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>202010382</td>
                        <td>Claridad</td>
                        <td>Jesusa</td>
                        <td>Adlawan</td>
                        <td className="flex justify-center">
                          <button
                            id="view-button"
                            className="flex items-center gap-2 border p-2 text-xs"
                          >
                            View Summary
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>202010381</td>
                        <td>Cobreta</td>
                        <td>Romeo</td>
                        <td>Ceros</td>
                        <td className="flex justify-center">
                          <button
                            id="view-button"
                            className="flex items-center gap-2 border p-2 text-xs"
                          >
                            View Summary
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
