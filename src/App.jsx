import React from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/dist/react-bootstrap.min'
import Login from "./components/Login";
import QuestionsLayout from "./components/user/question/QuestionsLayout";
import QuestionSaveLayout from "./components/user/question/QuestionSave/QuestionSaveLayout";
import {AuthProvider} from "./components/context/AuthContext";
import Logout from "./components/Logout";
import QuestionViewLayout from "./components/user/question/QuestionView/QuestionViewLayout";
import SignUp from "./components/SignUp";
import LandingPage from "./components/landingpage/LandingPage";
import CheckEmailPage from "./components/landingpage/CheckEmailPage";
import ProfileViewLayout from "./components/setting/ProfileView/ProfileViewLayout";

function App() {
    return (
        <>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path='/' element={<LandingPage/>}/>
                        <Route path='/main' element={<QuestionsLayout/>}/> {/* 문제 등록, 수정 */}
                        <Route path="/save-question/:id?" element={<QuestionSaveLayout/>}/> {/* 문제 등록, 수정 */}
                        <Route path="/view-question/:id?" element={<QuestionViewLayout/>}/> {/* 문제 상세조회 */}
                        <Route path="/setting/profile" element={<ProfileViewLayout/>}/> {/* 프로파일 화면 */}

                        <Route path='/login' element={<Login/>}/>
                        <Route path='/logout' element={<Logout/>}/>
                        <Route path='/signup' element={<SignUp/>}/>
                        <Route path='/check-email' element={<CheckEmailPage/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </Router>
            </AuthProvider>
        </>
    )
}

export default App
