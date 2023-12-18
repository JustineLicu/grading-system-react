import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useState } from 'react';

export default function SubjectPage() {
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);

  const openAddSubject = (e) => {
    e.stopPropagation();
    setIsAddSubjectOpen(true);
  };

  const closeAddSubject = () => {
    setIsAddSubjectOpen(false);
  };

  const [isStudentInfoOpen, setIsStudentInfoOpen] = useState(false);
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

        <div className="m-8 mb-4 flex h-screen w-full flex-col items-center justify-end bg-gray-100">
          <div
            className="border-black-500 relative w-3/4 flex-1 flex-grow overflow-hidden border-2 bg-white shadow-md"
            onClick={openSubjectInfo}
          >
            <div className="bg-green border-b-2 p-2">
              <h2 className="text-yellow flex justify-center text-xl font-semibold">
                ALL SUBJECTS
              </h2>
            </div>
            <div className="border-black-500 m-5 w-2/4 cursor-pointer rounded-lg border-2">
              <div className="m-4">
                <h1 className="text-2xl font-semibold">ITEC 116</h1>
                <span>IT ELECTIVE 4 (SYSTEM INTEGRATION AND ARCHITECTURE 2)</span>
              </div>
            </div>

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
                  <div className="bg-green border-b-2 p-2">
                    <h2 className="text-yellow flex justify-center text-xl font-semibold">
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
                      <button className="bg-green text-yellow mt-2 rounded-lg px-4 font-semibold">
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
                  <button className="bg-green text-yellow m-4 w-1/6 rounded-lg px-6 py-1">
                    ADD SECTION
                  </button>
                  <div className="mr-8 flex justify-end">
                    <button
                      className="bg-green text-yellow m-4 w-1/6 px-6  py-1"
                      onClick={closeAddSubject}
                    >
                      CANCEL
                    </button>
                    <button className="bg-green text-yellow  m-4 w-1/6 px-6">SAVE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isStudentInfoOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-3/4">
              <div className="rounded-lg bg-white p-4">
                <div className="border-black-500 relative h-full flex-1 flex-grow overflow-hidden border-2 bg-white shadow-md">
                  <div className="bg-green border-b-2 p-2">
                    <h2 className="text-yellow flex justify-center text-xl font-semibold">
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
                      <button className="bg-green text-yellow m-4 w-1/6 rounded-lg px-6 py-1">
                        BSIT 4A
                      </button>
                      <button className="bg-green text-yellow m-4 w-1/6 rounded-lg px-6 py-1">
                        BSIT 4B
                      </button>
                      <button className="bg-green text-yellow w-4/3 m-4 rounded-lg px-6 py-1">
                        EDIT INFORMATION
                      </button>
                    </div>
                  </div>
                  <div className="m-5 flex justify-center">
                    <table className="border-collapse border border-gray-500 ">
                      <thead>
                        <tr>
                          <th className="border border-gray-500 p-2">STUDENT #</th>
                          <th className="border border-gray-500 p-2">LAST NAME</th>
                          <th className="border border-gray-500 p-2">FIRST NAME</th>
                          <th className="border border-gray-500 p-2">MIDDLE NAME</th>
                          <th className="border border-gray-500 p-2">COURSE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-500 p-2">202010383</td>
                          <td className="border border-gray-500 p-2">Buganan</td>
                          <td className="border border-gray-500 p-2">Anthony Monel</td>
                          <td className="border border-gray-500 p-2">Relies</td>
                          <td className="border border-gray-500 p-2">BSIT</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-500 p-2">202010382</td>
                          <td className="border border-gray-500 p-2">Claridad</td>
                          <td className="border border-gray-500 p-2">Jesusa</td>
                          <td className="border border-gray-500 p-2">Adlawan</td>
                          <td className="border border-gray-500 p-2">BSIT</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-500 p-2">202010381</td>
                          <td className="border border-gray-500 p-2">Cobreta</td>
                          <td className="border border-gray-500 p-2">Romeo</td>
                          <td className="border border-gray-500 p-2">Ceros</td>
                          <td className="border border-gray-500 p-2">BSIT</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mr-8 flex justify-end">
                    <button
                      className="bg-green text-yellow m-4 w-1/6 px-6  py-1"
                      onClick={closeStudentInfo}
                    >
                      CANCEL
                    </button>
                    <button className="bg-green text-yellow  m-4 w-1/6 px-6">SAVE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
