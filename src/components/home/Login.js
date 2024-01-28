import React, { useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import { orderApi } from '../misc/OrderApi'
import { parseJwt, handleLogError } from '../misc/Helpers'

function Login() {
  const Auth = useAuth()
  const isLoggedIn = Auth.userIsAuthenticated()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)

  const handleInputChange = (e, { name, value }) => {
    if (name === 'username') {
      setUsername(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!(username && password)) {
      setIsError(true)
      return
    }

    try {
      const response = await orderApi.authenticate(username, password)
      const  accessToken  = response.data.token;
      const data = parseJwt(accessToken)
      const authenticatedUser = { data, accessToken }
      Auth.userLogin(authenticatedUser)
      setUsername('')
      setPassword('')
      setIsError(false)
    } catch (error) {
      handleLogError(error)
      setIsError(true)
    }
  }

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
      <div>
        <Form size='large' onSubmit={handleSubmit}>
          <Form.Input
              fluid
              autoFocus
              name='username'
              icon='user'
              iconPosition='left'
              placeholder='Username'
              value={username}
              onChange={handleInputChange}
          />
          <Form.Input
              fluid
              name='password'
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={password}
              onChange={handleInputChange}
          />
          <Button color='violet' fluid size='large'>Login</Button>
        </Form>
        <div>Don't have already an account?</div>
        <NavLink to="/signup" color='violet' as={NavLink}>Sign Up</NavLink>
        {isError && <span>The username or password provided are incorrect!</span>}
      </div>
  )
}

export default Login
