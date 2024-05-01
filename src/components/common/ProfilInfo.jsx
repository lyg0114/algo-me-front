import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Container, Dropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {useEffect, useState} from "react";
import {BackendAuthApi as backendAuthApi} from "../util/api/BackendAuthApi";
import {config} from "../../Constants";

function ProfilInfo() {
    const Auth = useAuth();
    let user = Auth.getUser();
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(null);
    const goToMain = () => { navigate(`/main`); }

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

    return (
        <>
            <div style={{color: '#bfbfbf', marginTop: '8px'}}>
                <Container>
                    <Row>
                        <Col xs={6} sm={6} md={3} lg={4} xl={4} xxl={3}>
                            <div className='mt-1' onClick={goToMain} style={{cursor: 'pointer'}}>ALGO-MI</div>
                        </Col>
                        <Col xs={6} sm={6} md={9} lg={8} xl={8} xxl={9}>
                            <div className="d-flex justify-content-start">
                                <Dropdown>
                                    <Dropdown.Toggle className='bg-black border-black p-0' id="dropdown-basic"
                                                     aria-haspopup="true">

                                        {/* TODO : 화면 랜더링시 썸네일 이미지가 깜빡이는 오류 개선 필요*/}
                                        <img
                                            style={{width: '40px', height: '40px', borderRadius: '50%'}}
                                            src={imageSrc}
                                            alt="Profile"
                                        />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu variant="dark">
                                        {/* TODO : api 로부터 가져와서 동적으로 처리되도록 작업 필요*/}
                                        <Dropdown.Item style={{backgroundColor: '#343a40'}} href="/main">메인화면</Dropdown.Item>
                                        <Dropdown.Item style={{backgroundColor: '#343a40'}} href="/view-profile">프로필</Dropdown.Item>
                                        <Dropdown.Item style={{backgroundColor: '#343a40'}} href="/logout">로그아웃</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <style>
                {`
                .dropdown-toggle::after {
                    display: none !important;
                }
                `}
            </style>
        </>
    );
}

export default ProfilInfo;

