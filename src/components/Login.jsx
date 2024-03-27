import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {useAuth} from './context/AuthContext';
import {backendApi} from './util/BackendApi';
import {handleLogError, parseJwt} from './util/Helpers';
import {Button, Form} from 'react-bootstrap';

function Login() {
    const Auth = useAuth();
    const isLoggedIn = Auth.userIsAuthenticated();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidated, setIsValidated] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(email && password)) {
            setIsValidated(true);
            return;
        }

        try {
            const response = await backendApi.authenticate(email, password);
            const accessToken = response.data.token;
            const data = parseJwt(accessToken);
            const authenticatedUser = {data, accessToken};
            Auth.userLogin(authenticatedUser);
            setEmail('');
            setPassword('');
            setIsValidated(false);
        } catch (error) {
            handleLogError(error);
            setIsValidated(true);
            setMessage(error.response.data.message);
        }
    };

    if (isLoggedIn) {
        return <Navigate to={'/main'}/>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-black">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">LOGIN</h2>
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="email" className='mb-2'>
                        <Form.Label>EMAIL</Form.Label>
                        <Form.Control
                            type="text"
                            value={email}
                            onChange={handleInputChange}
                            placeholder="enter your email"
                            name="email"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="password" className='mb-4'>
                        <Form.Label>PW</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={handleInputChange}
                            placeholder="enter your password"
                            name="password"
                            required
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-full hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </Button>

                    {isValidated &&
                        <div className='mt-4'>
                            {message}
                        </div>
                    }

                </Form>
                {/* 회원가입 링크 추가 */}
                <div className="text-center mt-2">
                    <span className="text-gray-500">계정이 없으신가요? </span>
                    <Link to="/signup" className="text-blue-500">회원가입</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
