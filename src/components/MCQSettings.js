import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BiologyImage from '../assets/socratic/biology.jpg';
import ChemistryImage from '../assets/socratic/chemistry.jpg';
import PhysicsImage from '../assets/socratic/physics.jpg';
import MathsImage from '../assets/socratic/maths.jpg';

const subjects = [
  { label: 'Biology', value: 'biology', image: BiologyImage },
  { label: 'Chemistry', value: 'chemistry', image: ChemistryImage },
  { label: 'Physics', value: 'physics', image: PhysicsImage },
  { label: 'Maths', value: 'maths', image: MathsImage },
];

const MCQSettings = ({
  topic,
  setTopic,
  grade,
  setGrade,
  difficulty,
  setDifficulty,
  numQuestions,
  setNumQuestions,
  subject,
  setSubject,
  isExpanded,
  setIsExpanded,
  query,
  setQuery,
}) => {
  const currentSubject = subjects.find((sub) => sub.value === subject);

  return (
    <div className="w-full rounded-lg bg-white shadow-sm border border-gray-200">
      {/* Header/Toggle Section */}
      <button
        className="w-full flex items-center justify-between p-[2vh] hover:bg-gray-50 transition-colors duration-700"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-[2vh]">
          <img
            src={currentSubject?.image}
            alt={currentSubject?.label}
            className="w-[8vh] h-[8vh] rounded-full object-cover"
          />
          <div className="flex items-center gap-[3vh]">
            <span className="font-medium text-[2vh]">{currentSubject?.label}</span>
            <span className="text-gray-600 text-[2vh]">Grade {grade}</span>
            <span className="text-gray-600 text-[2vh]">DoK: {difficulty}/10</span>
          </div>
        </div>
        <div className="flex items-center gap-[1vh]">
          <span className="text-sm text-gray-500 text-[2vh]">
            {isExpanded ? 'Minimize' : 'Expand'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-[3vh] h-[3vh] text-gray-500" />
          ) : (
            <ChevronDown className="w-[3vh] h-[3vh] text-gray-500" />
          )}
        </div>
      </button>

      {/* Expandable Settings Section */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-[2vh] border-t border-gray-200">
          {/* Subject Selection */}
          <div className="mb-[2vh]">
            <h4 className="text-sm font-medium mb-[1vh] text-[2vh]">Select Subject</h4>
            <div className="grid grid-cols-4 gap-[2vh]">
              {subjects.map((sub) => (
                <button
                  key={sub.value}
                  onClick={() => setSubject(sub.value)}
                  className={`group relative rounded-lg overflow-hidden transition-all duration-1000 ${
                    subject === sub.value ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={sub.image}
                    alt={sub.label}
                    className="w-full aspect-square object-cover mb-[1vh] group-hover:opacity-90 transition-opacity"
                  />
                  <span className="block text-center font-medium text-[2vh]">{sub.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Settings Controls */}
          <div className="flex items-center gap-[2vh] mb-[2vh]">
            {/* Grade Level Selection */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-[1vh] text-[2vh]">Grade Level</label>
              <select
                value={grade}
                onChange={(e) => setGrade(parseInt(e.target.value))}
                className="w-full p-[1vh] rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[2vh]"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Grade {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Number of Questions Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-[1vh] text-[2vh]">Number of Questions</label>
              <input
                type="number"
                min="1"
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                className="w-full p-[1vh] rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[2vh]"
              />
            </div>

            {/* Depth of Knowledge Slider */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-[1vh] text-[2vh]">Depth of Knowledge</label>
              <div className="relative w-full h-8">
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1vh] bg-gray-300 rounded-full">
                  <div
                    className="absolute h-full bg-blue-500 rounded-full"
                    style={{ width: `${((difficulty - 1) / 9) * 100}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={difficulty}
                  onChange={(e) => setDifficulty(parseInt(e.target.value))}
                  className="absolute top-1/2 -translate-y-1/2 w-full h-8 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md"
                />
              </div>
              <div className="text-center mt-[1vh] text-[2vh]">{difficulty}/10</div>
            </div>
          </div>

          {/* Query Input */}
          <div className="mb-[2vh]">
            <label className="block text-sm font-medium mb-[1vh] text-[2vh]">Your Query</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Knowledge begins with a question . . . "
              className="w-full p-[1vh] rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[2vh]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQSettings;