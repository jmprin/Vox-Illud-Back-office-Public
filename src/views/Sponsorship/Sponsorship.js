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
import SponsorService from "../../http-services/sponsor.service";
import {i18n} from "../../utils/i18n";
import {Trans} from "@lingui/macro";
import config from '../../constants/config.json';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";

const Sponsorship = (props) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [sponsored, setSponsored] = useState([]);
    const [sponsoredLoading, setSponsoredLoading] = useState(false);
    const alertRef = useRef();

    const sendMail = values => {
        setLoading(true);
        SponsorService.sendSponsorMail(values)
            .then(response => {
                alertRef.current.toggle('success', 'Mail sent!');
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    alertRef.current.toggle('error', error.response.data.message);
                } else {
                    alertRef.current.toggle('error', error.toString());
                }
                setLoading(false);
            });
    }

    const getSponsoredUsers = () => {
        setSponsoredLoading(true);
        SponsorService.getSponsoredUsers()
            .then(response => {
                setSponsored(response.data);
                setSponsoredLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    alertRef.current.toggle('error', error.response.data.message);
                } else {
                    alertRef.current.toggle('error', error);
                }
                setSponsoredLoading(false);
            });
    }

    useEffect(() => {
        getSponsoredUsers();
    }, []);

    return (
        <>
            <BackdropLoader open={loading}/>
            <Alert ref={alertRef}/>
            <h2><Trans>The Sponsorship System</Trans></h2>
            <p><Trans>{config.app.name} offers you the possibility to sponsor a particular user. This allows the person to join our launching program and benefit from advantages once the fully-featured commercial edition launches.</Trans></p>
            <Trans>In order to sponsor someone, you have to:</Trans>
            <ul>
                <li key={'sponsor-li-1'}><Trans>Enter the E-mail adress of the person you want to sponsor, a mail will be sent to his/her mailbox</Trans></li>
                <li key={'sponsor-li-2'}><Trans>Once the person has clicked your link, his/her account will be recognized as one of the person you sponsored, and you both will benefit from advantages such as bonus quota, or discounts.</Trans></li>
            </ul>
            <Form
                onSubmit={sendMail}
                initialValues={user}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Box p={1}>
                            <Field name="email" type="email" id="sponsor-email" label={i18n._("E-Mail of the person you want to sponsor")}>
                                {props => (
                                    <TextField variant={'outlined'} fullWidth {...props} {...props.input} />
                                )}
                            </Field>
                        </Box>
                        <Button fullWidth type="submit" className="shadow-2 mb-4"><Trans>Sponsor</Trans></Button>
                    </form>
                )}/>
                <Divider variant={"middle"}/>
                <Paper>
                    <Box p={2}>
                        <h3><Trans>My Sponsored Users</Trans></h3>
                        <Button className="shadow-2 mb-4" onClick={() => getSponsoredUsers()}><Trans>Refresh</Trans></Button>
                        {sponsoredLoading ?
                            <div><Trans>Loading...</Trans></div>
                            :
                            sponsored.map(sponsoredUser => (
                            <div>{sponsoredUser.first_name} {sponsoredUser.last_name} ({sponsoredUser.email})</div>
                        ))}
                    </Box>
                </Paper>
        </>
    );
}

export default Sponsorship;