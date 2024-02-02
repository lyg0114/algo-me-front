import React, { useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { orderApi } from '../misc/OrderApi'
import { parseJwt, handleLogError } from '../misc/Helpers'

function Login() {

  const Auth = useAuth()
  const isLoggedIn = Auth.userIsAuthenticated()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Destructure from e.target
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
               ID
              </label>
              <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your id"
                  required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
               PW
              </label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your password"
                  required
              />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold p-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
  )
}

export default Login
