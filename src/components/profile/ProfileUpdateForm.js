import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const ProfileUpdateForm = ({ initialData, onCancel, onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialData);

  const availableSubjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'English',
    'History',
    'Geography'
  ];

  const availableGrades = [
    '6th Grade',
    '7th Grade',
    '8th Grade',
    '9th Grade',
    '10th Grade',
    '11th Grade',
    '12th Grade'
  ];

  const availableCurriculums = [
    'CBSE',
    'ICSE',
    'State Board',
    'International'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectChange = (subject) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const profileResponse = await fetch(
        `${API_URL}/user/update?username=${user.username}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            grade: formData.grade,
            subjects: formData.subjects
          }),
        }
      );

      if (!profileResponse.ok) {
        throw new Error('Failed to update profile');
      }

      const curriculumResponse = await fetch(
        `${API_URL}/user/update-curriculum?username=${user.username}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            curriculum: formData.curriculum
          }),
        }
      );

      if (!curriculumResponse.ok) {
        throw new Error('Failed to update curriculum');
      }

      // Call the onSuccess callback to handle navigation and refresh
      onSuccess();
    } catch (err) {
      setError(err.message);
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
          Grade Level
        </label>
        <select
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">Select Grade</option>
          {availableGrades.map(grade => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subjects
        </label>
        <div className="grid grid-cols-2 gap-4">
          {availableSubjects.map(subject => (
            <label key={subject} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.subjects.includes(subject)}
                onChange={() => handleSubjectChange(subject)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2">{subject}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="curriculum" className="block text-sm font-medium text-gray-700">
          Curriculum
        </label>
        <select
          id="curriculum"
          name="curriculum"
          value={formData.curriculum}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">Select Curriculum</option>
          {availableCurriculums.map(curriculum => (
            <option key={curriculum} value={curriculum}>{curriculum}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#40E0D0] hover:bg-[#00CED1] transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40E0D0] disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default ProfileUpdateForm;