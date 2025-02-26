import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProfileForm = ({ isInitialSetup = false }) => {
    const { user, updateProfile, loading } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        grade: '',
        subjects: [],
        curriculum: ''
    });

    const [formErrors, setFormErrors] = useState({});

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

    useEffect(() => {
        if (user && !isInitialSetup) {
            setFormData({
                name: user.name || '',
                grade: user.grade || '',
                subjects: user.subjects || [],
                curriculum: user.curriculum || ''
            });
        }
    }, [user, isInitialSetup]);

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!formData.grade) {
            errors.grade = 'Grade is required';
        }
        if (formData.subjects.length === 0) {
            errors.subjects = 'Please select at least one subject';
        }
        if (!formData.curriculum) {
            errors.curriculum = 'Curriculum is required';
        }
        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubjectChange = (subject) => {
        setFormData(prev => ({
            ...prev,
            subjects: prev.subjects.includes(subject)
                ? prev.subjects.filter(s => s !== subject)
                : [...prev.subjects, subject]
        }));
        if (formErrors.subjects) {
            setFormErrors(prev => ({
                ...prev,
                subjects: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const result = await updateProfile(user.username, formData);
        
        if (result.success) {
            navigate(isInitialSetup ? '/dashboard' : '/profile');
        } else {
            setFormErrors({
                submit: result.error || 'Profile update failed. Please try again.'
            });
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
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${
                        formErrors.name ? 'border-red-500' : ''
                    }`}
                />
                {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
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
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${
                        formErrors.grade ? 'border-red-500' : ''
                    }`}
                >
                    <option value="">Select Grade</option>
                    {availableGrades.map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                    ))}
                </select>
                {formErrors.grade && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.grade}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Subjects
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                    {availableSubjects.map(subject => (
                        <label key={subject} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.subjects.includes(subject)}
                                onChange={() => handleSubjectChange(subject)}
                                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{subject}</span>
                        </label>
                    ))}
                </div>
                {formErrors.subjects && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.subjects}</p>
                )}
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
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${
                        formErrors.curriculum ? 'border-red-500' : ''
                    }`}
                >
                    <option value="">Select Curriculum</option>
                    {availableCurriculums.map(curriculum => (
                        <option key={curriculum} value={curriculum}>{curriculum}</option>
                    ))}
                </select>
                {formErrors.curriculum && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.curriculum}</p>
                )}
            </div>

            {formErrors.submit && (
                <div className="text-red-600 text-sm">{formErrors.submit}</div>
            )}

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                    {loading ? 'Saving...' : (isInitialSetup ? 'Complete Setup' : 'Save Changes')}
                </button>
            </div>
        </form>
    );
};

export default ProfileForm;