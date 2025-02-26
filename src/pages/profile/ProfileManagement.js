import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProfileForm from '../../components/auth/ProfileForm';

const ProfileManagement = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showPasswordChange, setShowPasswordChange] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    {/* Profile Header */}
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Profile Settings
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Manage your account information and preferences
                            </p>
                        </div>

                        {/* Navigation Menu */}
                        <div className="mt-6 px-4 sm:px-0">
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setShowPasswordChange(false)}
                                    className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                                        !showPasswordChange 
                                            ? 'bg-primary-50 text-primary-700' 
                                            : 'text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    Profile Information
                                </button>
                                <button
                                    onClick={() => setShowPasswordChange(true)}
                                    className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                                        showPasswordChange 
                                            ? 'bg-primary-50 text-primary-700' 
                                            : 'text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    Change Password
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 rounded-md"
                                >
                                    Sign Out
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="bg-white shadow sm:rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                {!showPasswordChange ? (
                                    <>
                                        <h4 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                            Your Profile
                                        </h4>
                                        <ProfileForm isInitialSetup={false} />
                                    </>
                                ) : (
                                    <>
                                        <h4 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                            Change Password
                                        </h4>
                                        <PasswordChangeForm />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Password Change Form Component
const PasswordChangeForm = () => {
    const { changePassword, user, loading } = useAuth();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!formData.oldPassword) {
            errors.oldPassword = 'Current password is required';
        }
        if (!formData.newPassword) {
            errors.newPassword = 'New password is required';
        } else if (formData.newPassword.length < 6) {
            errors.newPassword = 'Password must be at least 6 characters long';
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your new password';
        } else if (formData.newPassword !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const result = await changePassword(
            user.username,
            formData.oldPassword,
            formData.newPassword
        );

        if (result.success) {
            setFormData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            alert('Password updated successfully');
        } else {
            setFormErrors({
                submit: result.error || 'Failed to update password. Please try again.'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                    Current Password
                </label>
                <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${
                        formErrors.oldPassword ? 'border-red-500' : ''
                    }`}
                />
                {formErrors.oldPassword && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.oldPassword}</p>
                )}
            </div>

            <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                </label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${
                        formErrors.newPassword ? 'border-red-500' : ''
                    }`}
                />
                {formErrors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.newPassword}</p>
                )}
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${
                        formErrors.confirmPassword ? 'border-red-500' : ''
                    }`}
                />
                {formErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
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
                    {loading ? 'Updating Password...' : 'Update Password'}
                </button>
            </div>
        </form>
    );
};

export default ProfileManagement;