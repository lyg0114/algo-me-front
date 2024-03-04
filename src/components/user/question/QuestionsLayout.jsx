import React from "react";
import QuestionsContent from "./QuestionsContent";
import {Container} from "react-bootstrap";


function QuestionsLayout() {
    return (
        <Container fluid style={{background: '#0f0f0f'}} className='bg-black'>
            <QuestionsContent/>
        </Container>
    );
}

export default QuestionsLayout;
