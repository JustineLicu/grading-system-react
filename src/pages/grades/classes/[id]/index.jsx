import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ClassesPage() {
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
      <NavBar />
      <main className="flex">
        <SideBarMenu />
        <div className=" w-full p-4">
          <div className="relative min-h-[80vh] border border-gray shadow-md">
            <div className="flex items-center justify-center border border-green bg-green py-3 ">
              <h2 className="text-2xl font-bold text-white">Subject - {className}</h2>
            </div>
            <div className=" p-8">
              <table className="w-full border">
                <thead className="border">
                  <tr>
                    <th className="border p-2">Student #</th>
                    <th className="border p-2">Student Name</th>
                    <th className="border p-2">Assignment</th>
                    <th className="border p-2">Quiz</th>
                    <th className="border p-2">Midterm</th>
                    <th className="border p-2">Finals</th>
                    <th className="border p-2">Grade</th>
                    <th className="border p-2">Unit</th>
                    <th className="border p-2">Status</th>
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
                        {info.assignmentScore}
                      </td>
                      <td
                        contentEditable={editTab}
                        className={`${editTab ? 'bg-gray' : ''} border text-center`}
                      >
                        {info.quizScore}
                      </td>
                      <td
                        contentEditable={editTab}
                        className={`${editTab ? 'bg-gray' : ''} border text-center`}
                      >
                        {info.midtermScore}
                      </td>
                      <td
                        contentEditable={editTab}
                        className={`${editTab ? 'bg-gray' : ''} border text-center`}
                      >
                        {info.finalScore}
                      </td>
                      <td
                        contentEditable={editTab}
                        className={`${editTab ? 'bg-gray' : ''} border text-center`}
                      >
                        {info.grade}
                      </td>
                      <td
                        contentEditable={editTab}
                        className={`${editTab ? 'bg-gray' : ''} border text-center`}
                      >
                        {info.unit}
                      </td>
                      <td
                        contentEditable={editTab}
                        className={`${editTab ? 'bg-gray' : ''} border text-center`}
                      >
                        {info.status}
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
                  router.push(`/grades/classes/${id}/edit?className=${className}&id=${id}`)
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
