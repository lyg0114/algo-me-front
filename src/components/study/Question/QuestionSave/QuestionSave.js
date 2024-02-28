import React from "react";
import {Container} from "react-bootstrap";
import QuestionSaveHeader from "./QuestionSaveHeader";
import QuestionSaveContents from "./QuestionSaveContents";

function QuestionSave() {
    return (
        <>
            <Container fluid className='bg-black'>
                <QuestionSaveHeader/>
                <QuestionSaveContents/>
            </Container>
        </>
    );
}

export default QuestionSave;
