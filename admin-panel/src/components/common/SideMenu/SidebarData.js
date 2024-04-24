import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { RiAdvertisementFill } from "react-icons/ri";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "side-nav-text",
  },
  {
    title: "Blogs",
    path: "/manage-blogs",
    icon: <FaIcons.FaBloggerB />,
    cName: "side-nav-text",
  },
  {
    title: "Ads",
    path: "/ads",
    icon: <RiAdvertisementFill />,
    cName: "side-nav-text",
  },
  {
    title: "Newsletter",
    path: "/newsletter-subscriptions",
    icon: <AiIcons.AiOutlineMail />,
    cName: "side-nav-text",
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "side-nav-text",
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "side-nav-text",
  },
];