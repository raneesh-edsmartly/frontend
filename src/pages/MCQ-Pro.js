import React, { useState, useCallback } from 'react';
import { AlertTriangle } from 'lucide-react';
import MCQSettings from '../components/MCQSettings';
import MCQInterface from '../components/MCQInterface';
import MCQControls from '../components/MCQControls';

const MCQPage = () => {
  // State for MCQ data and user interactions
  const [mcqs, setMcqs] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [results, setResults] = useState({});
  
  // Session management state
  const [sessionId, setSessionId] = useState(null);
  
  // State for quiz configuration
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState(12);
  const [difficulty, setDifficulty] = useState(7);
  const [numQuestions, setNumQuestions] = useState(2);
  const [subject, setSubject] = useState('biology');
  const [query, setQuery] = useState('');
  const [bloomsLevel, setBloomsLevel] = useState(4);
  const [webbsDOK, setWebbsDOK] = useState(3);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [generationMessage, setGenerationMessage] = useState('');

  const handleFinish = useCallback(async () => {
    const allQuestionsAnswered = mcqs.every((mcq) => 
      selectedOptions.hasOwnProperty(mcq.question_id || mcq._id)
    );
  
    if (!allQuestionsAnswered) {
      setError('Please answer all questions before finishing.');
      return;
    }
  
    const newResults = {};
    let totalCorrect = 0;
  
    mcqs.forEach((mcq) => {
      const questionId = mcq.question_id || mcq._id;
      const selectedIndex = selectedOptions[questionId];
      const correctIndex = mcq.options.findIndex((option) => option.is_correct);
      const isCorrect = selectedIndex === correctIndex;
      
      if (isCorrect) totalCorrect++;
  
      newResults[questionId] = {
        isCorrect,
        explanation: mcq.explanation,
        selectedAnswer: mcq.options[selectedIndex]?.text,
        correctAnswer: mcq.options[correctIndex]?.text,
      };
    });
  
    try {
      // Save session results if we have a sessionId
      if (sessionId) {
        await fetch(`${process.env.REACT_APP_API_URL}/mcq-new/save-results`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            results: newResults,
            score: totalCorrect,
            totalQuestions: mcqs.length,
          }),
        });
      }
    } catch (err) {
      console.error('Error saving session results:', err);
      // Continue with local results even if saving fails
    }
  
    setResults(newResults);
    setScore(totalCorrect);
    setIsFinished(true);
  }, [mcqs, selectedOptions, sessionId]);

  const generateMCQs = async () => {
    setLoading(true);
    setError('');
    setIsFinished(false);
    setSelectedOptions({});
    setResults({});
    setScore(0);
    setGenerationMessage('');
    setSessionId(null);
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/mcq-new/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          grade,
          difficulty,
          num_questions: numQuestions,
          blooms_level: bloomsLevel,
          webbs_dok: webbsDOK,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Please try Generate MCQ again. This is a server error.');
      }
  
      const data = await response.json();
      
      if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error('No questions were generated. Please try different parameters.');
      }

      if (data.session_id) {
        setSessionId(data.session_id);
      }
      
      const mappedQuestions = data.questions.map((question, index) => ({
        ...question,
        question_id: question._id || question.question_id || `q${index}`,
      }));
  
      setMcqs(mappedQuestions);
      
      if (data.metadata?.completion_status) {
        setGenerationMessage('Questions generated successfully');
      }
      
    } catch (err) {
      setError(err.message);
      console.error('Error generating MCQs:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetMCQs = useCallback(() => {
    setMcqs([]);
    setSelectedOptions({});
    setResults({});
    setError('');
    setQuery('');
    setIsFinished(false);
    setScore(0);
    setGenerationMessage('');
    setSessionId(null);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full p-4 bg-gray-50">
      {/* Header */}
      <div className="w-full max-w-4xl mb-8">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Socratic Quiz Studio
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl space-y-6">
        {/* Settings Panel */}
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
          bloomsLevel={bloomsLevel}
          setBloomsLevel={setBloomsLevel}
          webbsDOK={webbsDOK}
          setWebbsDOK={setWebbsDOK}
        />

        {/* Generation Message */}
        {generationMessage && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
            <span className="text-blue-700">{generationMessage}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* MCQ Interface */}
        <MCQInterface
          mcqs={mcqs}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          results={results}
          loading={loading}
          error={error}
          isFinished={isFinished}
        />

        {/* Controls */}
        <MCQControls
          onGenerate={generateMCQs}
          onReset={resetMCQs}
          onFinish={handleFinish}
          loading={loading}
          isFinished={isFinished}
          mcqs={mcqs}
        />

        {/* Session ID Display */}
        {sessionId && (
          <div className="mt-2 text-center">
            <span className="text-sm text-gray-500">Session ID: {sessionId}</span>
          </div>
        )}

        {/* Results Summary */}
        {isFinished && Object.keys(results).length > 0 && (
          <div className="p-4 bg-white rounded border border-gray-200">
            <h2 className="text-xl font-semibold mb-3">Quiz Summary</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-green-50 rounded">
                <div className="text-xl font-semibold text-green-600">
                  {score}
                </div>
                <div className="text-sm text-green-600">Correct Answers</div>
              </div>
              <div className="p-3 bg-red-50 rounded">
                <div className="text-xl font-semibold text-red-600">
                  {mcqs.length - score}
                </div>
                <div className="text-sm text-red-600">Incorrect Answers</div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-base">
                Final Score:{' '}
                <span className="font-semibold">
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