import React from "react";
import {Container} from "react-bootstrap";
import QuestionSaveHeader from "./QuestionSaveHeader";
import QuestionSaveContent from "./QuestionSaveContent";

function QuestionSaveLayout() {
    return (
        <>
            <Container fluid className='bg-black'>
                <QuestionSaveHeader/>
                <QuestionSaveContent/>
            </Container>
        </>
    );
}

export default QuestionSaveLayout;
