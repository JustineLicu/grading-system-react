import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

const host = 'http://localhost:8080';

export default function GradeConfigPage() {
  const router = useRouter();
  const subjectId = router.query.subjectId;

  const [scores, setScores] = useState([
    { type: 'Quiz 1', items: 10, percentage: '20%' },
    { type: 'Assignment 1', items: 10, percentage: '10%' },
    { type: 'Activity 1', items: 10, percentage: '10%' },
    { type: 'Midterm', items: 100, percentage: '30%' },
    { type: 'Final', items: 100, percentage: '40%' },
  ]);

  const addSection = async () => {
    try {
      const response = await fetch(`${host}/subjects/${subjectId}/sections`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course,
          year,
          name,
          gradeColumns: JSON.stringify(scores),
        }),
      });

      if (response.ok) {
        alert('Section added successfully');
      } else {
        alert(`Error adding section: ${response.statusText}`);
      }
    } catch (error) {
      alert(`Error adding section: ${error}`);
    }
  };

  const [gradeType, setGradeType] = useState('');
  const [typeNumber, setTypeNumber] = useState(0);
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [name, setName] = useState('');
  return (
    <>
      <Head>
        <title>Sections | Grading System</title>
      </Head>

      <NavBar />
      <main className="flex">
        <SideBarMenu />
        <div className=" w-full p-4">
          <div className="relative min-h-[80vh] border border-gray shadow-md">
            <div className="flex items-center justify-center border border-green bg-green py-3 ">
              <h2 className="text-2xl font-bold text-white">Create a Section</h2>
            </div>
            <div className="flex w-3/4 flex-col border-gray p-8">
              <div className="flex w-3/4 flex-col gap-4">
                <label htmlFor="course" className="text-xl font-bold">
                  Course
                </label>
                <input
                  type="text"
                  name=""
                  id="course"
                  className="rounded-sm border p-1"
                  onChange={(e) => setCourse(e.target.value)}
                  value={course}
                />
                <label htmlFor="year" className="text-xl font-bold">
                  Year
                </label>
                <input
                  type="text"
                  name=""
                  id="year"
                  className="rounded-sm border p-1"
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                />
                <label htmlFor="name" className="text-xl font-bold">
                  Name
                </label>
                <input
                  type="text"
                  name=""
                  id="name"
                  className="rounded-sm border p-1"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="mt-4">
                <div className="mb-2 text-2xl font-bold">Add column grades</div>
                <div className="flex w-full">
                  <div className="w-1/4 border p-2 text-center">Type</div>
                  <div className="w-1/4 border p-2 text-center">Items</div>
                  <div className="w-1/4 border p-2 text-center">Percentage</div>
                  <div className="w-1/4 border p-2 text-center">Action</div>
                </div>
                {scores.map((score) => (
                  <div className="mb-1 flex w-full">
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`w-1/4 border  text-center focus:z-10 focus:font-bold`}
                      value={score.type}
                    />
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`w-1/4 border  text-center focus:z-10 focus:font-bold`}
                      value={score.items}
                    />
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`w-1/4 border  text-center focus:z-10 focus:font-bold`}
                      value={score.percentage}
                    />
                    <div className="flex w-1/4 items-center justify-center gap-2 border">
                      <button
                        type="button"
                        onClick={() => {
                          const updatedScores = scores.filter((s) => s.type !== score.type);
                          setScores(updatedScores);
                        }}
                        className={`rounded-sm active:scale-95`}
                      >
                        <Image src="/delete.svg" alt="delete" width={20} height={20} />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-4">
                  <select
                    name=""
                    id=""
                    className="rounded-sm border p-1 text-lg"
                    onChange={(e) => setGradeType(e.target.value)}
                  >
                    <option value="">Select a grade type</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Activity">Activity</option>
                  </select>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="rounded-sm border p-1"
                    onChange={(e) => setTypeNumber(e.target.value)}
                    value={typeNumber}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newScore = {
                        type: `${gradeType} ${typeNumber}`,
                        items: 0,
                        percentage: '0%',
                      }; // Initial values for a new type
                      const typeIndex = scores.findIndex((score) =>
                        score.type.startsWith(`${gradeType}`)
                      );

                      // If there's an existing type, insert the new type after it; otherwise, add it at the end
                      if (typeIndex !== -1) {
                        setScores([
                          ...scores.slice(0, typeIndex + 1),
                          newScore,
                          ...scores.slice(typeIndex + 1),
                        ]);
                      } else {
                        setScores([...scores, newScore]);
                      }
                    }}
                    className="my-3 border border-gray px-4 py-1 text-lg font-semibold hover:bg-yellow active:scale-95"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => addSection()}
              className="absolute bottom-4 right-4 rounded-full bg-yellow p-2 text-2xl font-bold text-white active:scale-95"
            >
              <Image src="/add.svg" alt="add" width={30} height={30} />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
