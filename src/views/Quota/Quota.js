import React, {useEffect, useRef, useState} from 'react';
import LinearProgressWithLabel from "../../components/Quota/ProgressBar/ProgressBar";
import Paper from "@material-ui/core/Paper";
import moment from 'moment';
import BackdropLoader from "../../components/BackdropLoader/Backdrop";
import Box from "@material-ui/core/Box";
import UserService from "../../http-services/user.service";
import Button from "@material-ui/core/Button";
import RefreshIcon from '@material-ui/icons/Refresh';
import { Trans } from '@lingui/macro';
import Modal from '../../components/Modal/Modal';
import { Form, Field } from "react-final-form";
import {i18n} from "../../utils/i18n";
import {TextField} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ContactService from '../../http-services/contact.service';
import Alert from "../../components/Alert/Alert";
import { formatSeconds } from '../../utils/common';

const Quota = (props) => {
    const [loading, setLoading] = useState(false);
    const [licenses, setLicenses] = useState([]);
    const [solde, setSolde] = useState(0);
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const alertRef = useRef();
    const modalAlertRef = useRef();

    const getUsageDetails = () => {
        setLicenses([]);
        setSolde(0);
        UserService.getUsageDetails()
            .then(response => {
                console.log(response.data);
                setSolde(response.data.solde);
                setLicenses(response.data.licenses);
            })
            .catch(error => {
                if (error.response) {
                    alertRef.current.toggle(error.response.data.message);
                } else {
                    alertRef.current.toggle(error.toString());
                }
            })
    }

    useEffect(() => {
        getUsageDetails();
    }, []);

   
    const sendMail = values => {
        setLoading(true);
        ContactService.sendMailQuota(values)
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


    return (
        <div>
            <Alert ref={alertRef} />
            <BackdropLoader open={loading} />
            <Modal open={contactModalOpen} onClose={() => setContactModalOpen(false)}>
                <Alert ref={modalAlertRef} />
                <img src={"images/undraw_envelope_n8lc.svg"} alt="undraw_envelope" style={{width: '50%', height: '50%'}}/>
                <Form
                    onSubmit={sendMail}
                    initialValues={{ subject: i18n._("Quota") }}
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
                                <Field name="content" id="quota-content" label={i18n._("The content of your mail")}>
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
            {licenses ?
                <div>
                    <Button onClick={getUsageDetails}>
                        <RefreshIcon/> <Trans>Refresh</Trans>
                    </Button>
                    
                    {licenses.map((item)=>
                        <Paper>
                            <Box p={2}>
                                <h3>{item.license.title}</h3>
                                <h5 className='mb-4'><Trans>Remaining:</Trans> {formatSeconds(item.solde,['H','m','s'])} (<Trans>Quota:</Trans> {formatSeconds(item.license.quota,['H','m'])})</h5>
                                <LinearProgressWithLabel value={item.solde > 0 ? ( item.solde / item.license.quota * 100 ) : 0 }/>
                            </Box>
                        </Paper>
                    )}

                    <Trans>Need more time?</Trans> <Button onClick={() => setContactModalOpen(true)}><Trans>Contact Us</Trans></Button>
                </div>
               
            :
                <div>
                    Loading
                </div>
            }
        </div>
    );
}

export default Quota;