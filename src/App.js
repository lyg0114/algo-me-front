import React from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/dist/react-bootstrap.min'
import Login from "./components/Login";
import QuestionsLayout from "./components/user/question/QuestionsLayout";
import QuestionSaveLayout from "./components/user/question/QuestionSave/QuestionSaveLayout";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<QuestionsLayout/>}/>
                    <Route path="/save-question/:id?" element={<QuestionSaveLayout/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
