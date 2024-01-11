import React from 'react'
import { AuthProvider } from './components/context/AuthContext'
import Login from './components/home/Login'

function App() {
  return (
      <AuthProvider>
        <Login/>
      </AuthProvider>
  );
}

export default App;
