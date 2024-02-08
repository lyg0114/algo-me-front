import React from 'react'
import {AuthProvider} from "./components/context/AuthContext";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import Home from "./components/home/Home";
import Login from "./components/home/Login";
import Signup from "./components/home/Signup";
import PrivateRoute from "./components/misc/PrivateRoute";
import UserPage from "./components/user/UserPage";
import AdminPage from "./components/admin/AdminPage";
import Layout from "./components/LayOut";
import SaveQuestion from "./components/home/SaveQuestion";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={
                        <PrivateRoute>
                            <Layout>
                                <Home/>
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
                    <Route path="/adminpage" element={<PrivateRoute><AdminPage/></PrivateRoute>}/>
                    <Route path="/userpage" element={<PrivateRoute><UserPage/></PrivateRoute>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>

                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
