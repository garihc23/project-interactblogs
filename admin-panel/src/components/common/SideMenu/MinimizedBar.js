// src/components/common/SideMenu/MinimizedBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import { SidebarData } from './SidebarData';
import '../../../assets/css/common/SideMenu/MinimizedBar.css';
import { useSideBar } from '../../../contexts/SideBarContext';

const MinimizedBar = () => {
    const { toggleSidebar } = useSideBar();

    return (
        <div className="minimized-bar">
            <div className="toggle-button">
                <FaIcons.FaBars onClick={toggleSidebar} />
            </div>
            {SidebarData.map((item, index) => (
                <Link key={index} to={item.path} className="minimized-icon">
                    {item.icon}
                </Link>
            ))}
        </div>
    );
}

export default MinimizedBar;
