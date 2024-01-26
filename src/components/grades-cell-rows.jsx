import { useState } from 'react';

export default function GradesCellRows({ setGradesRow, info, ...col }) {
  const [gradesCol, setGradesCol] = useState(info[col.type.toLowerCase()]);
  return (
    <>
      <input
        type="text"
        name={`${col.type.toLowerCase()}`}
        id=""
        className={`w-28 min-w-[10%] border  text-center focus:z-10 focus:font-bold`}
        onChange={(event) => {
          const { name, value } = event.target;
          setGradesRow((prevValues) => ({
            ...prevValues,
            [name]: value,
          }));
          setGradesCol(value);
        }}
        value={gradesCol}
      />
    </>
  );
}
