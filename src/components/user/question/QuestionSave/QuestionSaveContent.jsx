import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useAuth} from "../../../context/AuthContext";
import {useNavigate, useParams} from "react-router-dom";
import {handleLogError} from "../../../util/Helpers";
import {backendApi} from "../../../util/BackendApi";

function QuestionSaveContent() {
    const Auth = useAuth();
    let user = Auth.getUser();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [fromSource, setFromSource] = useState('');
    const [questionType, setQuestionType] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        fetchAndBindingQuestion();
    }, []);

    const fetchAndBindingQuestion = async () => {
        if (id) {
            try {
                const response = await backendApi.getQuestion(user, id);
                setQuestionType(response.data.questionType);
                setFromSource(response.data.fromSource);
                setTitle(response.data.title);
                setUrl(response.data.url);
            } catch (error) {
                handleLogError(error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
        try {
            if (id) {
                response = await backendApi.updateQuestion(id, {title, url, fromSource, questionType}, user);
            } else {
                response = await backendApi.addQuestion({title, url, fromSource, questionType}, user);
            }
            clearInput();
            navigate('/');
        } catch (error) {
            handleLogError(error)
            setIsError(true)
        }
    };

    const clearInput = () => {
        setIsError(false);
        setTitle("");
        setUrl("");
        setFromSource("");
        setQuestionType("");
    }

    return (
        <>
            <Row className="g-4 mt-5 pl-5 pr-5" style={{height: '100vh'}}>
                <Col xs='auto' md={2} sm={2} lg={2} xl={2} xxl={2}></Col>
                <Col xs='auto' md={8} sm={8} lg={8} xl={8} xxl={8}>
                    <Form className='header' onSubmit={handleSubmit}
                          style={{height: '100%', color: 'white', position: 'relative'}}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}> 유형 </Form.Label>
                            <Col sm={5}>
                                <Form.Select id='questionType'
                                             name='questionType'
                                             value={questionType}
                                             onChange={(e) => setQuestionType(e.target.value)}
                                             aria-label="Default select example">
                                    <option value="">선택</option>
                                    <option value="GREEDY">GREEDY</option>
                                    <option value="DP">DP</option>
                                    <option value="DFS">DFS</option>
                                    <option value="BFS">BFS</option>
                                </Form.Select>
                            </Col>
                            <Col sm={5}></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}> 출처 </Form.Label>
                            <Col sm={5}>
                                <Form.Select id="fromSource"
                                             name="fromSource"
                                             value={fromSource}
                                             onChange={(e) => setFromSource(e.target.value)}
                                             aria-label="Default select example">
                                    <option value="">선택</option>
                                    <option value="LEETCODE">LEETCODE</option>
                                    <option value="백준">백준</option>
                                    <option value="프로그래머스">프로그래머스</option>
                                </Form.Select>
                            </Col>
                            <Col sm={5}></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}> 제목 </Form.Label>
                            <Col sm={10}>
                                <Form.Control id="title"
                                              name="title"
                                              value={title}
                                              type="text"
                                              onChange={(e) => setTitle(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                URL
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    id="url" name="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    type="text"/>
                            </Col>
                        </Form.Group>
                        <Button style={{
                            position: 'absolute',
                            right: 0,
                            marginTop: '7px',
                            marginLeft: '7px'
                        }} type="submit">저장</Button>
                    </Form>
                </Col>
                <Col sm={2} md={2} lg={2} xl={2} xxl={2}></Col>
            </Row>
        </>
    );
}

export default QuestionSaveContent;