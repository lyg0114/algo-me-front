import React from "react";
import {Container} from "react-bootstrap";
import QuestionSaveHeader from "../QuestionSave/QuestionSaveHeader";
import QuestionViewContent from "./QuestionViewContent";

function QuestionViewLayout() {
    return (
        <>
            <Container fluid className='bg-black'>
                <QuestionSaveHeader/>
                <QuestionViewContent/>
            </Container>
        </>
    );
}

export default QuestionViewLayout;
