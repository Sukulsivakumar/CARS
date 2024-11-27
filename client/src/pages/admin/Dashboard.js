import React, {useContext} from 'react';
import {Cookies} from 'react-cookie'
import {AuthContext} from "../../context/authContext";

const DashboardPage = () => {
    const useAuth = useContext(AuthContext)
    const {user} = useAuth
    const cookies = new Cookies();
    const ckk = cookies.get('token')
    console.log("cookie",ckk)
    console.log("id",user)


    return (
        <div>
            <h1>Dashboard</h1>
            <p>

            </p>
        </div>
    );
};

export default DashboardPage;
