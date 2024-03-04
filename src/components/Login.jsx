import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from './context/AuthContext';
import {backendApi} from './util/BackendApi';
import {handleLogError, parseJwt} from './util/Helpers';
import {Button, Form} from 'react-bootstrap';

function Login() {
  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(username && password)) {
      setIsError(true);
      return;
    }

    try {
      const response = await backendApi.authenticate(username, password);
      const accessToken = response.data.token;
      const data = parseJwt(accessToken);
      const authenticatedUser = {data, accessToken};
      Auth.userLogin(authenticatedUser);
      setUsername('');
      setPassword('');
      setIsError(false);
    } catch (error) {
      handleLogError(error);
      setIsError(true);
    }
  };

  if (isLoggedIn) {
    return <Navigate to={'/'}/>;
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">LOGIN</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>ID</Form.Label>
              <Form.Control
                  type="text"
                  value={username}
                  onChange={handleInputChange}
                  placeholder="Enter your id"
                  name="username"
                  required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>PW</Form.Label>
              <Form.Control
                  type="password"
                  value={password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
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
          </Form>
        </div>
      </div>
  );
}

export default Login;
