import React from "react";
import {Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListPagination from "../../common/ListPagination";
import {useQuestion} from "./QuestionsContext";


function QuestionsContent() {
    let questionCtx = useQuestion();
    let questions = questionCtx.questions;
    if (questions == null) {
        return (<> Loading </>);
    }

    return (
        <>
            {/* 내용 부분 */}
            <Row xs={1} md={2} lg={3} xl={4} xxl={4} className="g-4 mt-3 pl-5 pr-5">
                {questions.map((question, idx) => (
                    <Col key={idx}>
                        <Card style={{borderColor: "#121212"}}>
                            <Card.Img
                                variant="top"
                                src={
                                    question.imageSrc ||
                                    "https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXJsfGVufDB8fDB8fHww"
                                }
                            />
                            <Card.Body style={{background: "#0f0f0f", color: "#bfbfbf"}}>
                                <Card.Title>{question.title}</Card.Title>
                                <Card.Text> {question.registDt} </Card.Text>
                                <Card.Text> {question.reviewCount} </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* 페이지네이션*/}
            <Row className='mt-4'>
                <Col></Col>
                <Col xs='auto' md='auto' lg='auto' xl='auto' xxl='auto'>
                    <ListPagination/>
                </Col>
                <Col></Col>
            </Row>
            <Row className='mt-4 md-4'>
            </Row>
        </>
    );
}

export default QuestionsContent;
