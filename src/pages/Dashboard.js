// src/pages/Dashboard.js
import React from 'react';
import ProfilePic from '../assets/profile.jpg'; // Import the profile picture

const Dashboard = () => {
  // Dummy data for demonstration
  const userProfile = {
    name: 'John Doe',
    grade: '10th Grade',
    profilePic: ProfilePic, // Use the imported image
    subjects: ['Biology', 'Maths', 'Chemistry'],
    difficulty: 'Intermediate',
  };

  const learningProgress = {
    completedTopics: 15,
    totalTopics: 30,
    strengths: ['Biology', 'Chemistry'],
    weaknesses: ['Physics'],
    achievements: ['Top 10% in Biology', 'MCQ Master', 'Socratic Scholar'],
  };

  const recentChats = [
    { id: 1, topic: 'Photosynthesis', date: '2023-10-01' },
    { id: 2, topic: 'Quadratic Equations', date: '2023-10-05' },
    { id: 3, topic: 'Chemical Reactions', date: '2023-10-10' },
  ];

  const mcqPerformance = {
    totalAttempts: 50,
    averageScore: 85,
    subjectWise: {
      Biology: 90,
      Maths: 80,
      Chemistry: 75,
      Physics: 65,
    },
  };

  const upcomingTasks = [
    { id: 1, task: 'Complete Biology Quiz', dueDate: '2023-10-15' },
    { id: 2, task: 'Revise Chemistry Chapter 3', dueDate: '2023-10-20' },
    { id: 3, task: 'Practice Maths Problems', dueDate: '2023-10-25' },
  ];

  const notifications = [
    { id: 1, message: 'New MCQ test available for Biology', date: '2023-10-10' },
    { id: 2, message: 'Your subscription renews in 7 days', date: '2023-10-12' },
    { id: 3, message: 'You earned a new achievement: Socratic Scholar', date: '2023-10-14' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* User Profile Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center space-x-4">
          <img src={userProfile.profilePic} alt="Profile" className="w-16 h-16 rounded-full" />
          <div>
            <h2 className="text-2xl font-bold">{userProfile.name}</h2>
            <p className="text-gray-600">{userProfile.grade}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-600"><strong>Subjects:</strong> {userProfile.subjects.join(', ')}</p>
          <p className="text-gray-600"><strong>Difficulty Level:</strong> {userProfile.difficulty}</p>
        </div>
      </section>

      {/* Learning Progress Overview */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Learning Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Completed Topics</h3>
            <p className="text-2xl font-bold">{learningProgress.completedTopics}/{learningProgress.totalTopics}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Strengths</h3>
            <p className="text-gray-600">{learningProgress.strengths.join(', ')}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Weaknesses</h3>
            <p className="text-gray-600">{learningProgress.weaknesses.join(', ')}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Achievements</h3>
          <div className="flex flex-wrap gap-2">
            {learningProgress.achievements.map((achievement, index) => (
              <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                {achievement}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Socratic Chat Integration */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Recent Chat Sessions</h2>
        <div className="space-y-4">
          {recentChats.map((chat) => (
            <div key={chat.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold">{chat.topic}</h3>
                <p className="text-gray-600">{chat.date}</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Resume Chat
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* MCQ Performance Analytics */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">MCQ Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Total Attempts</h3>
            <p className="text-2xl font-bold">{mcqPerformance.totalAttempts}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Average Score</h3>
            <p className="text-2xl font-bold">{mcqPerformance.averageScore}%</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Subject-wise Performance</h3>
            <ul>
              {Object.entries(mcqPerformance.subjectWise).map(([subject, score]) => (
                <li key={subject} className="text-gray-600">{subject}: {score}%</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Upcoming Tasks and Recommendations */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Upcoming Tasks</h2>
        <div className="space-y-4">
          {upcomingTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold">{task.task}</h3>
                <p className="text-gray-600">Due: {task.dueDate}</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Start Task
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Notifications and Alerts */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">{notification.message}</p>
              <p className="text-sm text-gray-500">{notification.date}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;