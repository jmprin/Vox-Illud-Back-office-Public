import React, {useEffect, useRef, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {Field, Form} from "react-final-form";
import {Button, TextField} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {default as MuiLink} from "@material-ui/core/Link/Link";
import {Link} from "react-router-dom";
import BackdropLoader from "../../components/BackdropLoader/Backdrop";
import Alert from "../../components/Alert/Alert";
import UserService from "../../http-services/user.service";
import {i18n} from "../../utils/i18n";
import {Trans} from "@lingui/macro";
import UpdateProfileForm from "../../components/Forms/Profile/UpdateProfileForm";

const Profile = (props) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const alertRef = useRef();

    useEffect(() => {
        setLoading(true);
        UserService.getProfile()
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    alertRef.current.toggle('error', error.response.data.message);
                } else {
                    alertRef.current.toggle('error', error);
                }
                setLoading(false);
            })
    }, []);

    const updateUser = values => {
        setLoading(true);
        UserService.updateProfile(values)
            .then(response => {
                alertRef.current.toggle('success', 'The user has been updated');
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    alertRef.current.toggle('error', error.response.data.message);
                } else {
                    alertRef.current.toggle('error', error);
                }
                setLoading(false);
            })
    }

    return (
        <>
            <BackdropLoader open={loading}/>
            <Alert ref={alertRef}/>
            <UpdateProfileForm initialValues={user} onSubmit={updateUser} />
        </>
    );
}

export default Profile;