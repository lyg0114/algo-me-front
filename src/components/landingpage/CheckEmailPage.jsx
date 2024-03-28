import React, {useEffect} from 'react';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {backendApi} from "../util/BackendApi";
import {handleLogError} from "../util/Helpers";

function CheckEmailPage(props) {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        checkEmail();
    }, [token]);

    const checkEmail = async () => {
        try {
            if (token) {
                const response = await backendApi.checkEmail(token);
                alert(response.data.message);
                navigate('/login');
            } else {
                navigate('/');
            }
        } catch (error) {
            handleLogError(error);
            // 에러 발생 시 사용자에게 메시지 표시나 다른 처리
        }
    };

    return (
        <>
        </>
    );
}

export default CheckEmailPage;
