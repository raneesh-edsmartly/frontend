import React, { useState } from 'react';
import BiologyImage from '../assets/socratic/biology.jpg';
import ChemistryImage from '../assets/socratic/chemistry.jpg';
import PhysicsImage from '../assets/socratic/physics.jpg';
import MathsImage from '../assets/socratic/maths.jpg';
import LearningSettings from '../components/LearningSettings';
import ChatInterface from '../components/ChatInterface';

const SocraticChat = () => {
  const [sessionId, setSessionId] = useState(localStorage.getItem('session_id') || null);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [grade, setGrade] = useState(10);
  const [difficulty, setDifficulty] = useState(7);
  const [subject, setSubject] = useState('biology');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const subjects = [
    { label: 'Biology', value: 'biology', image: BiologyImage },
    { label: 'Chemistry', value: 'chemistry', image: ChemistryImage },
    { label: 'Physics', value: 'physics', image: PhysicsImage },
    { label: 'Maths', value: 'maths', image: MathsImage },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        sessionId 
          ? `http://localhost:8000/chat/chat/${sessionId}/follow-up`
          : 'http://localhost:8000/chat/chat/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: userInput,
            grade: parseInt(grade),
            difficulty: parseInt(difficulty),
            subject: subject,
            ...(sessionId && { session_id: sessionId }),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send message');
      }

      const data = await response.json();

      if (!sessionId && data.session_id) {
        setSessionId(data.session_id);
        localStorage.setItem('session_id', data.session_id);
      }

      setChatHistory(prev => [
        ...prev,
        { sender: 'user', message: userInput },
        { sender: 'ai', message: data.response },
      ]);
      setUserInput('');
    } catch (err) {
      setError(err.message || 'Request failed');
      if (err.message?.includes('authentication')) {
        localStorage.removeItem('session_id');
        setSessionId(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const finishSession = () => {
    localStorage.removeItem('session_id');
    setSessionId(null);
    setChatHistory([]);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 relative">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Socratic Learning Machine</h1>
        <div className="space-y-6">
          <LearningSettings
            subjects={subjects}
            selectedSubject={subject}
            onSubjectSelect={setSubject}
            grade={grade}
            onGradeChange={setGrade}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            defaultExpanded={false}
          />
          <ChatInterface
            chatHistory={chatHistory}
            userInput={userInput}
            setUserInput={setUserInput}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </div>
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <div className="mt-8 p-4 rounded-lg text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">Session ID: {sessionId || 'No session'}</span>
            <button
              onClick={finishSession}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-white rounded-md text-sm transition-colors"
            >
              Finish Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocraticChat;