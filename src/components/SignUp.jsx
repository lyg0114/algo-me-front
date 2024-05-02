import React, {useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {useAuth} from './context/AuthContext';
import {handleLogError} from './util/Helpers';
import {Button, Form} from 'react-bootstrap';
import {BackendAuthApi as backendAuthApi} from "./util/api/BackendAuthApi";

function Login() {
    const Auth = useAuth();
    const isLoggedIn = Auth.userIsAuthenticated();

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isValidated, setIsValidated] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'passwordConfirm') {
            setPasswordConfirm(value);
        } else if (name === 'userName') {
            setUserName(value);
        }
    };

    //TODO : 회원가입버튼 클릭시 로딩창 나오도록 개선
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!(email && emailRegex.test(email))) {
            setIsValidated(true);
            setMessage("유효하지 않은 e-mail 형식 입니다.");
            return;
        }

        //TODO : 패스워드복잡도를 체크하는 유효성 로직이 추가되어야 함.
        if (password !== passwordConfirm) {
            setIsValidated(true);
            setMessage("password가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await backendAuthApi.signup({email, userName, password});
            setEmail('');
            setPassword('');
            setUserName('');
            setIsValidated(false);
            alert(response.data.message);
            navigate('/login');
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
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">SIGN UP</h2>
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

                    <Form.Group controlId="userName" className='mb-2'>
                        <Form.Label>USER-NAME</Form.Label>
                        <Form.Control
                            type="text"
                            value={userName}
                            onChange={handleInputChange}
                            placeholder="enter your userName"
                            name="userName"
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

                    <Form.Group controlId="passwordConfirm" className='mb-4'>
                        <Form.Label>PW CONFIRM</Form.Label>
                        <Form.Control
                            type="password"
                            value={passwordConfirm}
                            onChange={handleInputChange}
                            placeholder="enter your password repet"
                            name="passwordConfirm"
                            required
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-full hover:bg-blue-600 transition duration-300"
                    >
                        SIGN-UP
                    </Button>

                    {isValidated &&
                        <div className='mt-4'>
                            {message}
                        </div>
                    }

                </Form>
            </div>
        </div>
    );
}

export default Login;
