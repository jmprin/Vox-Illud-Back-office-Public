import React, { useState, useRef } from 'react';
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import Auth from "../../utils/auth";
import {Field, Form} from "react-final-form";
import { Button, TextField } from '@material-ui/core';
import BackdropLoader from "../../components/BackdropLoader/Backdrop";
import Alert from "../../components/Alert/Alert";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import config from "../../constants/config.json";
import Divider from "@material-ui/core/Divider";
import ContactService from '../../http-services/contact.service';
import { Trans } from "@lingui/macro";
import {i18n} from "../../utils/i18n";
import SignInForm from "../../components/Forms/Auth/SignInForm";
import Modal from '../../components/Modal/Modal';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    card: {
        maxWidth: '40%'
    }
}));

const SignInPage = (props) => {
    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [loading, setLoading] = useState(false);
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const alertRef = useRef(null);
    const modalAlertRef = useRef();

    const sendMail = values => {
        setLoading(true);
        ContactService.sendMailAccount(values)
            .then(response => {
                alertRef.current.toggle('success', 'Mail sent!');
                setLoading(false);
                setContactModalOpen(false);
            })
            .catch(error => {
                if (error.response) {
                    modalAlertRef.current.toggle('error', error.response.data.message);
                } else {
                    modalAlertRef.current.toggle('error', error.toString());
                }
                setLoading(false);
            });
    }

    let signIn = values => {
        alertRef.current.hide();
        setLoading(true);
        Auth.signIn(values)
            .then(response => {
                setLoading(false);
                history.push('/dashboard');
                // window.location.reload();
            })
            .catch(error => {
                if (error.response) {
                    alertRef.current.toggle('error', error.response.data.message);
                    console.error(error.response)
                } else {
                    alertRef.current.toggle('error', error);
                    console.error(error);
                }
                setLoading(false);
            })
    };

    return (
        <>
            {Auth.isAuthenticated() && <Redirect to="/dashboard"/>}
            <BackdropLoader open={loading} />
            <Modal open={contactModalOpen} onClose={() => setContactModalOpen(false)}>
                <Alert ref={modalAlertRef} />
                <img src={"images/undraw_envelope_n8lc.svg"} alt="undraw_envelope" style={{width: '25%', height: '25%'}}/>
                <Form
                    onSubmit={sendMail}
                    initialValues={{ subject: i18n._("Création d'un compte") }}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <Box p={1}>
                                <Field name="subject" id="quota-subject" label={i18n._("Subject")}>
                                    {props => (
                                        <TextField disabled fullWidth {...props} {...props.input} />
                                    )}
                                </Field>
                            </Box>
                            <Box p={1}>
                                <Field name="last_name" label={i18n._("Last name")}>
                                    {props => (
                                        <TextField required variant={'outlined'} fullWidth {...props} {...props.input} />
                                    )}
                                </Field>
                            </Box>
                            <Box p={1}>
                                <Field name="first_name" label={i18n._("First name")}>
                                    {props => (
                                        <TextField  required variant={'outlined'} fullWidth {...props} {...props.input} />
                                    )}
                                </Field>
                            </Box>
                            <Box p={1}>
                                <Field name="email" label={i18n._("Email")}>
                                    {props => (
                                        <TextField  required variant={'outlined'} fullWidth {...props} {...props.input} />
                                    )}
                                </Field>
                            </Box>
                            <Box p={1}>
                                <Field name="company" label={i18n._("Company")}>
                                    {props => (
                                        <TextField variant={'outlined'} fullWidth {...props} {...props.input} />
                                    )}
                                </Field>
                            </Box>
                            <Box p={1}>
                                <Field name="phone_number" label={i18n._("Phone number")}>
                                    {props => (
                                        <TextField type="Number" variant={'outlined'} fullWidth {...props} {...props.input} />
                                    )}
                                </Field>
                            </Box>
                            <Box p={1}>
                                <Field name="content" required id="quota-content" label={i18n._("The content of your mail")}>
                                    {props => (
                                        <TextField variant={'outlined'} multiline rows={3} fullWidth {...props} {...props.input} />
                                    )}
                                </Field>
                            </Box>
                            <Divider variant="middle"/>
                            <Button fullWidth type="submit" className="shadow-2 mb-4"><Trans>Send</Trans></Button>
                        </form>
                    )}/>
            </Modal>
            <div className={classes.container}>
                <Paper className={classes.card}>
                    <Alert ref={alertRef} />
                    <Box p={4}>
                        <h1><Trans>Welcome to the {config.app.name} Portal</Trans></h1>
                        <h4><Trans>You have to sign in to continue</Trans></h4>
                        <SignInForm onSubmit={signIn} />

                        <Trans>Vous n'avez pas de compte ?</Trans> <Button onClick={() => setContactModalOpen(true)}><Trans>Contact Us</Trans></Button>
                    </Box>
                </Paper>
            </div>
        </>
    );
}

export default SignInPage;