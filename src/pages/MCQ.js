// src/pages/MCQ.js
import React, { useState, useCallback, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import MCQSettings from '../components/MCQSettings';
import MCQInterface from '../components/MCQInterface';
import MCQControls from '../components/MCQControls';

const MCQPage = () => {
  // State for MCQ data and user interactions
  const [mcqs, setMcqs] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [results, setResults] = useState({});
  
  // State for quiz configuration
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState(10);
  const [difficulty, setDifficulty] = useState(7);
  const [numQuestions, setNumQuestions] = useState(3);
  const [subject, setSubject] = useState('biology');
  const [query, setQuery] = useState('');
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [score, setScore] = useState(0);

  // Calculate and show results
  const handleFinish = useCallback(() => {
    if (Object.keys(selectedOptions).length < mcqs.length) {
      setError('Please answer all questions before finishing.');
      return;
    }

    const newResults = {};
    let totalCorrect = 0;

    mcqs.forEach((mcq) => {
      const selectedIndex = selectedOptions[mcq.question_id];
      const correctIndex = mcq.options.findIndex((option) => option.is_correct);
      const isCorrect = selectedIndex === correctIndex;
      
      if (isCorrect) totalCorrect++;

      newResults[mcq.question_id] = {
        isCorrect,
        explanation: mcq.explanation,
        selectedAnswer: mcq.options[selectedIndex]?.text,
        correctAnswer: mcq.options[correctIndex]?.text,
      };
    });

    setResults(newResults);
    setScore(totalCorrect);
    setIsFinished(true);
    setTimeRemaining(null);
  }, [mcqs, selectedOptions]);

  // Timer functionality
  useEffect(() => {
    let timer;
    if (timeRemaining !== null && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleFinish();
    }
    return () => clearInterval(timer);
  }, [timeRemaining, handleFinish]);

  // Generate MCQs
  const generateMCQs = async () => {
    setLoading(true);
    setError('');
    setIsFinished(false);
    setSelectedOptions({});
    setResults({});
    setScore(0);

    try {
      const response = await fetch('http://localhost:8000/mcq/generate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          grade,
          difficulty,
          num_questions: numQuestions,
          subject,
          query,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate MCQs. Please try again.');
      }

      const data = await response.json();
      
      if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error('No questions were generated. Please try different parameters.');
      }

      setMcqs(data.questions);
      setTimeRemaining(data.questions.length * 120);
      
    } catch (err) {
      setError(err.message);
      console.error('Error generating MCQs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Reset quiz state
  const resetMCQs = useCallback(() => {
    setMcqs([]);
    setSelectedOptions({});
    setResults({});
    setError('');
    setQuery('');
    setIsFinished(false);
    setTimeRemaining(null);
    setScore(0);
  }, []);

  // Format remaining time
  const formatTime = (seconds) => {
    if (seconds === null) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full p-4 bg-gray-50">
      {/* Header */}
      <div className="w-full max-w-4xl mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Socratic MCQ Generator
        </h1>
        {timeRemaining !== null && (
          <div className="mt-4 text-center">
            <span className="font-medium text-lg">
              Time Remaining: {formatTime(timeRemaining)}
            </span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl space-y-6">
        <MCQSettings
          topic={topic}
          setTopic={setTopic}
          grade={grade}
          setGrade={setGrade}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          numQuestions={numQuestions}
          setNumQuestions={setNumQuestions}
          subject={subject}
          setSubject={setSubject}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          query={query}
          setQuery={setQuery}
        />

        {error && (
          <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        <MCQInterface
          mcqs={mcqs}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          results={results}
          loading={loading}
          error={error}
          isFinished={isFinished}
          timeRemaining={timeRemaining}
        />

        <MCQControls
          onGenerate={generateMCQs}
          onReset={resetMCQs}
          onFinish={handleFinish}
          loading={loading}
          isFinished={isFinished}
          mcqs={mcqs}
        />

        {isFinished && Object.keys(results).length > 0 && (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Quiz Summary</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {score}
                </div>
                <div className="text-sm text-green-600">Correct Answers</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {mcqs.length - score}
                </div>
                <div className="text-sm text-red-600">Incorrect Answers</div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg">
                Final Score:{' '}
                <span className="font-bold">
                  {Math.round((score / mcqs.length) * 100)}%
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MCQPage;