import React from "react";
import { i18n } from "../utils/i18n";
import Home from "../views/Home/Home";
import SignInPage from "../views/Auth/signIn";
import SignUpPage from "../views/Auth/signUp";
import ConfirmSponsor from "../views/Sponsorship/ConfirmSponsor/ConfirmSponsor";

const dashboardRoutes = [
    {
        title: i18n._("Home"),
        path: "/",
        exact: true,
        component: <Home />
    },
    {
        title: i18n._("Sign In"),
        path: "/signin",
        component: <SignInPage />
    },
    {
        title: i18n._("Sign Up"),
        path: "/signup",
        component: <SignUpPage />
    },
    {
        title: i18n._("Sponsor Confirmation"),
        path: "/sponsor-confirm",
        component: <ConfirmSponsor />
    },
];

export default dashboardRoutes;