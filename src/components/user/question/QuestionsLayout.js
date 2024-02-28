import React from "react";
import QuestionsHeader from "./QuestionsHeader";
import QuestionsContent from "./QuestionsContent";
import {Container} from "react-bootstrap";
import {QuestionsProvider} from "./QuestionsContext";


function QuestionsLayout() {
    return (
        <QuestionsProvider>
            <Container fluid style={{background: '#0f0f0f'}} className='bg-black'>
                <QuestionsHeader/>
                <QuestionsContent/>
            </Container>
        </QuestionsProvider>
    );
}

export default QuestionsLayout;
