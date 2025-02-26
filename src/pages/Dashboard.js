import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileUpdateForm from '../components/profile/ProfileUpdateForm';
import ProfilePic from '../assets/profile.jpg';

const API_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfileData = useCallback(async () => {
    if (!user?.username) return;

    setLoading(true);
    setError(null);

    try {
      const profileResponse = await fetch(
        `${API_URL}/user/profile?username=${user.username}`
      );
      if (!profileResponse.ok) throw new Error('Failed to fetch profile data');
      const data = await profileResponse.json();
      setProfileData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching profile data:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.username]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  // eslint-disable-next-line
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Example profile update logic
      const response = await fetch(`${API_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          name: profileData.name,
          grade: profileData.grade,
          subjects: profileData.subjects,
          curriculum: profileData.curriculum,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      setProfileData(updatedData);

      // Navigate back to the dashboard after successful update
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  // Only show loading spinner if we don't have user data at all
  if (loading && !user?.username) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">
          An error occurred: {error}
          <button 
            onClick={() => window.location.reload()} 
            className="ml-4 bg-[#40E0D0] text-black px-4 py-2 rounded hover:bg-[#00CED1] transition-colors duration-500"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        {!isEditing ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <img 
                  src={ProfilePic} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h2 className="text-2xl font-bold">{profileData?.name || user?.username || 'User'}</h2>
                  <p className="text-gray-600">{profileData?.grade || 'Grade not set'}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-[#40E0D0] text-black px-4 py-2 rounded-lg hover:bg-[#00CED1] transition-colors duration-500"
              >
                Manage Profile
              </button>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">
                <strong>Subjects:</strong> {profileData?.subjects?.join(', ') || 'No subjects selected'}
              </p>
              <p className="text-gray-600">
                <strong>Curriculum:</strong> {profileData?.curriculum || 'Not specified'}
              </p>
            </div>
          </>
        ) : (
          <ProfileUpdateForm 
            initialData={profileData}
            onCancel={() => setIsEditing(false)}
            onSuccess={() => {
              setIsEditing(false);
              fetchProfileData(); // Refresh profile data
            }}
          />
        )}
      </section>
    </div>
  );
};

export default Dashboard;