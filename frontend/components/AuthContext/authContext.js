import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkSession();
    }, []);

    const handleResponse = async (response) => {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Request failed');
        }
        return data;
    };

    const checkSession = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/users/session', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await handleResponse(response);
            if (data.user) {
                setUser(data.user);
            }
        } catch (error) {
            console.error('Session check failed:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            setError(null);
            setIsLoading(true);

            const response = await fetch('/api/users/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await handleResponse(response);

            if (data.user) {
                setUser(data.user);
                // Wait a brief moment to ensure session is established
                await new Promise(resolve => setTimeout(resolve, 100));
                await checkSession();
                return { success: true };
            }

            return { success: false, error: 'Login failed' };
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.message);
            return {
                success: false,
                error: error.message || 'Login failed'
            };
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (username, password) => {
        try {
            setError(null);
            setIsLoading(true);

            const response = await fetch('/api/users/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await handleResponse(response);

            if (data.user) {
                setUser(data.user);
                await checkSession();
                return { success: true };
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setError(error.message);
            return {
                success: false,
                error: error.message || 'Registration failed'
            };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/users/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await handleResponse(response);
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            error,
            login,
            logout,
            register,
            checkSession
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);