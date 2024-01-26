import Image from 'next/image';
import { useState } from 'react';

export default function GradesCellColumns({
  setTypeNumber,
  setGradeType,
  setScores,
  scores,
  ...score
}) {
  const [scoreType, setScoreType] = useState(score.type);
  const [scoreItems, setScoreItems] = useState(score.items);
  const [scorePercentage, setScorePercentage] = useState(score.percentage);

  const handleTypeChange = (e) => {
    setScoreType(e.target.value);
    updateScore('type', e.target.value);
  };

  const handleItemsChange = (e) => {
    setScoreItems(e.target.value);
    updateScore('items', parseInt(e.target.value, 10));
  };

  const handlePercentageChange = (e) => {
    setScorePercentage(e.target.value);
    updateScore('percentage', e.target.value);
  };

  const updateScore = (key, value) => {
    const updatedScores = scores.map((s) => {
      if (s.colId === score.colId) {
        return {
          ...s,
          [key]: value,
        };
      }
      return s;
    });
    setScores(updatedScores);
  };

  return (
    <>
      <div className="mb-1 flex w-full">
        <input
          type="text"
          name=""
          id=""
          className={`w-1/4 border text-center focus:z-10 focus:font-bold`}
          onChange={handleTypeChange}
          value={scoreType}
        />
        <input
          type="text"
          name=""
          id=""
          className={`w-1/4 border text-center focus:z-10 focus:font-bold`}
          onChange={handleItemsChange}
          value={scoreItems}
        />
        <input
          type="text"
          name=""
          id=""
          className={`w-1/4 border text-center focus:z-10 focus:font-bold`}
          onChange={handlePercentageChange}
          value={scorePercentage}
        />
        <div className="flex w-1/4 items-center justify-center gap-2 border">
          <button
            type="button"
            onClick={() => {
              const updatedScores = scores.filter((s) => {
                return s.colId !== score.colId;
              });
              setScores(updatedScores);
            }}
            className={`${
              scoreType === 'Final' || scoreType === 'Midterm'
                ? 'cursor-not-allowed opacity-50'
                : ''
            } rounded-sm active:scale-95`}
            disabled={scoreType === 'Final' || scoreType === 'Midterm'}
          >
            <Image src="/delete.svg" alt="delete" width={20} height={20} />
          </button>
        </div>
      </div>
    </>
  );
}
