import Image from 'next/image';
import { useState } from 'react';
import GradesCellRows from './grades-cell-rows';

export default function CellRows({
  studentId,
  gradeId,
  grades,
  setGradesRow,
  updateStudentGrade,
  setSelectedRow,
  setShowDeleteModal,
  gradesRow,
  initialGradesRow,
  ...info
}) {
  const [studentNumber, setStudentNumber] = useState(info.studentNumber);
  const [studentName, setStudentName] = useState(info.studentName);
  const [grade, setGrade] = useState(info.grade);
  const [unit, setUnit] = useState(info.unit);
  const [status, setStatus] = useState('FAILED');

  const [gradeScoresColumn, setGradeScoresColumn] = useState('');
  return (
    <>
      <div className="mb-1 flex w-full">
        <input
          type="text"
          name=""
          id="student-number"
          className={`w-28 min-w-[10%] border  text-center focus:z-10 focus:font-bold`}
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
        />
        <input
          type="text"
          name=""
          id="student-name"
          className={`w-28 min-w-[10%] border  text-center focus:z-10 focus:font-bold`}
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        {grades.flat().map((col, idx) => (
          <GradesCellRows
            key={idx}
            {...col}
            setGradesRow={setGradesRow}
            info={info}
            gradesRow={gradesRow}
          />
        ))}

        <input
          type="text"
          name=""
          id="grade"
          className={`w-28 min-w-[10%] border  text-center focus:z-10 focus:font-bold`}
          value={grade}
          onChange={(e) => {
            setGrade(e.target.value);
            setStatus(e.target.value > 70 ? 'PASSED' : 'FAILED');
          }}
        />
        <input
          type="text"
          name=""
          id="unit"
          className={`w-28 min-w-[10%] border  text-center focus:z-10 focus:font-bold`}
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <input
          type="text"
          name=""
          id="unit"
          className={`w-28 min-w-[10%] border  text-center focus:z-10 focus:font-bold`}
          value={status}
        />

        <div className="flex w-28 min-w-[10%] items-center justify-center gap-2 border">
          <button
            type="button"
            onClick={() => {
              updateStudentGrade(gradeId, studentId, {
                studentNumber,
                studentName,
                ...initialGradesRow,
                ...gradesRow,
                grade,
                unit,
                status,
              });
            }}
            className={` rounded-sm active:scale-95`}
          >
            <Image src="/save.svg" alt="save" width={20} height={20} />
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedRow(gradeId);
              setShowDeleteModal(true);
            }}
            className={` rounded-sm active:scale-95`}
          >
            <Image src="/delete.svg" alt="delete" width={20} height={20} />
          </button>
        </div>
      </div>
    </>
  );
}
