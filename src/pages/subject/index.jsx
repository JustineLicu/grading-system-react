import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useState } from 'react';

const host = 'http://localhost:8080';

export default function SubjectPage() {
  // Mock data for subjects
  const subjects = [
    {
      id: 1,
      code: 'ITEC 116',
      description: 'IT ELECTIVE 4 (SYSTEM INTEGRATION AND ARCHITECTURE 2)',
    },
    { id: 2, code: 'ITEC 22A', description: 'COMPUTER PROGRAMMING 1' },
    { id: 3, code: 'ITEC 22B', description: 'COMPUTER PROGRAMMING 2' },
    // Add more subjects as needed
  ];

  // Mock data for student information
  const studentInfo = {
    instructor: 'John Doe',
    subjectCode: 'ITEC 116',
    subjectDescription: 'IT ELECTIVE 4 (SYSTEM INTEGRATION AND ARCHITECTURE 2)',
    students: [
      {
        studentNumber: '202010383',
        lastName: 'Buganan',
        firstName: 'Anthony Monel',
        middleName: 'Relies',
        course: 'BSIT',
      },
      {
        studentNumber: '202010382',
        lastName: 'Claridad',
        firstName: 'Jesusa',
        middleName: 'Adlawan',
        course: 'BSIT',
      },
      {
        studentNumber: '202010381',
        lastName: 'Cobreta',
        firstName: 'Romeo',
        middleName: 'Ceros',
        course: 'BSIT',
      },
      {
        studentNumber: '202010395',
        lastName: 'Evangelista',
        firstName: 'Angelo Gabriel',
        middleName: 'Dillera',
        course: 'BSIT',
      },
      // Add more students as needed
    ],
  };

  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isStudentInfoOpen, setIsStudentInfoOpen] = useState(false);
  const [sections, setSections] = useState([]);

  const openAddSubject = (e) => {
    e.stopPropagation();
    setIsAddSubjectOpen(true);
  };

  const closeAddSubject = () => {
    setIsAddSubjectOpen(false);
  };

  const openSubjectInfo = () => {
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
        <div className="bg-gray-100 h-10/12 m-8 mb-4 flex w-full flex-col items-center justify-end">
          <div className="border-black-500 relative w-3/4 flex-1 flex-grow overflow-hidden border-2 bg-white shadow-md">
            <div className="border-b-2 bg-green p-2">
              <h2 className="flex justify-center text-xl font-semibold text-yellow">
                ALL SUBJECTS
              </h2>
            </div>
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="border-black-500 m-5 w-2/4 cursor-pointer rounded-lg border-2"
                onClick={openSubjectInfo}
              >
                <div className="m-4">
                  <h1 className="text-2xl font-semibold">{subject.code}</h1>
                  <span>{subject.description}</span>
                </div>
              </div>
            ))}

            <button
              className="border-black-500 absolute bottom-0 right-0 mb-14 mr-14 w-48 border-2 p-2"
              onClick={openAddSubject}
            >
              ADD SUBJECT
            </button>
          </div>
        </div>
        {isAddSubjectOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-3/4">
              <div className="rounded-lg bg-white p-4">
                <div className="border-black-500 relative h-full flex-1 flex-grow overflow-hidden border-2 bg-white shadow-md">
                  <div className="border-b-2 bg-green p-2">
                    <h2 className="flex justify-center text-xl font-semibold text-yellow">
                      ADDING OF SUBJECT
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 ">
                    <div className="m-5">
                      <h1 className="text-xl font-semibold">ADD SUBJECT</h1>
                      <input
                        type="text"
                        className="m-1 w-3/4 rounded-lg bg-slate-200 p-1 font-semibold"
                        placeholder="Enter subject code"
                      />
                      <input
                        type="text"
                        className="m-1 w-3/4 rounded-lg bg-slate-200 p-1 font-semibold"
                        placeholder="Enter subject description / name"
                      />
                    </div>
                    <div className="m-5">
                      <h1 className="text-xl font-semibold">DOWNLOAD TEMPLATE</h1>
                      <span>This template contains required fields to list student details.</span>
                      <button className="mt-2 rounded-lg bg-green px-4 font-semibold text-yellow">
                        DOWNLOAD
                      </button>
                    </div>
                  </div>
                  <div className="m-5">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <h1 className="text-xl font-semibold">COURSE</h1>
                        <select
                          name="course"
                          id="course"
                          className="w-2/3 rounded-md border px-3 py-2 text-xl font-medium"
                        >
                          <option value="bsit">BSIT</option>
                          <option value="bscs">BSCS</option>
                          <option value="bsoa">BSOA</option>
                          <option value="bsis">BSIS</option>
                        </select>
                      </div>
                      <div>
                        <h1 className="text-xl font-semibold">YEAR LEVEL</h1>
                        <select
                          name="yearlevel"
                          id="yearlevel"
                          className="w-2/3 rounded-md border px-3 py-2 text-xl font-medium"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                      <div>
                        <h1 className="text-xl font-semibold">SECTION</h1>
                        <select
                          name="section"
                          id="section"
                          className="w-2/3 rounded-md border px-3 py-2 text-xl font-medium"
                        >
                          <option value="a">A</option>
                          <option value="b">B</option>
                          <option value="c">C</option>
                          <option value="d">D</option>
                        </select>
                      </div>
                      <div>
                        <h1 className="text-xl font-semibold">SELECT FILE</h1>
                        <input type="file" id="imageUpload" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <h1 className="text-xl font-semibold">COURSE</h1>
                        <select
                          name="course"
                          id="course"
                          className="w-2/3 rounded-md border px-3 py-2 text-xl font-medium"
                        >
                          <option value="bsit">BSIT</option>
                          <option value="bscs">BSCS</option>
                          <option value="bsoa">BSOA</option>
                          <option value="bsis">BSIS</option>
                        </select>
                      </div>
                      <div>
                        <h1 className="text-xl font-semibold">YEAR LEVEL</h1>
                        <select
                          name="yearlevel"
                          id="yearlevel"
                          className="w-2/3 rounded-md border px-3 py-2 text-xl font-medium"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                      <div>
                        <h1 className="text-xl font-semibold">SECTION</h1>
                        <select
                          name="section"
                          id="section"
                          className="w-2/3 rounded-md border px-3 py-2 text-xl font-medium"
                        >
                          <option value="a">A</option>
                          <option value="b">B</option>
                          <option value="c">C</option>
                          <option value="d">D</option>
                        </select>
                      </div>
                      <div>
                        <h1 className="text-xl font-semibold">SELECT FILE</h1>
                        <input type="file" id="imageUpload" />
                      </div>
                    </div>
                  </div>
                  <button className="m-4 w-1/6 rounded-lg bg-green px-6 py-1 text-yellow">
                    ADD SECTION
                  </button>
                  <div className="mr-8 flex justify-end">
                    <button
                      className="m-4 w-1/6 bg-green px-6 py-1  text-yellow"
                      onClick={closeAddSubject}
                    >
                      CANCEL
                    </button>
                    <button className="m-4 w-1/6  bg-green px-6 text-yellow">SAVE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}{' '}
        {isStudentInfoOpen && (
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
                        defaultValue={studentInfo.instructor}
                      />
                      <label className="text-md ml-6 font-semibold">SUBJECT CODE</label>
                      <input
                        type="text"
                        className="m-1 w-1/3 rounded-lg bg-slate-200 p-1 font-semibold"
                        placeholder="ITEC 116"
                        defaultValue={studentInfo.subjectCode}
                      />
                      <label className="text-md font-semibold">SUBJECT DESCRIPTION</label>
                      <input
                        type="text"
                        className="m-1 w-3/5 rounded-lg bg-slate-200 p-1 font-semibold"
                        placeholder="IT ELECTIVE 4 (SYSTEM INTEGRATION AND ARCHITECTURE 2)"
                        defaultValue={studentInfo.subjectDescription}
                      />
                    </div>
                    <div className="m-5 flex justify-end">
                      <button className="m-4 w-1/6 rounded-lg bg-green px-6 py-1 text-yellow">
                        BSIT 4A
                      </button>
                      <button className="m-4 w-1/6 rounded-lg bg-green px-6 py-1 text-yellow">
                        BSIT 4B
                      </button>
                      <button className="w-4/3 m-4 rounded-lg bg-green px-6 py-1 text-yellow">
                        EDIT INFORMATION
                      </button>
                    </div>{' '}
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
                        {studentInfo.students.map((student) => (
                          <tr key={student.studentNumber}>
                            <td className="border-gray-500 border p-2">{student.studentNumber}</td>
                            <td className="border-gray-500 border p-2">{student.lastName}</td>
                            <td className="border-gray-500 border p-2">{student.firstName}</td>
                            <td className="border-gray-500 border p-2">{student.middleName}</td>
                            <td className="border-gray-500 border p-2">{student.course}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mr-8 flex justify-end">{/* ... (your existing buttons) */}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
