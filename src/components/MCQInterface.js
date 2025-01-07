// src/components/MCQInterface.js
import React from 'react';
import { BookOpen, Brain } from 'lucide-react';

const MCQInterface = ({ 
  mcqs, 
  selectedOptions, 
  setSelectedOptions,
  results,
  loading,
  error,
  isFinished,
  timeRemaining 
}) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const totalQuestions = mcqs.length;
  const progress = totalQuestions > 0 ? (Object.keys(selectedOptions).length / totalQuestions) * 100 : 0;

  // Format remaining time
  const formatTime = (seconds) => {
    if (seconds === null) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      {totalQuestions > 0 && (
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <span className="font-medium">
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
            </div>
            {timeRemaining !== null && (
              <span className="font-medium">
                Time: {formatTime(timeRemaining)}
              </span>
            )}
          </div>
          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Question Display */}
      {mcqs.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Brain className="w-6 h-6 text-purple-500" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-4">
                  {mcqs[currentQuestion]?.question_text}
                </h3>
                <div className="space-y-3">
                  {mcqs[currentQuestion]?.options.map((option, index) => {
                    const optionLabel = `${String.fromCharCode(65 + index)}`; // Generates A:, B:, C:, etc.
                    const isSelected = selectedOptions[mcqs[currentQuestion]?.question_id] === index;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => !isFinished && setSelectedOptions(prev => ({
                          ...prev,
                          [mcqs[currentQuestion].question_id]: index
                        }))}
                        disabled={isFinished}
                        className={`w-full p-4 text-left rounded-lg transition-all
                          ${isSelected 
                            ? 'bg-blue-50 border-blue-500 border-2' 
                            : 'bg-gray-50 border-gray-200 border hover:bg-gray-100'}
                          ${isFinished ? 'cursor-not-allowed' : 'cursor-pointer'}
                          flex items-center space-x-3`}
                      >
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center 
                          rounded-full bg-white border border-gray-200">
                          {optionLabel}
                        </span>
                        <span className="flex-grow">{option.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Results Display */}
                {isFinished && results[mcqs[currentQuestion]?.question_id] && (
                  <div className="mt-4 space-y-3">
                    <div className={`p-4 rounded-lg ${
                      results[mcqs[currentQuestion]?.question_id].isCorrect 
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}>
                      <strong>
                        {results[mcqs[currentQuestion]?.question_id].isCorrect 
                          ? 'Correct!' 
                          : 'Incorrect!'}
                      </strong>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <strong>Correct Answer: </strong>
                      {String.fromCharCode(65 + mcqs[currentQuestion]?.options.findIndex((option) => option.is_correct))}
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <strong>Explanation: </strong>
                      {mcqs[currentQuestion]?.explanation}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      {mcqs.length > 0 && (
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentQuestion(prev => Math.min(totalQuestions - 1, prev + 1))}
            disabled={currentQuestion === totalQuestions - 1}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}
    </div>
  );
};

export default MCQInterface;