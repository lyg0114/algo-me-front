import React from "react";
import QuestionListHeader from "./QuestionListHeader";
import QuestionListContents from "./QuestionListContents";
import {Container} from "react-bootstrap";


function QuestionList() {
    return (
        <>
            <Container fluid style={{background: '#0f0f0f'}} className='bg-black'>
                <QuestionListHeader/>
                <QuestionListContents/>
            </Container>
        </>
    );
}

export default QuestionList;
