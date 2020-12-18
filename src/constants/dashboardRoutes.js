import React from "react";
import Dashboard from "../views/Dashboard/Dashboard";
import Quota from "../views/Quota/Quota";
import Profile from "../views/Profile/Profile";
import Conversations from "../views/Conversations/Conversations";
import { i18n } from "../utils/i18n";
import Sponsorship from "../views/Sponsorship/Sponsorship";

const dashboardRoutes = [
  {
    name: i18n._("Dashboard"),
    title: i18n._("Dashboard"),
    path: "/dashboard",
    component: <Dashboard />
  },
  {
    name: i18n._("Quota"),
    title: i18n._("Quota"),
    path: "/quota",
    component: <Quota />
  },
  {
    name: i18n._("Profile"),
    title: i18n._("Profile"),
    path: "/profile",
    component: <Profile />
  },
  {
    name: i18n._("Conversations"),
    title: i18n._("Converstions"),
    path: "/conversations",
    component: <Conversations />
  },
  {
    name: i18n._("Sponsorship"),
    title: i18n._("Sponsorship"),
    path: "/sponsorship",
    component: <Sponsorship />,
    disabled: true
  },
];

export default dashboardRoutes;