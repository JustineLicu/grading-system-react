import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';

const host = 'http://localhost:8080';

export default function student_summary_grades() {
  return (
    <>
      {/* HEADER */}
      <Head>
        <title>Report Generation</title>
      </Head>

      {/* NAVIGATION BAR COMPONENT */}
      <NavBar />
      <div className="flex">
        {/* SIDE BAR COMPONENT */}
        <SideBarMenu />
        <div className="">
          <div className="content p-5 text-xl">
            <div className="account-details mt-4">
              <div className="label">Student Summary of Grades</div>
              <form className="mt-5 flex flex-col gap-5">
                <div className="flex gap-5">
                  <div className="flex-grow">
                    <label class="block">
                      <span class="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Surname
                      </span>
                      <input
                        type="text"
                        name=""
                        class="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter surname"
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label class="block">
                      <span class="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        First Name
                      </span>
                      <input
                        type="text"
                        name=""
                        class="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter firstname"
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label class="block">
                      <span class="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Middle Name
                      </span>
                      <input
                        type="text"
                        name=""
                        class="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter middlename"
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label class="block">
                      <span class="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Suffix
                      </span>
                      <input
                        type="text"
                        name=""
                        class="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter suffix"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-grow">
                    <label class="block">
                      <span class="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Student Number
                      </span>
                      <input
                        type="text"
                        name=""
                        class="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter student number"
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label class="block">
                      <span class="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Email Address
                      </span>
                      <input
                        type="text"
                        name=""
                        class="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="you@example.com"
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label class="block">
                      <span class="after:text-red-500 block text-sm font-medium text-slate-700 after:ml-0.5 after:content-['*']">
                        Contact Number
                      </span>
                      <input
                        type="number"
                        name=""
                        class="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter contact number"
                      />
                    </label>
                  </div>
                </div>

                <div className="label mt-4">Breakdown of Grades</div>
                <div className="table-grades">
                  <table class="table-auto">
                    <thead>
                      <tr>
                        <th>Ass 1</th>
                        <th>Quiz 1</th>
                        <th>Midterms</th>
                        <th>Finals</th>
                        <th>Grade</th>
                        <th>Unit</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>5</td>
                        <td>5</td>
                        <td>20</td>
                        <td>20</td>
                        <td>5.00</td>
                        <td>1</td>
                        <td>Failed</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>5</td>
                        <td>20</td>
                        <td>20</td>
                        <td>5.00</td>
                        <td>1</td>
                        <td>Failed</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>5</td>
                        <td>20</td>
                        <td>20</td>
                        <td>5.00</td>
                        <td>1</td>
                        <td>Failed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="table-attendance">
                  <table class="table-auto">
                    <thead>
                      <tr>
                        <th>Attendance</th>
                        <th>Aug</th>
                        <th>Sept</th>
                        <th>Oct</th>
                        <th>Nov</th>
                        <th>Dec</th>
                        <th>Jan</th>
                        <th>Feb</th>
                        <th>Mar</th>
                        <th>Apr</th>
                        <th>May</th>
                        <th>Jun</th>
                        <th>Jul</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Day of School</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Day of Present</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Times Tardy</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="button flex justify-end gap-3">
                  <button className="flex items-center gap-2 border p-2 text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-file-minus"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="9" x2="15" y1="15" y2="15" />
                    </svg>
                    PDF Format
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
