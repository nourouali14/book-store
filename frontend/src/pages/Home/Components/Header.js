import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';

function Header() {
    const [menutoggle, setMenutoggle] = useState(false);

    const Toggle = () => {
        setMenutoggle(!menutoggle);
    };

    const closeMenu = () => {
        setMenutoggle(false);
    };

    return (
        <div className="bg-white shadow-md py-4 px-6 flex items-center justify-between relative">
            <div className="flex items-center">
                <Link to="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700">
                    ONLINE LIBRARY
                </Link>
            </div>
      
                <div className="md:hidden z-30" onClick={Toggle}>
                {menutoggle ? (
                    <ClearIcon className="text-gray-700" style={{ fontSize: 40 }} />
                ) : (
                    <MenuIcon className="text-gray-700" style={{ fontSize: 40 }} />
                )}
            </div>
            
            <div className={`absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent z-20 transition-all duration-300 ease-in-out ${menutoggle ? 'block' : 'hidden'} md:block`}>
                <div className="flex flex-col md:flex-row items-center md:space-x-8 py-4 md:py-0 px-6 md:px-0">
                    <Link to="/" onClick={closeMenu} className="hidden text-base text-gray-700 hover:text-gray-900 py-2 md:py-0">Home</Link>
                    <Link to="/books" onClick={closeMenu} className="text-base text-gray-700 hover:text-gray-900 py-2 md:py-0">Books</Link>
                    <Link to="/login" onClick={closeMenu} className="text-base text-gray-700 hover:text-gray-900 py-2 md:py-0">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
