import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {Field, Form} from "react-final-form";
import {i18n} from "../../../utils/i18n";
import {Button, TextField} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {Trans} from "@lingui/macro";
import React from "react";

const ChangePasswordForm = (props) => {
    return (
        <Form
            onSubmit={props.onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form  onSubmit={ async (event) => {
                    await handleSubmit(event);
                    form.reset();
                  }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box p={1}>
                                <Field name="old_password" type="password" label={i18n._("Ancien mot de passe")}>
                                    {props => (
                                        <TextField variant="outlined" fullWidth {...props} {...props.input} />
                                    )}
                                </Field>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box p={1}>
                                <Field name="new_password" type="password" label={i18n._("Nouveau mot de passe")}>
                                    {props => (
                                        <TextField variant="outlined" fullWidth {...props} {...props.input} />
                                    )}
                                </Field>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box p={1}>
                                <Field name="new_password_repeat" type="password" id="signin-email" label={i18n._("Confirmer le nouveau mot de passe")}>
                                    {props => (
                                        <TextField variant="outlined" fullWidth {...props} {...props.input} />
                                    )}
                                </Field>
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider variant="middle"/>
                    <Button fullWidth type="submit" className="shadow-2 mb-4"><Trans>Change password</Trans></Button>
                </form>
            )}/>
    );
}

export default ChangePasswordForm;