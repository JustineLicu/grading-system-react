import GradesCellColumns from '@/components/grades-cell-columns';
import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const host = 'http://localhost:8080';

export default function EditGradeConfigPage() {
  const router = useRouter();
  const subjectId = router.query.subjectId;
  const sectionId = router.query.sectionId;

  const [section, setSection] = useState([]);

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const sectionResponse = await fetch(`${host}/subjects/${subjectId}/sections`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const sectionData = await sectionResponse.json();
        setSection(sectionData);
      } catch (error) {
        console.error('Error fetching current user:', error.message);
      }
    };

    // Fetch notifications when the component mounts and when userId changes
    fetchSection();
  }, [subjectId]);

  const sectionDetails = section.filter((grades) => grades.id === +sectionId);
  const currentSection = sectionDetails[0];

  useEffect(() => {
    // Update scores when the section state changes
    const scoresColumn = section
      .filter((grades) => grades.id === +sectionId)
      .map((filter) => JSON.parse(filter.gradeColumns));
    setScores(scoresColumn.flat());
  }, [section]);

  const [scores, setScores] = useState([]);
  console.log(scores);
  const updateSection = async () => {
    try {
      const response = await fetch(`${host}/subjects/${subjectId}/sections/${sectionId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gradeColumns: JSON.stringify(scores),
        }),
      });

      if (response.ok) {
        alert('Section updated successfully');
        router.push(`/reportConfig/${subjectId}/sections`);
      } else {
        alert(`Error updating section: ${response.statusText}`);
      }
    } catch (error) {
      alert(`Error updating section: ${error}`);
    }
  };

  const [gradeType, setGradeType] = useState('');
  const [typeNumber, setTypeNumber] = useState(0);

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
              <h2 className="text-2xl font-bold text-white">Edit a Section</h2>
            </div>
            <div className="flex w-3/4 flex-col border-gray p-8">
              <div className="mt-4">
                <div className="flex w-full">
                  <div className="w-1/4 border p-2 text-center">Type</div>
                  <div className="w-1/4 border p-2 text-center">Items</div>
                  <div className="w-1/4 border p-2 text-center">Percentage</div>
                  <div className="w-1/4 border p-2 text-center">Action</div>
                </div>
                {scores.flat().map((score) => (
                  <GradesCellColumns
                    {...score}
                    scores={scores}
                    setScores={setScores}
                    setGradeType={setGradeType}
                    setTypeNumber={setTypeNumber}
                  />
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
                        colId: generateUniqueId(),
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
              onClick={() => updateSection()}
              className="absolute bottom-4 right-4 rounded-full bg-yellow p-2 text-2xl font-bold text-white active:scale-95"
            >
              <Image src="/save.svg" alt="save" width={30} height={30} />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
