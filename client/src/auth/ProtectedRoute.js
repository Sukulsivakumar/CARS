import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext);
    console.log(user, Date.now())

    if (loading) {
        return <div><h1>Loading...</h1></div>;
    }
    // if(user){
    //     return <Navigate to="/admin/dashboard" replace />
    // }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
