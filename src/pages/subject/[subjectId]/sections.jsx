// sectionsView.jsx
import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const host = 'http://localhost:8080';

const SectionsView = () => {
  const [subjectId, setSubjectId] = useState(null);
  const [sections, setSections] = useState([]);
  const [isStudentInfoOpen, setIsStudentInfoOpen] = useState(false);

  const fetchSections = async () => {
    try {
      const sectionResponse = await fetch(`${host}/subjects/${subjectId}/sections`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (sectionResponse.ok) {
        const sectionData = await sectionResponse.json();
        setSections(sectionData.sections); // Update the state with fetched sections
      } else {
        console.error('Error fetching sections:', sectionResponse.statusText);
      }
    } catch (error) {
      console.error('Error fetching sections:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (subjectId) {
        await fetchSections();
      }
    };

    fetchData();
  }, [subjectId]);

  const openSubjectInfo = (selectedSubjectId) => {
    setSubjectId(selectedSubjectId);
    setIsStudentInfoOpen(true);
  };

  const closeStudentInfo = () => {
    setIsStudentInfoOpen(false);
  };

  return (
    <div>
      {/* HEADER */}
      <Head>
        <title>Student Information</title>
      </Head>

      {/* NAVIGATION BAR COMPONENT */}
      <NavBar />
      <div className="flex">
        <SideBarMenu />
      </div>

      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-3/4">
          <div className="rounded-lg bg-white p-4">
            <div className="border-black-500 relative h-full flex-1 flex-grow overflow-hidden border-2 bg-white shadow-md">
              <div className="border-b-2 bg-green p-2">
                <h2 className="flex justify-center text-xl font-semibold text-yellow">
                  SUBJECT STUDENT INFORMATION MANAGEMENT
                </h2>
              </div>
              <div className="">
                <div className="m-5">
                  <label className="text-md font-semibold">INSTRUCTOR</label>
                  <input
                    type="text"
                    className="m-1 w-1/3 rounded-lg bg-slate-200 p-1 font-semibold"
                    placeholder="Instructor"
                  />
                  <label className="text-md ml-6 font-semibold">SUBJECT CODE</label>
                  <input
                    type="text"
                    className="m-1 w-1/3 rounded-lg bg-slate-200 p-1 font-semibold"
                    placeholder="ITEC 116"
                  />
                  <label className="text-md font-semibold">SUBJECT DESCRIPTION</label>
                  <input
                    type="text"
                    className="m-1 w-3/5 rounded-lg bg-slate-200 p-1 font-semibold"
                    placeholder="IT ELECTIVE 4 (SYSTEM INTEGRATION AND ARCHITECTURE 2)"
                  />
                </div>
                <div className="m-5 flex justify-end">
                  <button
                    className="m-4 w-1/6 rounded-lg bg-green px-6 py-1 text-yellow"
                    onClick={() => openSubjectInfo()}
                  >
                    BSIT-4A
                  </button>

                  <button
                    className="w-4/3 m-4 rounded-lg bg-green px-6 py-1 text-yellow"
                    onClick={() => openSubjectInfo()}
                  >
                    EDIT INFORMATION
                  </button>
                </div>
              </div>
              <div className="m-5 flex justify-center">
                <table className="border-gray-500 border-collapse border ">
                  <thead>
                    <tr>
                      <th className="border-gray-500 border p-2">STUDENT #</th>
                      <th className="border-gray-500 border p-2">LAST NAME</th>
                      <th className="border-gray-500 border p-2">FIRST NAME</th>
                      <th className="border-gray-500 border p-2">MIDDLE NAME</th>
                      <th className="border-gray-500 border p-2">COURSE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {studentInfo.students.map((student) => (
                            <tr key={student.studentNumber}>
                              <td className="border-gray-500 border p-2">{student.studentNumber}</td>
                              <td className="border-gray-500 border p-2">{student.lastName}</td>
                              <td className="border-gray-500 border p-2">{student.firstName}</td>
                              <td className="border-gray-500 border p-2">{student.middleName}</td>
                              <td className="border-gray-500 border p-2">{student.course}</td>
                            </tr>
                          ))} */}
                  </tbody>
                </table>
              </div>
              <div className="mr-8 flex justify-end">
                {
                  <button
                    className="m-4 w-1/6 bg-green px-6 py-1  text-yellow"
                    onClick={closeStudentInfo}
                  >
                    CANCEL
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionsView;
