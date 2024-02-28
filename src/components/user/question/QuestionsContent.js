import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListPagination from "../../common/ListPagination";
import {useQuestionContext} from "./QuestionsContext";


function QuestionsContent() {
    return (
        <>
            {/* 내용 부분 */}
            <Row xs={1} md={2} lg={3} xl={4} xxl={4} className="g-4 mt-3 pl-5 pr-5">
                {Array.from({length: 8}).map((_, idx) => (
                    <Col key={idx}>
                        <Card style={{borderColor: '#121212'}}>
                            <Card.Img variant="top"
                                      src="https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXJsfGVufDB8fDB8fHww"/>
                            <Card.Body style={{background: '#0f0f0f', color: '#bfbfbf'}}>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
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
