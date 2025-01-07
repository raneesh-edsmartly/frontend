// src/components/MCQQuestion.js
import React from 'react';

const MCQQuestion = ({ question, selectedOption, onSelect, result }) => {
  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">{question.question_text}</h3>
      <ul className="space-y-2">
        {question.options.map((option, index) => (
          <li
            key={index}
            onClick={() => onSelect(index)}
            className={`p-3 rounded cursor-pointer ${
              selectedOption === index ? 'bg-blue-100' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {option.text}
          </li>
        ))}
      </ul>
      {result && (
        <div className={`mt-4 p-4 rounded-lg ${
          result.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          <strong>{result.isCorrect ? 'Correct!' : 'Incorrect!'}</strong>
          <p>{result.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default MCQQuestion;