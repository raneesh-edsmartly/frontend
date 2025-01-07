import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const LearningSettings = ({
  subjects,
  selectedSubject,
  onSubjectSelect,
  grade,
  onGradeChange,
  difficulty,
  onDifficultyChange,
  defaultExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const currentSubject = subjects.find(sub => sub.value === selectedSubject);

  return (
    <div className="w-full mb-8 rounded-lg bg-white shadow-sm border border-gray-200">
      <button 
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <img 
            src={currentSubject?.image} 
            alt={currentSubject?.label} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex items-center gap-6">
            <span className="font-medium">{currentSubject?.label}</span>
            <span className="text-gray-600">Grade {grade}</span>
            <span className="text-gray-600">Depth of Knowledge: {difficulty}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {isExpanded ? 'Minimize' : 'Expand'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </button>

      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-6 border-t border-gray-200">
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-4">Select Subject</h3>
            <div className="grid grid-cols-4 gap-8">
              {subjects.map((sub) => (
                <button
                  key={sub.value}
                  onClick={() => onSubjectSelect(sub.value)}
                  className={`group relative rounded-lg overflow-hidden transition-all duration-200 ${
                    selectedSubject === sub.value ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={sub.image}
                    alt={sub.label}
                    className="w-full aspect-square object-cover mb-2 group-hover:opacity-90 transition-opacity"
                  />
                  <span className="block text-center font-medium">{sub.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium mb-2">Grade Level</label>
              <select
                value={grade}
                onChange={(e) => onGradeChange(e.target.value)}
                className="w-full p-2 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 12 }, (_, i) => 12 - i).map((gradeValue) => (
                  <option key={gradeValue} value={gradeValue}>
                    Grade {gradeValue}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Depth of Knowledge</label>
              <div className="relative w-full h-2">
                <div className="absolute w-full h-full bg-gray-300 rounded-full" />
                <div 
                  className="absolute h-full bg-blue-500 rounded-full"
                  style={{ width: `${(difficulty / 10) * 100}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={difficulty}
                  onChange={(e) => onDifficultyChange(e.target.value)}
                  className="absolute w-full h-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md"
                />
              </div>
              <div className="text-center mt-2">{difficulty}/10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningSettings;