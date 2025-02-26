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

// Mapping for Bloom's Taxonomy levels
const bloomsLevels = {
  1: 'Remember',
  2: 'Understand',
  3: 'Apply',
  4: 'Analyze',
  5: 'Evaluate',
  6: 'Create',
};

// Mapping for Webb's DOK levels
const webbsDOKLevels = {
  1: 'Recall',
  2: 'Skills',
  3: 'Strategic Thinking',
  4: 'Extended Thinking',
};

// Function to calculate the gradient color based on the slider value
const getSliderColor = (value, min, max) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Convert hex colors to RGB
  const startColor = {
    r: parseInt('24', 16), // From #2481f8
    g: parseInt('81', 16),
    b: parseInt('f8', 16)
  };
  
  const endColor = {
    r: parseInt('04', 16), // From #044ead
    g: parseInt('4e', 16),
    b: parseInt('ad', 16)
  };
  
  // Calculate the interpolated RGB values
  const red = Math.round(startColor.r + (endColor.r - startColor.r) * (percentage / 100));
  const green = Math.round(startColor.g + (endColor.g - startColor.g) * (percentage / 100));
  const blue = Math.round(startColor.b + (endColor.b - startColor.b) * (percentage / 100));
  
  return `rgb(${red}, ${green}, ${blue})`;
};

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
  bloomsLevel,
  setBloomsLevel,
  webbsDOK,
  setWebbsDOK,
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
            <span className="text-gray-600 text-[2vh]">Depth of Knowledge: {difficulty}/10</span>
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
          <div className="flex flex-col gap-[2vh] mb-[2vh]">
            {/* First Row: Bloom's Taxonomy, Webb's DOK, and Difficulty Level */}
            <div className="flex gap-[2vh]">
              {/* Bloom's Taxonomy Slider */}
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-[1vh]">
                  <label className="text-sm font-medium text-[2vh]">Bloom's Taxonomy Level:</label>
                  <span className="text-sm text-gray-600 text-[2vh]">
                    {bloomsLevels[bloomsLevel]}
                  </span>
                </div>
                <div className="relative w-full h-8">
                  <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1vh] bg-gray-300 rounded-full">
                    <div
                      className="absolute h-full rounded-full"
                      style={{
                        width: `${((bloomsLevel - 1) / 5) * 100}%`,
                        backgroundColor: getSliderColor(bloomsLevel, 1, 6),
                      }}
                    />
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={bloomsLevel}
                    onChange={(e) => setBloomsLevel(parseInt(e.target.value))}
                    className="absolute top-1/2 -translate-y-1/2 w-full h-8 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md"
                  />
                </div>
              </div>

              {/* Webb's DOK Slider */}
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-[1vh]">
                  <label className="text-sm font-medium text-[2vh]">Webb's DoK Level:</label>
                  <span className="text-sm text-gray-600 text-[2vh]">
                    {webbsDOKLevels[webbsDOK]}
                  </span>
                </div>
                <div className="relative w-full h-8">
                  <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1vh] bg-gray-300 rounded-full">
                    <div
                      className="absolute h-full rounded-full"
                      style={{
                        width: `${((webbsDOK - 1) / 3) * 100}%`,
                        backgroundColor: getSliderColor(webbsDOK, 1, 4),
                      }}
                    />
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={webbsDOK}
                    onChange={(e) => setWebbsDOK(parseInt(e.target.value))}
                    className="absolute top-1/2 -translate-y-1/2 w-full h-8 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md"
                  />
                </div>
              </div>

              {/* Difficulty Level Slider */}
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-[1vh]">
                  <label className="text-sm font-medium text-[2vh]">Depth of Knowledge:</label>
                  <span className="text-sm text-gray-600 text-[2vh]">{difficulty}/10</span>
                </div>
                <div className="relative w-full h-8">
                  <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1vh] bg-gray-300 rounded-full">
                    <div
                      className="absolute h-full rounded-full"
                      style={{
                        width: `${((difficulty - 1) / 9) * 100}%`,
                        backgroundColor: getSliderColor(difficulty, 1, 10),
                      }}
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
              </div>
            </div>

            {/* Second Row: Grade Level and Number of Questions */}
            <div className="flex gap-[2vh]">
              {/* Grade Level Slider */}
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-[1vh]">
                  <label className="text-sm font-medium text-[2vh]">Grade Level:</label>
                  <span className="text-sm text-gray-600 text-[2vh]">{grade}</span>
                </div>
                <div className="relative w-full h-8">
                  <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1vh] bg-gray-300 rounded-full">
                    <div
                      className="absolute h-full rounded-full"
                      style={{
                        width: `${((grade - 1) / 11) * 100}%`,
                        backgroundColor: getSliderColor(grade, 1, 12),
                      }}
                    />
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={grade}
                    onChange={(e) => setGrade(parseInt(e.target.value))}
                    className="absolute top-1/2 -translate-y-1/2 w-full h-8 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md"
                  />
                </div>
              </div>

              {/* Number of Questions Slider */}
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-[1vh]">
                  <label className="text-sm font-medium text-[2vh]">Number of Questions:</label>
                  <span className="text-sm text-gray-600 text-[2vh]">{numQuestions}</span>
                </div>
                <div className="relative w-full h-8">
                  <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1vh] bg-gray-300 rounded-full">
                    <div
                      className="absolute h-full rounded-full"
                      style={{
                        width: `${((numQuestions - 1) / 19) * 100}%`,
                        backgroundColor: getSliderColor(numQuestions, 1, 20),
                      }}
                    />
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                    className="absolute top-1/2 -translate-y-1/2 w-full h-8 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Query Input */}
          <div className="mb-[2vh]">
            <label className="block text-sm font-medium mb-[1vh] text-[2vh]"></label>
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