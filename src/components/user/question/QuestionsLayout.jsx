import React from "react";
import QuestionsContent from "./QuestionsContent";
import {Container} from "react-bootstrap";
import PrivateRoute from "../../util/PrivateRoute";


function QuestionsLayout() {
    return (
        <PrivateRoute>
            <Container fluid style={{background: '#0f0f0f'}} className='bg-black'>
                <QuestionsContent/>
            </Container>
        </PrivateRoute>
    );
}

export default QuestionsLayout;
