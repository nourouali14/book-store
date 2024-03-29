import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/authActions';
import { FaTachometerAlt, FaPlusCircle, FaBook, FaUsers, FaSignOutAlt } from 'react-icons/fa';

function Sidebar() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="w-64 space-y-6 py-7 px-2 bg-gray-800 text-gray-300 flex flex-col justify-between">
            <div>
                <NavLink to="/admin/dashboard">
                    <h2 className="text-3xl font-semibold text-center text-white">Admin Dashboard</h2>
                </NavLink>
                <nav className="mt-10">
                    <NavLink to="/admin/dashboard" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        <FaTachometerAlt className="mr-3" /> Dashboard
                    </NavLink>
                    <NavLink to="/admin/add-book" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        <FaPlusCircle className="mr-3" /> Add Book
                    </NavLink>
                    <NavLink to="/admin/manage-books" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        <FaBook className="mr-3" /> Manage Books
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
