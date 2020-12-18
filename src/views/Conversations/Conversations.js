import React, {useEffect, useRef, useState} from 'react';
import BackdropLoader from "../../components/BackdropLoader/Backdrop";
import Alert from "../../components/Alert/Alert";
import UserService from '../../http-services/user.service';
import {i18n} from "../../utils/i18n";
import {default as MaterialTable} from "../../components/MaterialTable/MaterialTable";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const Conversation = (props) => {
    
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const alertRef = useRef();

    const getConversations= (callback) => {
        setLoading(true);
        UserService.getConversations()
            .then(response => {
                setConversations(response.data);
                setLoading(false);
                if (callback) {
                    callback();
                }
            })
            .catch(error => {
                if (error.response) {
                    alertRef.current.toggle('error', error.response.data.message);
                }
                alertRef.current.toggle('error', error.toString());
                setLoading(false);
            })
    }

    useEffect(() => {
        getConversations();
    }, []);


    const columns = [
        { field: 'conversationId', title: i18n._("ID"), minWidth: 120 },
        { field: 'created_at', title: i18n._("Début"), minWidth: 120, render: data => new Date(data.created_at).toLocaleString() },
        { field: 'finished_at', title: i18n._("Fin"), minWidth: 200, align: 'left', render: data => new Date(data.finished_at).toLocaleString() },
        { field: 'duration', title: i18n._("Durée réelle"), minWidth: 100, align: 'right',render: data => new Date(data.duration * 1000).toISOString().substr(11, 8) }
    ];

    return (
        <div>
            <Alert ref={alertRef}/>
            <BackdropLoader open={loading}/>
            <MaterialTable
                columns={columns}
                data={conversations}
                title={i18n._("Conversations")}
            />
        </div>
    );
}

export default Conversation;