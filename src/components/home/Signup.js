import React, {useState} from 'react'
import {Navigate, NavLink} from 'react-router-dom'
import {Button, Form} from 'semantic-ui-react'
import {useAuth} from '../context/AuthContext'
import {orderApi} from '../misc/OrderApi'
import {handleLogError, parseJwt} from '../misc/Helpers'

function Signup() {
    const Auth = useAuth()
    const isLoggedIn = Auth.userIsAuthenticated()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleInputChange = (e, {name, value}) => {
        if (name === 'username') {
            setUsername(value)
        } else if (name === 'password') {
            setPassword(value)
        } else if (name === 'name') {
            setName(value)
        } else if (name === 'email') {
            setEmail(value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!(username && password && name && email)) {
            setIsError(true)
            setErrorMessage('Please, inform all fields!')
            return
        }

        const user = {username, password, name, email}

        try {
            const response = await orderApi.signup(user)
            const {accessToken} = response.data
            const data = parseJwt(accessToken)
            const authenticatedUser = {data, accessToken}

            Auth.userLogin(authenticatedUser)

            setUsername('')
            setPassword('')
            setName('')
            setEmail('')
            setIsError(false)
            setErrorMessage('')
        } catch (error) {
            handleLogError(error)
            if (error.response && error.response.data) {
                const errorData = error.response.data
                let errorMessage = 'Invalid fields'
                if (errorData.status === 409) {
                    errorMessage = errorData.message
                } else if (errorData.status === 400) {
                    errorMessage = errorData.errors[0].defaultMessage
                }
                setIsError(true)
                setErrorMessage(errorMessage)
            }
        }
    }

    if (isLoggedIn) {
        return <Navigate to='/'/>
    }

    return (
        <>
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
                <Form.Input
                    fluid
                    name='name'
                    icon='address card'
                    iconPosition='left'
                    placeholder='Name'
                    value={name}
                    onChange={handleInputChange}
                />
                <Form.Input
                    fluid
                    name='email'
                    icon='at'
                    iconPosition='left'
                    placeholder='Email'
                    value={email}
                    onChange={handleInputChange}
                />
                <Button color='violet' fluid size='large'>Signup</Button>
            </Form>
            <div>{`Already have an account? `}
                <NavLink to="/login" color='violet' as={NavLink}>Login</NavLink>
            </div>
            {isError && <div> {errorMessage}</div>}
        </>
    )
}

export default Signup
