import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import {useAuth} from "../../context/AuthContext";

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
    // const [isPageLoading, setIsPageLoading] = useState(true);
    const [isSaveLoading, setIsSaveLoading] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('name', 'test');
        try {
            const response = await fetch('http://localhost:3000/api/profile/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTQyOTI5NTksImlhdCI6MTcxNDI4OTM1OSwianRpIjoiNzE2YjY2NjQtMzdkYS00ZWIzLWJhNWEtMDk0MTNjOGUxMTk2IiwiaXNzIjoib3JkZXItYXBpIiwiYXVkIjoib3JkZXItYXBwIiwic3ViIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGVzIjpbIlVTRVIiXSwibmFtZSI6Imt5bGUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIn0.WdWtLdrX0ncBQ_BLYfXEPCGQ7TOCz04-3VPBIk304SI',
                }
            });

            if (response.ok) {
                console.log('File uploaded successfully');
            } else {
                console.error('Failed to upload file:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    let colStyle = {
        paddingLeft: '0px',
        paddingRight: '0px'
    };

    return (
        <>
            <Row className="g-4 mt-5 pl-5 pr-5" style={{height: '100vh'}}>
                <Col xs='auto' md={2} sm={2} lg={2} xl={2} xxl={2}></Col>
                <Col xs='auto' md={8} sm={8} lg={8} xl={8} xxl={8}>

                    {/*<Form className='header' onSubmit={handleSubmit} style={{height: '50%', color: 'white', position: 'relative'}}>*/}
                    {/*    <Form.Group as={Row} className="mb-3">*/}
                    {/*        <Form.Label column sm={2}> 사용자명 </Form.Label>*/}
                    {/*        <Col sm={10} style={colStyle}>*/}
                    {/*            <Form.Control*/}
                    {/*                id="title"*/}
                    {/*                name="title"*/}
                    {/*                value={title}*/}
                    {/*                type="text"*/}
                    {/*                onChange={(e) => setTitle(e.target.value)}*/}
                    {/*            />*/}
                    {/*        </Col>*/}
                    {/*    </Form.Group>*/}

                    {/*    <Button style={{*/}
                    {/*        position: 'absolute',*/}
                    {/*        right: 0,*/}
                    {/*        marginTop: '7px',*/}
                    {/*        marginLeft: '7px'*/}
                    {/*    }} type="submit" disabled={isSaveLoading}>*/}
                    {/*        {isSaveLoading ? (*/}
                    {/*            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>*/}
                    {/*        ) : (*/}
                    {/*            '저장'*/}
                    {/*        )}*/}
                    {/*    </Button>*/}
                    {/*</Form>*/}

                    <div>
                        <form>
                            <input type="file" onChange={handleFileChange} />
                            <button onClick={handleUpload}>Upload</button>
                        </form>
                    </div>


                </Col>
                <Col sm={2} md={2} lg={2} xl={2} xxl={2}></Col>
            </Row>
        </>

    );
}

export default ProfileSaveContent;
