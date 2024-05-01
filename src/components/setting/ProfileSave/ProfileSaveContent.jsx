import React, {useEffect, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import {useAuth} from "../../context/AuthContext";
import {BackendAuthApi as backendAuthApi} from "../../util/api/BackendAuthApi";
import {config} from "../../../Constants";

function ProfileSaveContent() {
    const Auth = useAuth();
    let user = Auth.getUser();
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        // 이미지를 가져오는 함수
        async function fetchImage() {
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
        fetchImage();
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const response = await fetch(config.url.API_BASE_URL + '/profile/upload', {
                method: 'POST',
                body: formData,
                headers: {'Authorization': backendAuthApi.bearerAuth(user)}
            });

            if (response.ok) {
                alert('File uploaded successfully')
                console.log('File uploaded successfully');
            } else {
                console.error('Failed to upload file:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    return (
        <>
            <Row className="g-4 mt-5 pl-5 pr-5" style={{height: '100vh'}}>
                <Col xs='auto' md={2} sm={2} lg={2} xl={2} xxl={2}></Col>
                <Col xs='auto' md={8} sm={8} lg={8} xl={8} xxl={8}>
                    <div>
                        <form>
                            <input type="file" onChange={handleFileChange} />
                            <Button onClick={handleUpload}
                                    style={{
                                        position: 'relative',
                                        width: '70px',
                                        background: 'gray',
                                        borderColor: 'gray'
                                    }}>업로드</Button>
                        </form>
                    </div>
                    {imageSrc && <img
                        src={imageSrc}
                        style={{width: '200px', height: '200px', borderRadius: '50%'}}
                        alt="Example" />}
                </Col>
                <Col sm={2} md={2} lg={2} xl={2} xxl={2}></Col>
            </Row>
        </>

    );
}

export default ProfileSaveContent;
