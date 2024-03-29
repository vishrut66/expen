import React from 'react'
import Wrapper from '../../assets/wrappers/Navbar'
import { FaHome } from 'react-icons/fa'
import { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
import Logo from "../Logo.js";

const Navbar = () => {
    const { toggleSidebar, user, logoutUser } = useAppContext();

    const [showLogout, setShowLogout] = useState(false)

    return (
        <Wrapper>
            <div className="nav-center">
                <button
                    className="toggle-btn"
                    onClick={toggleSidebar}
                >
                    <FaAlignLeft />
                </button>

                <div>
                    <Logo />
                    <h3 className="logo-text">dashboard</h3>
                </div>

                <div className='btn-container'>
                    <button className='btn' onClick={() => setShowLogout(!showLogout)}>
                        <FaUserCircle />
                        {user && user.name}
                        <FaCaretDown />
                    </button>
                    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                        <button onClick={logoutUser} className='dropdown-btn'>
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Navbar

