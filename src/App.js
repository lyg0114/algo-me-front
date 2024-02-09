import React from 'react'
import {AuthProvider} from "./components/context/AuthContext";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./components/util/PrivateRoute";
import Layout from "./components/LayOut";
import SaveQuestion from "./components/user/home/SaveQuestion";
import HomeDashBoard from "./components/user/home/dashboard/HomeDashBoard";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={
                        <PrivateRoute>
                            <Layout>
                                <HomeDashBoard/>
                            </Layout>
                        </PrivateRoute>
                    }/>
                    <Route path="/save-question/:id?" element={
                        <PrivateRoute>
                            <Layout>
                                <SaveQuestion/>
                            </Layout>
                        </PrivateRoute>
                    }/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>

                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
