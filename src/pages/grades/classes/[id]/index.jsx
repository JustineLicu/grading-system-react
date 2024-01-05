import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ClassesPage() {
  // Fetch all classes
  const [studentInfos, setStudentInfos] = useState([
    {
      id: 1,
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
      id: 2,
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
  ]);

  const handleDeleteClick = (id) => {
    // Filter out the object with the specified studentNumber
    const updatedStudentInfos = studentInfos.filter((info) => info.id !== id);

    // Update the state with the filtered array
    setStudentInfos(updatedStudentInfos);
  };

  const generateRandomId = () => {
    return Date.now() + Math.floor(Math.random() * 1000);
  };

  const router = useRouter();
  const { className, id } = router.query;
  const [editTab, setEditTab] = useState(false);

  return (
    <>
      <Head>
        <title>Grade Configuration | Grading System</title>
      </Head>

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
                  <tr className="">
                    <th className="border p-2 text-center">Student #</th>
                    <th className="border p-2 text-center">Student Name</th>
                    <th className="border p-2 text-center">Assignment</th>
                    <th className="border p-2 text-center">Quiz</th>
                    <th className="border p-2 text-center">Midterm</th>
                    <th className="border p-2 text-center">Finals</th>
                    <th className="border p-2 text-center">Grade</th>
                    <th className="border p-2 text-center">Unit</th>
                    <th className="border p-2 text-center">Status</th>
                    <th className="border p-2 text-center">Action</th>
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
                      <td
                        className={`${editTab ? 'opacity-100' : 'opacity-50'} border text-center`}
                      >
                        <div className="flex w-full items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(info.id)}
                            className={`${
                              editTab ? '' : 'cursor-not-allowed'
                            } rounded-sm active:scale-95`}
                            disabled={!editTab}
                          >
                            <Image src="/delete.svg" alt="delete" width={20} height={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="absolute bottom-6 right-4 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const newId = generateRandomId();
                  setStudentInfos([
                    ...studentInfos,
                    {
                      id: newId.toString(),
                      studentNumber: `${newId
                        .toString()
                        .slice(newId.toString().length - 4, newId.toString().length)}`,
                      studentName: 'John',
                      assignmentScore: 0,
                      quizScore: 0,
                      midtermScore: 0,
                      finalScore: 0,
                      grade: 0,
                      unit: 0,
                      status: 'FAILED',
                    },
                  ]);
                }}
                className={`${
                  editTab ? 'hover:bg-yellow' : 'cursor-not-allowed opacity-50'
                } border-gray px-6 py-2 text-lg font-semibold  active:scale-95`}
                disabled={!editTab}
              >
                Add row
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push(`/grades/classes/${id}/edit?className=${className}&id=${id}`)
                }
                className={`${
                  editTab ? 'hover:bg-yellow' : 'cursor-not-allowed opacity-50'
                } border border-gray px-6 py-2 text-lg font-semibold active:scale-95`}
                disabled={!editTab}
              >
                Add Column
              </button>
              {editTab ? (
                <button
                  type="button"
                  onClick={() => setEditTab(false)}
                  className="border border-gray bg-yellow px-6 py-2 text-lg font-semibold active:scale-95"
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditTab(true)}
                  className="border border-gray bg-yellow px-6 py-2 text-lg font-semibold active:scale-95"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
