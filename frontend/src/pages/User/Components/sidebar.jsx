import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/authActions';
import { FaTachometerAlt, FaHistory, FaUser, FaSignOutAlt } from 'react-icons/fa';

function Sidebar() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="hidden w-64 min-h-screen space-y-6 py-7 px-2 bg-gray-800 text-gray-300 md:flex flex-col justify-between">
            <div>
                <NavLink to="/user/dashboard">
                    <h2 className="text-4xl font-semibold text-center text-white">User Dashboard</h2>
                </NavLink>
                <nav className="mt-10">
                    <NavLink to="/user/dashboard" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        <FaTachometerAlt className="mr-3" /> Dashboard
                    </NavLink>
                    <NavLink to="/user/history" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        <FaHistory className="mr-3" /> Purchase History
                    </NavLink>
                    
                </nav>
            </div>

            <div>
                <NavLink to="/" onClick={handleLogout} className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                    <FaSignOutAlt className="mr-3" /> Logout
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;
