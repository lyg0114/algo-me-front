import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";


const buttonStyle = {
    marginLeft: '7px'
}

function QuestionSaveContents() {
    return (
        <>
            {/* 내용 부분 */}
            <Row className="g-4 mt-5 pl-5 pr-5" style={{height: '100vh'}}>
                <Col xs='auto' md={2} sm={2} lg={2} xl={2} xxl={2}></Col>
                <Col xs='auto' md={8} sm={8} lg={8} xl={8} xxl={8}>
                    <Form style={{height: '100%', color: 'white'}}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}> 유형 </Form.Label>
                            <Col sm={5}>
                                <Form.Select aria-label="Default select example">
                                    <option value="">선택</option>
                                    <option value="GREEDY">GREEDY</option>
                                    <option value="DP">DP</option>
                                    <option value="DFS">DFS</option>
                                    <option value="BFS">BFS</option>
                                </Form.Select>
                            </Col>
                            <Col sm={5}></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}> 출처 </Form.Label>
                            <Col sm={5}>
                                <Form.Select aria-label="Default select example">
                                    <option value="">선택</option>
                                    <option value="LEETCODE">LEETCODE</option>
                                    <option value="백준">백준</option>
                                    <option value="프로그래머스">프로그래머스</option>
                                </Form.Select>
                            </Col>
                            <Col sm={5}></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}> 제목 </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                URL
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col xs={2} sm={6} md={7} lg={8} xl={8} xxl={9}></Col>
                            <Col xs={3} sm={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={7} sm={5} md={4} lg={3} xl={3} xxl={2}>
                                <Button style={buttonStyle} type="submit">등록</Button>
                                <Button style={buttonStyle} type="submit">취소</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm={2} md={2} lg={2} xl={2} xxl={2}></Col>
            </Row>
        </>
    );
}

export default QuestionSaveContents;
