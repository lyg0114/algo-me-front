import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {backendApi} from "../util/BackendApi";
import {handleLogError} from "../util/Helpers";

function CheckEmailPage(props) {

    const {token} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        checkEmail();
    }, []);

    const checkEmail = async () => {
        if (token) {
            try {
                const response = await backendApi.checkEmail(token);
                alert(response.data.message);
                navigate('/login');
            } catch (error) {
                handleLogError(error);
            }
        }
    };

    return (
        <>
        </>
    );
}

export default CheckEmailPage;
