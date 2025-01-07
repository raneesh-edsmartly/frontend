// src/components/MCQControls.js
import React from 'react';

const MCQControls = ({ onGenerate, onReset, onFinish, loading, isFinished, mcqs }) => {
  return (
    <div className="flex justify-center gap-[2vh] mt-[2vh]">
      {/* Show Generate MCQs button only if no MCQs are generated and not finished */}
      {!loading && mcqs.length === 0 && !isFinished && (
        <button
          onClick={onGenerate}
          disabled={loading}
          className="px-[3vh] py-[1vh] bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-[2vh]"
        >
          Generate MCQs
        </button>
      )}

      {/* Show Finish button only if MCQs are generated and not finished */}
      {!loading && mcqs.length > 0 && !isFinished && (
        <button
          onClick={onFinish}
          className="px-[3vh] py-[1vh] bg-green-600 text-white rounded hover:bg-green-700 text-[2vh]"
        >
          Finish
        </button>
      )}

      {/* Show Reset button only if MCQs are generated or finished */}
      {(mcqs.length > 0 || isFinished) && (
        <button
          onClick={onReset}
          className="px-[3vh] py-[1vh] bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-[2vh]"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default MCQControls;