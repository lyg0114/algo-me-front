import React from 'react';
import QuestionList from "./Question/QuestionList/QuestionList";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import QuestionSave from "./Question/QuestionSave/QuestionSave";

function GridLayout() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<QuestionList/>}/>
                <Route path="/save-question/:id?" element={<QuestionSave/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </Router>
    );
}

export default GridLayout;
