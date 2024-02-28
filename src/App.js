import React from 'react'
import {AuthProvider} from "./components/context/AuthContext";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import Login from "./components/Login";
import PrivateRoute from "./components/util/PrivateRoute";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={
                        <PrivateRoute>
                        </PrivateRoute>
                    }/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
