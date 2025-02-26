import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (!formData.username.trim()) {
            errors.username = 'Username is required';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Attempt login
        const result = await login(formData.username, formData.password);
        
        if (result.success) {
            navigate('/dashboard'); // Redirect to dashboard on success
        } else {
            setFormErrors({
                submit: result.error || 'Login failed. Please try again.'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
            <div className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${
                            formErrors.username ? 'border-red-500' : ''
                        }`}
                    />
                    {formErrors.username && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.username}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${
                            formErrors.password ? 'border-red-500' : ''
                        }`}
                    />
                    {formErrors.password && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                    )}
                </div>
            </div>

            {formErrors.submit && (
                <div className="text-red-600 text-sm mt-2">{formErrors.submit}</div>
            )}

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#40E0D0] hover:bg-[#00CED1] transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40E0D0] disabled:opacity-50"
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </div>

            <div className="mt-4 text-center text-sm">
                <span className="text-gray-600">Don't have an account? </span>
                <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="text-primary-600 hover:text-primary-500"
                >
                    Register here
                </button>
            </div>
        </form>
    );
};

export default LoginForm;