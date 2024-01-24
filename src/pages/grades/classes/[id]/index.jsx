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
    // Filter out the object with the specified id
    const updatedStudentInfos = studentInfos.filter((info) => info.id !== id);

    // Update the state with the filtered array
    setStudentInfos(updatedStudentInfos);

    // Close the delete modal
    setShowDeleteModal(false);
  };

  const generateRandomId = () => {
    return Date.now() + Math.floor(Math.random() * 1000);
  };

  const router = useRouter();
  const { className, id } = router.query;
  const [editTab, setEditTab] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
              <div className="flex">
                <div className="w-[10%] border p-2 text-center">Student #</div>
                <div className="w-[10%] border p-2 text-center">Student Name</div>
                <div className="w-[10%] border p-2 text-center">Assignment</div>
                <div className="w-[10%] border p-2 text-center">Quiz</div>
                <div className="w-[10%] border p-2 text-center">Midterm</div>
                <div className="w-[10%] border p-2 text-center">Finals</div>
                <div className="w-[10%] border p-2 text-center">Grade</div>
                <div className="w-[10%] border p-2 text-center">Unit</div>
                <div className="w-[10%] border p-2 text-center">Status</div>
                <div className="w-[10%] border p-2 text-center">Action</div>
              </div>
              {studentInfos.map((info) => (
                <div className="mb-1 flex w-full">
                  <input
                    type="text"
                    name=""
                    id="student-number"
                    className={`${editTab ? '' : 'bg-gray'} w-[10%] border  text-center`}
                    value={info.studentNumber}
                  />
                  <input
                    type="text"
                    name=""
                    id="student-name"
                    className={`${editTab ? '' : 'bg-gray'} w-[10%] border  text-center`}
                    value={info.studentName}
                  />
                  <input
                    type="text"
                    name=""
                    id="assignment-score"
                    className={`${editTab ? '' : 'bg-gray'} w-[10%] border  text-center`}
                    value={info.assignmentScore}
                  />
                  <input
                    type="text"
                    name=""
                    id="quiz-score"
                    className={`${editTab ? '' : 'bg-gray'} w-[10%] border  text-center`}
                    value={info.quizScore}
                  />
                  <input
                    type="text"
                    name=""
                    id="midterm-score"
                    className={`${editTab ? '' : 'bg-gray'} w-[10%] border  text-center`}
                    value={info.midtermScore}
                  />
                  <input
                    type="text"
                    name=""
                    id="final-score"
                    className={`${editTab ? '' : 'bg-gray'} w-[10%] border  text-center`}
                    value={info.finalScore}
                  />
                  <input
                    type="text"
                    name=""
                    id="grade"
                    className={`${editTab ? '' : 'bg-gray'} w-[10%] border  text-center`}
                    value={info.grade}
                  />
                  <input
                    type="text"
                    name=""
                    id="unit"
                    className={`${editTab ? '' : 'bg-gray'} w-[10%] border  text-center`}
                    value={info.unit}
                  />
                  <select
                    id=""
                    className={`${
                      editTab ? 'bg-transparent' : 'bg-gray'
                    } w-[10%] border  text-center`}
                  >
                    <option value="FAILED">FAILED</option>
                    <option value="PASSED">PASSED</option>
                  </select>
                  <div className="flex w-[10%] items-center justify-center border">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRow(info.id);
                        setShowDeleteModal(true);
                      }}
                      className={`${
                        editTab ? '' : 'cursor-not-allowed opacity-50'
                      } rounded-sm active:scale-95`}
                      disabled={!editTab}
                    >
                      <Image src="/delete.svg" alt="delete" width={20} height={20} />
                    </button>
                  </div>
                </div>
              ))}
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
                } border border-gray px-6 py-2 text-lg font-semibold  active:scale-95`}
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

      <div
        className={`${
          showDeleteModal ? '' : 'hidden'
        } absolute top-0 flex h-[100vh] w-[100vw] items-center justify-center bg-black/20`}
      >
        <div className="flex flex-col gap-4 rounded-sm bg-green  p-4">
          <div className="text-lg font-medium text-white">Are you sure you want to delete?</div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => handleDeleteClick(selectedRow)}
              className=" bg-red px-2 py-1 text-lg font-medium text-white active:scale-95"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteModal(false)}
              className="  bg-gray px-2 py-1 text-lg font-medium active:scale-95"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
