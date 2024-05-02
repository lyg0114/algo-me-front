import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import {useAuth} from "../../context/AuthContext";
import {BackendAuthApi as backendAuthApi} from "../../util/api/BackendAuthApi";
import {config} from "../../../Constants";
import {backendProfileApi} from "../../util/api/BackendProfileApi";
import {handleLogError} from "../../util/Helpers";
import {useNavigate} from "react-router-dom";

function ProfileSaveContent() {
    const Auth = useAuth();
    let user = Auth.getUser();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAndBindingProfile();
        fetchImage();
    }, []);

    const fetchAndBindingProfile = async () => {
        try {
            const response = await backendProfileApi.getProfile(user);
            // const response = await backendQuestionApi.getQuestion(user, id);
            setEmail(response.data.email);
            setUserName(response.data.userName);
        } catch (error) {
            handleLogError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchImage = async () => {
        try {
            const response = await fetch(
                config.url.API_BASE_URL + '/profile/thumnail', {
                    headers : {
                        'Authorization': backendAuthApi.bearerAuth(user)
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }

            const blob = await response.blob(); // 이미지 데이터를 Blob으로 가져옴
            const imgUrl = URL.createObjectURL(blob); // Blob을 URL로 변환
            setImageSrc(imgUrl);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    // TODO : 유효성 처리 로직 추가
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let profileInfo = {email, userName};
            const response = await backendProfileApi.updateProfile(profileInfo, user);
        } catch (error) {
            handleLogError(error)
        } finally {
            navigate('/view-profile');
        }
    };

    const handleUploadThumnail = async (event) => {
        event.preventDefault();
        if(selectedFile == null){
            alert("파일을 선택해 주세요.");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const response = await fetch(config.url.API_BASE_URL + '/profile/upload', {
                method: 'POST',
                body: formData,
                headers: {'Authorization': backendAuthApi.bearerAuth(user)}
            });

            if (response.ok) {
                alert('썸네일 수정이 완료되었습니다.')
                navigate('/view-profile');
                console.log('File uploaded successfully');
            } else {
                console.error('Failed to upload file:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    let colStyle = {
        paddingLeft: '12px',
        paddingRight: '12px',
        paddingTop: '7px',
        paddingBottom: '7px',
    };

    return (
        <Row className="g-4 mt-5 pl-5 pr-5" style={{height: '100%'}}>
            <Col xs='auto' md={2} sm={2} lg={2} xl={2} xxl={2}></Col>
            <Col xs='auto' md={8} sm={8} lg={8} xl={8} xxl={8}>
                {isLoading ? ( // 데이터 로딩 중일 때는 Spinner 표시
                    <div className="d-flex justify-content-center align-items-center" style={{minHeight: '80vh'}}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <div>
                        <Form className='header' style={{height: '100%', color: 'white', position: 'relative'}}>
                            <Form.Group as={Row} className="mb-3"> </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}> e-mail </Form.Label>
                                <Col sm={10} style={colStyle}>
                                    <Form.Control
                                        id="email" name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="text"/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}> 닉네임 </Form.Label>
                                <Col sm={5} style={colStyle}>
                                    <Form.Control
                                        id="userName" name="userName"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        type="text"/>
                                </Col>
                                <Col sm={5}></Col>
                            </Form.Group>
                            <Button onClick={handleSubmit}
                                    style={{
                                        position: 'relative',
                                        width: '70px',
                                        background: 'gray',
                                        borderColor: 'gray',
                                        marginTop: '20px'
                                    }}>수정</Button>
                        </Form>
                        <Form className='header' style={{ marginTop: '100px', height: '100%', color: 'white', position: 'relative'}}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}> 썸네일 </Form.Label>
                                <Col sm={5} style={colStyle}>
                                    <Form.Control
                                        id="file" name="file"
                                        onChange={handleFileChange}
                                        type="file"/>
                                </Col>
                                <Col sm={5}></Col>
                            </Form.Group>
                            {imageSrc && <img
                                src={imageSrc}
                                style={{width: '200px', height: '200px', borderRadius: '50%'}}
                                alt="Example" />}

                            <Button onClick={handleUploadThumnail}
                                    style={{
                                        position: 'relative',
                                        width: '150px',
                                        background: 'gray',
                                        borderColor: 'gray',
                                        marginTop: '20px'
                                    }}>썸네일 업로드</Button>
                        </Form>
                    </div>
                )}
            </Col>
            <Col sm={2} md={2} lg={2} xl={2} xxl={2}></Col>
        </Row>
    );
}

export default ProfileSaveContent;
