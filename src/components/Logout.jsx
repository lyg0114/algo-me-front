import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from './context/AuthContext';

function Logout() {
    const Auth = useAuth();
    const isLoggedIn = Auth.userIsAuthenticated();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            Auth.userLogout();
        }
    }, [])

    return <Navigate to={'/'}/>;
}

export default Logout;
