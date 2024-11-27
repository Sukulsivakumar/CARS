import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'
import {Cookies} from 'react-cookie'
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const cookies = new Cookies();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = cookies.get('token');
                const decoded = jwtDecode(token)
                setUser(decoded)
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

