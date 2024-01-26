import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const host = 'http://localhost:8080';

export default function SubjectPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isStudentInfoOpen, setIsStudentInfoOpen] = useState(false);
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectDescription, setSubjectDescription] = useState('');
  const [subjectCourse, setSubjectCourse] = useState('');
  const [subjectYear, setSubjectYear] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [isEditSubjectOpen, setIsEditSubjectOpen] = useState(false);
  const [editedSubjectCode, setEditedSubjectCode] = useState('');
  const [editedSubjectDescription, setEditedSubjectDescription] = useState('');
  const [subjectToEdit, setSubjectToEdit] = useState(null);

  // const [gradeColumns, ] = useState([]);
  const router = useRouter();
  const { sectionId, subjectId } = router.query;

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

  const addSubject = async () => {
    try {
      const response = await fetch(`${host}/subjects`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: subjectCode,
          description: subjectDescription,
          sections: [
            {
              course: subjectCourse,
              year: subjectYear,
              name: subjectName,
              // gradeColumns: [],
            },
          ],
        }),
      });

      if (response.ok) {
        closeAddSubject();
        fetchSubjects(); // Refresh the subjects after adding a new one
      } else {
        const errorData = await response.json(); // Assuming the server returns JSON error details

        // Check if the server provided additional error information
        const errorMessage =
          errorData && errorData.message ? errorData.message : response.statusText;

        alert(`Error adding subject: ${errorMessage}`);
      }
    } catch (error) {
      alert(`Error adding subject: ${error.message}`);
    }
  };

  const deleteSubject = async (subjectId) => {
    try {
      const response = await fetch(`${host}/subjects/${subjectId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        fetchSubjects(); // Refresh the subjects after deleting one
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData && errorData.message ? errorData.message : response.statusText;
        alert(`Error deleting subject: ${errorMessage}`);
      }
    } catch (error) {
      alert(`Error deleting subject: ${error.message}`);
    }
  };

  // Function to open the edit subject modal
  const openEditSubject = (subject) => {
    setSubjectToEdit(subject);
    setEditedSubjectCode(subject.code);
    setEditedSubjectDescription(subject.description);
    setIsEditSubjectOpen(true);
  };

  // Function to close the edit subject modal
  const closeEditSubject = () => {
    setIsEditSubjectOpen(false);
    setSubjectToEdit(null);
  };

  // Function to handle the PUT request for editing a subject
  const editSubject = async () => {
    try {
      const response = await fetch(`${host}/subjects/${subjectToEdit.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: editedSubjectCode,
          description: editedSubjectDescription,
        }),
      });

      if (response.ok) {
        closeEditSubject();
        fetchSubjects(); // Refresh the subjects after editing
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData && errorData.message ? errorData.message : response.statusText;
        alert(`Error editing subject: ${errorMessage}`);
      }
    } catch (error) {
      alert(`Error editing subject: ${error.message}`);
    }
  };

  const openAddSubject = (e) => {
    e.stopPropagation();
    setIsAddSubjectOpen(true);
  };

  const closeAddSubject = () => {
    setIsAddSubjectOpen(false);
  };

  const openSubjectInfo = async (subjectId) => {
    try {
      if (!subjectId) {
        console.error('Subject ID is undefined');
        return;
      }

      // Fetch the sections for the selected subject
      await fetchSection(subjectId);
      // Open the subject info modal or perform other actions as needed
      setIsStudentInfoOpen(true);
    } catch (error) {
      console.error('Error opening subject info:', error.message);
    }
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
        <div className="bg-gray-100  m-8 mb-4 flex w-full flex-col items-center ">
          <div className="border-black-500 relative min-h-[80vh] w-3/4 border-2 bg-white shadow-md">
            <div className="border-b-2 bg-green p-2">
              <h2 className="flex justify-center text-xl font-semibold text-yellow">
                ALL SUBJECTS
              </h2>
            </div>
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="border-black-500 m-5 w-2/4 cursor-pointer rounded-lg border-2"
                onClick={() => router.push(`/subject/${subject.id}/sections`)}
              >
                <div className="m-4">
                  <h1 className="text-2xl font-semibold">{subject.code}</h1>
                  <span>{subject.description}</span>
                  <button
                    className="bg-red-500 mt-2 rounded-lg px-4 font-semibold"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from triggering the openSubjectInfo
                      setSubjectToDelete(subject.id);
                      setIsDeleteConfirmationOpen(true);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="ml-2 mt-2 rounded-lg bg-blue-500 px-4 font-semibold text-white"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from triggering the openSubjectInfo
                      openEditSubject(subject);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
            {isDeleteConfirmationOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-1/4">
                  <div className="rounded-lg bg-white p-4">
                    <p className="mb-4 text-xl font-semibold">Confirm Deletion</p>
                    <p>Are you sure you want to delete this subject?</p>
                    <div className="flex justify-end">
                      <button
                        className="m-2 rounded-lg bg-green px-6 py-1 text-yellow"
                        onClick={() => {
                          deleteSubject(subjectToDelete);
                          setIsDeleteConfirmationOpen(false);
                          setSubjectToDelete(null);
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className="bg-red-500 m-2 rounded-lg px-6 py-1 "
                        onClick={() => {
                          setIsDeleteConfirmationOpen(false);
                          setSubjectToDelete(null);
                        }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isEditSubjectOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-3/4">
                  <div className="rounded-lg bg-white p-4">
                    <div className="border-black-500 relative h-full flex-1 flex-grow overflow-hidden border-2 bg-white shadow-md">
                      <div className="border-b-2 bg-green p-2">
                        <h2 className="flex justify-center text-xl font-semibold text-yellow">
                          EDIT SUBJECT
                        </h2>
                      </div>
                      <div className="m-5">
                        <h1 className="text-xl font-semibold">EDIT SUBJECT</h1>
                        <input
                          type="text"
                          className="m-1 w-3/4 rounded-lg bg-slate-200 p-1 font-semibold"
                          placeholder="Enter subject code"
                          value={editedSubjectCode}
                          onChange={(e) => setEditedSubjectCode(e.target.value)}
                        />
                        <input
                          type="text"
                          className="m-1 w-3/4 rounded-lg bg-slate-200 p-1 font-semibold"
                          placeholder="Enter subject description / name"
                          value={editedSubjectDescription}
                          onChange={(e) => setEditedSubjectDescription(e.target.value)}
                        />
                      </div>
                      <div className="mr-8 flex justify-end">
                        <button
                          className="m-4 w-1/6 bg-green px-6 py-1 text-yellow"
                          onClick={editSubject}
                        >
                          SAVE
                        </button>
                        <button
                          className="m-4 w-1/6 bg-green px-6 py-1 text-yellow"
                          onClick={closeEditSubject}
                        >
                          CANCEL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                className="border-black-500 absolute bottom-0 right-0 mb-14 mr-14 w-48 border-2 p-2"
                onClick={openAddSubject}
              >
                ADD SUBJECT
              </button>
            </div>
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
                        value={subjectCode}
                        onChange={(e) => setSubjectCode(e.target.value)}
                      />
                      <input
                        type="text"
                        className="m-1 w-3/4 rounded-lg bg-slate-200 p-1 font-semibold"
                        placeholder="Enter subject description / name"
                        value={subjectDescription}
                        onChange={(e) => setSubjectDescription(e.target.value)}
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
                          value={subjectCourse}
                          onChange={(e) => setSubjectCourse(e.target.value)}
                        >
                          <option value="" disabled>
                            Course
                          </option>
                          <option value="BSIT">BSIT</option>
                          <option value="BSCS">BSCS</option>
                          <option value="BSOA">BSOA</option>
                          <option value="BSIS">BSIS</option>
                        </select>
                      </div>
                      <div>
                        <h1 className="text-xl font-semibold">YEAR LEVEL</h1>
                        <select
                          name="yearlevel"
                          id="yearlevel"
                          className="w-2/3 rounded-md border px-3 py-2 text-xl font-medium"
                          value={subjectYear}
                          onChange={(e) => setSubjectYear(e.target.value)}
                        >
                          <option value="" disabled>
                            Year
                          </option>
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
                          value={subjectName}
                          onChange={(e) => setSubjectName(e.target.value)}
                        >
                          <option value="" disabled>
                            Section
                          </option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
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
                    <button className="m-4 w-1/6  bg-green px-6 text-yellow" onClick={addSubject}>
                      SAVE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}{' '}
      </div>
    </div>
  );
}
