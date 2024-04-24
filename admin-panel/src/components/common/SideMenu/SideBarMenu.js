// src/components/common/SideMenu/SideBarMenu.js
import React from "react";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import '../../../assets/css/common/SideMenu/SideBarMenu.css';
import MinimizedBar from "./MinimizedBar";
import { useSideBar } from '../../../contexts/SideBarContext';

const SideBarMenu = () => {
    const { isSidebarVisible, toggleSidebar } = useSideBar();

    return (
        <IconContext.Provider value={{ color: "undefined" }}>

            <nav className={isSidebarVisible ? "side-nav-menu active" : "side-nav-menu"}>
                {!isSidebarVisible && <MinimizedBar />}
                <ul className="side-nav-menu-items" onClick={toggleSidebar}>
                    <li className="side-navbar-toggle">
                        <Link to="#" className="side-menu-bars">
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span className="side-span">{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </IconContext.Provider>
    );
}

export default SideBarMenu;
