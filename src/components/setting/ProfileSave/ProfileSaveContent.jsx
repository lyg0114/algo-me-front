import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import {useAuth} from "../../context/AuthContext";
import {backendQuestionApi} from "../../util/api/BackendQuestionApi";
import {handleLogError} from "../../util/Helpers";
import {BackendProfileApi} from "../../util/api/BackendProfileApi";

function ProfileSaveContent() {
    const Auth = useAuth();
    let user = Auth.getUser();
    const editorRef = React.useRef();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [fromSource, setFromSource] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isSaveLoading, setIsSaveLoading] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchAndBindingQuestion();
    }, []);

    const fetchAndBindingQuestion = async () => {
        try {
            if (id) {
                const response = await backendQuestionApi.getQuestion(user, id);
                validate(response);
                setQuestionType(response.data.questionType);
                setFromSource(response.data.fromSource);
                setTitle(response.data.title);
                setUrl(response.data.url);
                setContent(response.data.content);
            }
        } catch (error) {
            handleLogError(error);
        } finally {
            setIsPageLoading(false);
        }
    };

    const validate = (response) => {
        if (response.data.content == null) {
            response.data.content = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
        let content = editorRef.current.getInstance().getMarkdown();
        let question = {title, url, fromSource, questionType, content};

        try {
            setIsSaveLoading(true);
            if (id) {
                response = await backendQuestionApi.updateQuestion(id, question, user);
                clearInput();
                navigate('/view-question/' + id);
            } else {
                response = await backendQuestionApi.addQuestion(question, user);
                clearInput();
                navigate('/view-question/' + response.data.id);
            }
        } catch (error) {
            handleLogError(error)
        } finally {
            setIsSaveLoading(false);
        }
    };

    const clearInput = () => {
        setTitle("");
        setUrl("");
        setFromSource("");
        setQuestionType("");
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleUpload = () => {
        debugger
        BackendProfileApi.uploadThumnail(selectedFile, user);
    };

    let colStyle = {
        paddingLeft: '0px',
        paddingRight: '0px'
    };

    return (
        <>
            {isPageLoading ? ( // 로딩 중일 때
                <div className="d-flex justify-content-center align-items-center" style={{minHeight: '80vh'}}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Row className="g-4 mt-5 pl-5 pr-5" style={{height: '100vh'}}>
                    <Col xs='auto' md={2} sm={2} lg={2} xl={2} xxl={2}></Col>
                    <Col xs='auto' md={8} sm={8} lg={8} xl={8} xxl={8}>

                        <Form className='header' onSubmit={handleSubmit} style={{height: '50%', color: 'white', position: 'relative'}}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}> 사용자명 </Form.Label>
                                <Col sm={10} style={colStyle}>
                                    <Form.Control
                                        id="title"
                                        name="title"
                                        value={title}
                                        type="text"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>

                            <Button style={{
                                position: 'absolute',
                                right: 0,
                                marginTop: '7px',
                                marginLeft: '7px'
                            }} type="submit" disabled={isSaveLoading}>
                                {isSaveLoading ? (
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                ) : (
                                    '저장'
                                )}
                            </Button>
                        </Form>

                        <div>
                            <form>
                                <input type="file" onChange={handleFileChange} />
                                <button onClick={handleUpload}>Upload</button>
                            </form>
                        </div>


                    </Col>
                    <Col sm={2} md={2} lg={2} xl={2} xxl={2}></Col>
                </Row>
            )}
        </>
    );
}

export default ProfileSaveContent;
