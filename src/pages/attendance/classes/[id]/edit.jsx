import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function EditPage() {
  // Your existing code for the EditPage component
  // Fetch all classes
  const studentInfos = [
    {
      studentNumber: '1',
      studentName: 'Sharp',
      assignmentScore: 10,
      quizScore: 5,
      midtermScore: 50,
      finalScore: 50,
      grade: 1.25,
      unit: 3,
      status: 'PASSED',
    },
    {
      studentNumber: '2',
      studentName: 'Royalz',
      assignmentScore: 10,
      quizScore: 5,
      midtermScore: 50,
      finalScore: 50,
      grade: 1.25,
      unit: 3,
      status: 'PASSED',
    },
  ];
  const router = useRouter();
  const { className, id } = router.query;
  const [editTab, setEditTab] = useState(false);

  return (
    <>
      <Head>
        <title>Attendance Configuration | Atendance System</title>
      </Head>

      <NavBar />
      <main className="flex">
        <SideBarMenu />
        <div className=" w-full p-4">
          <div className="relative min-h-[80vh] border border-gray shadow-md">
            <div className="flex items-center justify-center border border-green bg-green py-3 ">
              <h2 className="text-2xl font-bold text-white">Attendance - {className}</h2>
            </div>
            <div className=" p-8">
              <table className="w-full border">
                <thead className="border">
                  <tr>
                    <th className="border p-2">Student #</th>
                    <th className="border p-2">Student Name</th>
                    <th className="border p-2">Time</th>
                    <th className="border p-2">
                      {editTab ? <input type="checkbox" /> : 'Present'}
                    </th>
                    <th className="border p-2">{editTab ? <input type="checkbox" /> : 'Absent'}</th>
                  </tr>
                </thead>
                <tbody>
                  {studentInfos.map((info) => (
                    <tr key={info.studentNumber} className="border">
                      <td
                        contentEditable={editTab}
                        className={`${editTab ? 'bg-gray' : ''} border text-center`}
                      >
                        {info.studentNumber}
                      </td>
                      <td
                        contentEditable={editTab}
                        className={`${editTab ? 'bg-gray' : ''} border text-center`}
                      >
                        {info.studentName}
                      </td>
                      <td
                        contentEditable={editTab}
                        className={`${editTab ? 'bg-gray' : ''} border text-center`}
                      >
                        {info.Time}
                      </td>
                      <td className={`${editTab ? 'bg-gray' : ''} border text-center`}>
                        {editTab ? (
                          <input
                            type="checkbox"
                            checked={info.Present}
                            onChange={() => {
                              // Handle checkbox change if needed
                            }}
                          />
                        ) : (
                          <span>{info.Present}</span>
                        )}
                      </td>
                      <td className={`${editTab ? 'bg-gray' : ''} border text-center`}>
                        {editTab ? (
                          <input
                            type="checkbox"
                            checked={info.Absent}
                            onChange={() => {
                              // Handle checkbox change if needed
                            }}
                          />
                        ) : (
                          <span>{info.Absent}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="absolute bottom-6 right-4 flex gap-2">
              {editTab ? (
                <button
                  type="button"
                  onClick={() => setEditTab(false)}
                  className="border border-gray px-6 py-2 text-lg font-semibold hover:bg-yellow"
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditTab(true)}
                  className="border border-gray px-6 py-2 text-lg font-semibold hover:bg-yellow"
                >
                  Edit
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  router.push(`/attendance/classes/${id}/edit?className=${className}&id=${id}`)
                }
                className="border border-gray px-6 py-2 text-lg font-semibold hover:bg-yellow"
              >
                Add Column
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
