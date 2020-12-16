import React, { useState, useEffect, useRef } from "react";
import { Form, Field } from "react-final-form";
import SponsorService from "../../../http-services/sponsor.service";
import AuthService from "../../../http-services/auth.service";
import Auth from "../../../utils/auth";
import {Redirect, useHistory} from "react-router-dom";
import queryString from "query-string";
import Alert from "../../../components/Alert/Alert";
import Box from "@material-ui/core/Box";
import {i18n} from "../../../utils/i18n";
import BackdropLoader from "../../../components/BackdropLoader/Backdrop";
import SignUpForm from "../../../components/Forms/Auth/SignUpForm";
import UserServices from '../../../utils/user';
import DoneIcon from '@material-ui/icons/Done';
import {Trans} from "@lingui/macro";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
    },
    successContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))

const ConfirmSponsor = (props) => {
    const [loading, setLoading] = useState(false);
    const [sponsorConfirmed, setSponsorConfirmed] = useState(false);
    const alertRef = useRef(null);
    const classes = useStyles();
    let history = useHistory();

    const confirmSponsor = () => {
        const sponsorId = queryString.parse(window.location.search).sponsorId;
        if (sponsorId) {
            SponsorService.confirmSponsor({ sponsorId })
                .then(response => {
                    console.log(response);
                    alertRef.current.toggle('success', i18n._("You are now sponsored by") + ` ${response.data.sponsor.first_name} ${response.data.sponsor.last_name}`);
                    setSponsorConfirmed(true);
                    setLoading(false);
                    setSponsorConfirmed(true);
                    setTimeout(() => history.push("/dashboard"), 5000);
                })
                .catch(error => {
                    if (error.response) {
                        alertRef.current.toggle('error', error.response.data.message);
                    } else {
                        alertRef.current.toggle('error', error.toString());
                    }
                    setLoading(false);
                })
        } else {
            console.error('Cannot continue, there is no sponsorId');
        }
    }

    useEffect(() => {
        if (Auth.isAuthenticated()) {
            confirmSponsor();
        }
    }, []);

    const signUp = values => {
        setLoading(true);
        Auth.signUp(values)
            .then(response => {
                Auth.signIn(values)
                    .then(response => {
                        confirmSponsor();
                        setLoading(false);
                    })
                    .catch(error => {
                        if (error.response) {
                            alertRef.current.toggle('error', error.response.data.message);
                            console.error(error.response)
                        } else {
                            alertRef.current.toggle('error', error);
                            console.error(error);
                        }
                    })
            })
            .catch(error => {
                if (error.response) {
                    alertRef.current.toggle('error', error.response.data.message);
                } else {
                    alertRef.current.toggle('error', error);
                }
                setLoading(false);
            })
    };

    return (
        <>
            <div className={classes.container}>
                <Alert ref={alertRef}/>
                <BackdropLoader open={loading} />
                <Box p={2}>
                    {!Auth.isAuthenticated() &&
                        <SignUpForm
                            initialValues={{email: queryString.parse(window.location.search).email}}
                            onSubmit={signUp}
                        />
                    }
                    {sponsorConfirmed &&
                        <div className={classes.successContainer}>
                            <DoneIcon fontSize={"large"} style={{color: 'green', fontSize: '20em'}}/>
                            <h1><Trans>Sponsor confirmed</Trans></h1>
                            <div>
                                <h2>You are about to be redirected to your dashboard in 5 seconds.</h2>
                                <Button><Trans>Return to dashboard</Trans></Button>
                            </div>
                        </div>
                    }
                </Box>


            </div>
        </>
    )
}

export default ConfirmSponsor;