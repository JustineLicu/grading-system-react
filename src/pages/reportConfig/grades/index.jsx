import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CellRows from '../../../components/cell-rows';

const host = 'http://localhost:8080';

export default function ClassesPage() {
  const router = useRouter();
  const { sectionId, subjectId } = router.query;
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [gradeColumns, setGradeColumns] = useState([]);

  // Fetch gradeColumns
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
      setGradeColumns(sectionData);
    } catch (error) {
      console.error('Error fetching current section:', error.message);
    }
  };

  useEffect(() => {
    if (subjectId) {
      fetchSection();
    }
  }, [subjectId]);

  const [studentGrades, setStudentGrades] = useState([]);
  // Fetch Grades
  const fetchGrades = async () => {
    try {
      const gradesResponse = await fetch(`${host}/grades?sectionId=${sectionId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const gradesData = await gradesResponse.json();
      setStudentGrades(gradesData);
    } catch (error) {
      console.error('Error fetching current grades:', error.message);
    }
  };

  useEffect(() => {
    if (subjectId) {
      fetchGrades();
    }
  }, [subjectId]);

  const generateRandomId = () => {
    return Date.now() + Math.floor(Math.random() * 1000).toString();
  };
  const newId = generateRandomId();

  const grades = gradeColumns
    .filter((grades) => grades.id === +sectionId)
    .map((col, idx) => {
      return JSON.parse(col.gradeColumns);
    });

  const initialGradesRow = grades.flat().reduce((acc, col) => {
    acc[col.type.toLowerCase()] = '';
    return acc;
  }, {});

  const [gradesRow, setGradesRow] = useState({});
  console.log(gradesRow);
  // Adding a student
  const addStudent = async () => {
    try {
      const response = await fetch(`${host}/grades`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gradeRows: JSON.stringify([
            {
              studentNumber: `${newId
                .toString()
                .slice(newId.toString().length - 4, newId.toString().length)}`,
              studentName: '',
              ...initialGradesRow,
              ...gradesRow,
              grade: 0,
              unit: 0,
              status: 'FAILED',
            },
          ]),
          attendances: '[]',
          sectionId: +sectionId,
          studentId: 1,
        }),
      });

      if (response.ok) {
        alert('Grades added successfully');
        router.reload();
      } else {
        alert(`Error adding grades: ${response.statusText}`);
      }
    } catch (error) {
      alert(`Error adding student: ${error}`);
    }
  };

  // Updating a student grade
  const updateStudentGrade = async (id, studentId, updateGrades) => {
    try {
      const response = await fetch(`${host}/grades/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gradeRows: JSON.stringify([updateGrades]),
          attendances: '[]',
          studentId: studentId,
        }),
      });

      if (response.ok) {
        alert('Grades updated successfully');
      } else {
        alert(`Error updating grades: ${response.statusText}`);
      }
    } catch (error) {
      alert(`Error updating student: ${error}`);
    }
  };

  // Deleting a student grade
  const deleteStudentGrade = async (gradeId) => {
    try {
      const response = await fetch(`${host}/grades/${gradeId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setShowDeleteModal(false);
        alert('Grades deleted successfully');
      } else {
        alert(`Error deleting grades: ${response.statusText}`);
      }
    } catch (error) {
      alert(`Error deleting student: ${error}`);
    }
  };
  return (
    <>
      <Head>
        <title>Grade Configuration | Grading System</title>
      </Head>

      <NavBar />
      <main className="flex">
        <SideBarMenu />
        <div className="flex w-full items-center justify-center p-4">
          <div className="relative min-h-[80vh] max-w-[90vw] border border-gray shadow-md">
            <div className="flex items-center justify-center border border-green bg-green py-3 ">
              <h2 className="text-2xl font-bold text-white">{subjectId}</h2>
            </div>
            <div className="overflow-auto p-8">
              <div className="flex">
                <div className="w-28 min-w-[10%] border p-2 text-center">Student #</div>
                <div className="w-28 min-w-[10%] border p-2 text-center">Student Name</div>
                {grades.flat().map((col, idx) => (
                  <div key={idx} className="w-28 min-w-[10%] border p-2 text-center">
                    {col.type}
                  </div>
                ))}
                <div className="w-28 min-w-[10%] border p-2 text-center">Grade</div>
                <div className="w-28 min-w-[10%] border p-2 text-center">Unit</div>
                <div className="w-28 min-w-[10%] border p-2 text-center">Status</div>
                <div className="w-28 min-w-[10%] border p-2 text-center">Action</div>
              </div>

              {studentGrades.map((gradeInfo, idx) => {
                const studentInfos = JSON.parse(gradeInfo.gradeRows);
                return studentInfos
                  .flat()
                  .map((info, innerIdx) => (
                    <CellRows
                      {...info}
                      gradeId={gradeInfo.id}
                      studentId={gradeInfo.studentId}
                      grades={grades}
                      setGradesRow={setGradesRow}
                      setSelectedRow={setSelectedRow}
                      setShowDeleteModal={setShowDeleteModal}
                      updateStudentGrade={updateStudentGrade}
                      gradesRow={gradesRow}
                      initialGradesRow={initialGradesRow}
                      key={innerIdx}
                    />
                  ));
              })}
            </div>
            <div className="absolute bottom-6 right-4 flex gap-2">
              <button
                type="button"
                onClick={() => router.push(`/reportConfig/${subjectId}/sections/${sectionId}/edit`)}
                className={` border border-gray px-6 py-2 text-lg font-semibold  active:scale-95`}
              >
                Edit Grades
              </button>
              <button
                type="button"
                onClick={() => addStudent()}
                className={` border border-gray px-6 py-2 text-lg font-semibold  active:scale-95`}
              >
                Add student
              </button>
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
              onClick={() => deleteStudentGrade(selectedRow)}
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
