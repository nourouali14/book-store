import React from 'react';
import Sidebar from './Components/sidebar';
import { Outlet } from 'react-router-dom';


function User() {

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-10">
                <Outlet /> 
            
            </div>
        </div>
    );
}

export default User;