import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const host = 'http://localhost:8080';

export default function report() {
  const router = useRouter();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Get studentId from the query parameters
    const { studentId } = router.query;

    if (studentId) {
      // Fetch student details based on the studentId
      const fetchStudentDetails = async () => {
        try {
          const response = await fetch(`${host}/students/${studentId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch student details. Status: ${response.status}`);
          }

          const data = await response.json();
          setStudentData(data);
        } catch (error) {
          console.error('Error fetching student details:', error);
        }
      };

      fetchStudentDetails();
    }
  }, [router.query]); // Re-run the effect when the query parameters change

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
              <div className="label">Student Information</div>
              <form className="mt-5 flex flex-col gap-5">
                <div className="flex gap-5">
                  <div className="flex-grow">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">Surname</span>
                      <input
                        type="text"
                        name="surname"
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter surname"
                        value={studentData?.lastName}
                        readOnly
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">First Name</span>
                      <input
                        type="text"
                        name="firstName"
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter firstname"
                        value={studentData?.firstName}
                        readOnly
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">Middle Name</span>
                      <input
                        type="text"
                        name="middleName"
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter middlename"
                        value={studentData?.middleName ? studentData?.middleName : ''}
                        readOnly
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">Suffix</span>
                      <input
                        type="text"
                        name="suffix"
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter suffix"
                        value={studentData?.nameSuffix ? studentData?.nameSuffix : ''}
                        readOnly
                      />
                    </label>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-grow">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Student Number
                      </span>
                      <input
                        type="text"
                        name="studentNumber"
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter student number"
                        value={studentData?.studentNumber}
                        readOnly
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Email Address
                      </span>
                      <input
                        type="text"
                        name="email"
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="you@example.com"
                        value={studentData?.email}
                        readOnly
                      />
                    </label>
                  </div>
                  <div className="flex-grow">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">
                        Contact Number
                      </span>
                      <input
                        type="number"
                        name="contactNumber"
                        className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Enter contact number"
                        value={studentData?.contactNumber}
                        readOnly
                      />
                    </label>
                  </div>
                </div>

                {/* Display student summary information in the table */}
                <div className="label mt-4">Summary</div>
                <div className="table-grades">
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th>Subject Name</th>
                        <th>Grade</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Add a loop to dynamically render subject and grade information
                      {studentData.grades.map((grade, index) => (
                        <tr key={index}>
                          <td>{grade.subjectName}</td>
                          <td>{grade.grade}</td>
                          <td>{grade.status}</td>
                        </tr>
                      ))} */}
                    </tbody>
                  </table>
                </div>

                <div className="table-attendance">
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th>Attendance</th>
                        <th>Total Day of School</th>
                        <th>Total Day of Present</th>
                        <th>Total Day of Absents</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Days:</td>
                        {/* <td>{studentData.attendance.totalDays}</td>
                        <td>{studentData.attendance.presentDays}</td>
                        <td>{studentData.attendance.absentDays}</td> */}
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
