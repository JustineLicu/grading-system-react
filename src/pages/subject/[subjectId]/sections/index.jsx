import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const host = 'http://localhost:8080';

const SectionsView = () => {
  const [subjectInfo, setSubjectInfo] = useState({});
  const [isStudentInfoOpen, setIsStudentInfoOpen] = useState(false);
  const router = useRouter();
  const subjectId = router.query.subjectId;
  const [section, setSection] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    // Fetch notifications when the component mounts and when userId changes
    fetchSection();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);

      const subjectsResponse = await fetch(`${host}/subjects`, {
        credentials: 'include',
      });

      if (subjectsResponse.ok) {
        const subjectsData = await subjectsResponse.json();
        setSubjects(subjectsData);
      } else {
        // showToast(`Error fetching subjects: ${subjectsResponse.statusText}`, false);
      }
    } catch (error) {
      // showToast(`Error fetching subjects: ${error}`, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const openSubjectInfo = () => {
    setIsStudentInfoOpen(true);
  };

  const closeStudentInfo = () => {
    setIsStudentInfoOpen(false);
  };
  console.log('Subject Info:', subjectInfo);

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
                <div>
                  {subjects.map((subject) => (
                    <div key={subject.id}>
                      {/* <label className="text-md font-semibold">INSTRUCTOR</label>
                      <span className="m-1 w-1/3 rounded-lg bg-slate-200 p-1 font-semibold">
                        {subject.instructor}
                      </span> */}

                      {/* <label className="text-md ml-10 font-semibold">SUBJECT CODE</label>
                      <span className="m-1 w-1/3 rounded-lg bg-slate-200 p-1 font-semibold">
                        {subject.subjectCode}
                      </span> */}

                      {/* <label className="text-md font-semibold">SUBJECT DESCRIPTION</label>
                      <span className="m-1 w-3/5 rounded-lg bg-slate-200 p-1 font-semibold">
                        {subject.subjectDescription}
                      </span> */}
                    </div>
                  ))}
                </div>

                <div className="m-5 flex justify-end">
                  {section.map((section) => (
                    <button
                      type="button"
                      key={section.id}
                      onClick={() =>
                        router.push({
                          pathname: `/subject`,
                        })
                      }
                      className="m-4 w-1/6 rounded-lg bg-green px-6 py-1 text-yellow"
                    >
                      <h2 className=" mr-1 text-2xl text-yellow">{section.course}</h2>
                      <p className="text-yellow">
                        {section.year} - {section.name}
                      </p>
                    </button>
                  ))}

                  {/* <button
                    className="w-4/3 m-4 rounded-lg bg-green px-6 py-1 text-yellow"
                    onClick={openSubjectInfo}
                  >
                    EDIT INFORMATION
                  </button> */}
                </div>
              </div>
              <div className="m-5 flex justify-center">
                {/* <table className="border-gray-500 border-collapse border "> */}
                {/* <thead>
                    <tr>
                      <th className="border-gray-500 border p-2">STUDENT #</th>
                      <th className="border-gray-500 border p-2">LAST NAME</th>
                      <th className="border-gray-500 border p-2">FIRST NAME</th>
                      <th className="border-gray-500 border p-2">MIDDLE NAME</th>
                      <th className="border-gray-500 border p-2">COURSE</th>
                    </tr>
                  </thead> */}
                {/* <tbody> */}
                {/* {studentInfo.students.map((student) => (
                            <tr key={student.studentNumber}>
                              <td className="border-gray-500 border p-2">{student.studentNumber}</td>
                              <td className="border-gray-500 border p-2">{student.lastName}</td>
                              <td className="border-gray-500 border p-2">{student.firstName}</td>
                              <td className="border-gray-500 border p-2">{student.middleName}</td>
                              <td className="border-gray-500 border p-2">{student.course}</td>
                            </tr>
                          ))} */}
                {/* </tbody> */}
                {/* </table> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionsView;
