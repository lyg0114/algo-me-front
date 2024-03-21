import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useAuth} from "../../../context/AuthContext";
import {useNavigate, useParams} from "react-router-dom";
import {handleLogError} from "../../../util/Helpers";
import {backendApi} from "../../../util/BackendApi";

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import {Viewer} from "@toast-ui/react-editor";

function QuestionViewContent() {
    const Auth = useAuth();
    let user = Auth.getUser();
    const editorRef = React.useRef();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [fromSource, setFromSource] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [content, setContent] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAndBindingQuestion();
        if (editorRef.current) {
            editorRef.current.getInstance().setMarkdown(content);
        }
    }, [content]);

    const fetchAndBindingQuestion = async () => {
        if (id) {
            try {
                const response = await backendApi.getQuestion(user, id);
                setQuestionType(response.data.questionType);
                setFromSource(response.data.fromSource);
                setTitle(response.data.title);
                setUrl(response.data.url);
                setContent(response.data.content);
            } catch (error) {
                handleLogError(error);
            }
        }
    };

    const goToUPdate = () => {
        navigate(`/save-question/${id}`);
    }

    let colStyle = {
        paddingLeft: '12px',
        paddingRight: '12px',
        paddingTop: '7px',
        paddingBottom: '7px',
    };

    return (
        <>
            <Row className="g-4 mt-5 pl-5 pr-5" style={{height: '100%'}}>
                <Col xs='auto' md={2} sm={2} lg={2} xl={2} xxl={2}></Col>
                <Col xs='auto' md={8} sm={8} lg={8} xl={8} xxl={8}>
                    <Form className='header' style={{height: '100%', color: 'white', position: 'relative'}}>
                        <Form.Group as={Row} className="mb-3"> </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Col sm={10} style={colStyle}>
                            </Col>
                            <Col sm={2} className="text-end"> {/* 오른쪽 정렬을 위해 text-end 클래스 추가 */}
                                <Button onClick={goToUPdate}
                                        style={{
                                            position:'relative',
                                            width: '70px',
                                            background: 'gray',
                                            borderColor: 'gray'
                                        }}>수정</Button>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}> 제목 </Form.Label>
                            <Col sm={10} style={colStyle}>
                                <div>{title}</div>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}> 출처 </Form.Label>
                            <Col sm={5} style={colStyle}>
                                <div>{fromSource}</div>
                            </Col>
                            <Col sm={5}></Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}> 유형 </Form.Label>
                            <Col sm={5} style={colStyle}>
                                <div>{questionType}</div>
                            </Col>
                            <Col sm={5}></Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                내용
                            </Form.Label>
                            <Col sm={10}>
                                <Viewer
                                    initialValue={content}
                                    previewStyle="vertical"
                                    height="600px"
                                    initialEditType="markdown"
                                    useCommandShortcut={true}
                                    ref={editorRef}
                                    theme="dark"
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm={2} md={2} lg={2} xl={2} xxl={2}></Col>
            </Row>
        </>
    );
}

export default QuestionViewContent;
