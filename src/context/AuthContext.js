import { createContext, useContext, useState, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext(null);

// API endpoint constants
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const AUTH_ENDPOINTS = {
    LOGIN: `${API_URL}/auth/login/`,
    REGISTER: `${API_URL}/auth/register/`,
    CHANGE_PASSWORD: `${API_URL}/auth/change-password/`,
    PROFILE: `${API_URL}/user/profile`,
    UPDATE_PROFILE: `${API_URL}/user/update`,
    UPDATE_SUBJECTS: `${API_URL}/user/update-subjects`,
    UPDATE_CURRICULUM: `${API_URL}/user/update-curriculum`,
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check for existing session on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Login function
    const login = async (username, password) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed');
            }

            // Get user profile after successful login
            const profileResponse = await fetch(
                `${AUTH_ENDPOINTS.PROFILE}?username=${username}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!profileResponse.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const profileData = await profileResponse.json();
            const userData = {
                username,
                ...profileData,
            };

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true };

        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Register function
    const register = async (username, password) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Registration failed');
            }

            // Automatically log in after successful registration
            return await login(username, password);

        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Update profile function
    const updateProfile = async (username, profileData) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${AUTH_ENDPOINTS.UPDATE_PROFILE}?username=${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Profile update failed');
            }

            // Update local user data
            const updatedUser = { ...user, ...profileData };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return { success: true };

        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Change password function
    const changePassword = async (username, oldPassword, newPassword) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(AUTH_ENDPOINTS.CHANGE_PASSWORD, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    old_password: oldPassword,
                    new_password: newPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Password change failed');
            }

            return { success: true };

        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;