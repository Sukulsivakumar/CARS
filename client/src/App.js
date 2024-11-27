import React from 'react';
import {Routes, Route  } from 'react-router-dom';

import ProtectedRoute from "./auth/ProtectedRoute";

import AdminLayout  from './layout/Layout'
import HomePage from './pages/general/home';
import LoginForm from './auth/loginForm';
import RegisterForm from './components/registerForm';
import DashboardPage from './pages/admin/Dashboard';
import Users from './pages/admin/users/Users';
import Report from './pages/admin/Report';
import { AuthProvider } from './context/authContext';
import ExcelToJson from "./feedback";


function App() {
    return (
        <AuthProvider>
                <Routes>
                    <Route element={<ProtectedRoute/>}>
                        <Route path='/admin/' element={<AdminLayout/>}>
                            <Route path="dashboard" element={<DashboardPage/>} />
                            <Route path="users" element={<Users/>} />
                            <Route path="report" element={<Report/>} />
                        </Route>
                    </Route>

                    <Route path="/" exact element={<HomePage/>} />
                    <Route path="/login" element={<LoginForm/>} />
                    <Route path="/register" element={<RegisterForm/>} />
                    <Route path="/feed" element={<ExcelToJson/>} />

                </Routes>
        </AuthProvider>
    );
}

export default App;
