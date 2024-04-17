import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Container, Dropdown} from "react-bootstrap";
import ProfileImage from '../assets/images/profil.jpeg';
import {useNavigate} from "react-router-dom";

function ProfilInfo() {
    const navigate = useNavigate();
    const goToMain = () => {
        navigate(`/main`);
    }

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
                                        <img
                                            style={{width: '40px', height: '40px', borderRadius: '50%'}}
                                            src={ProfileImage}
                                            alt="Profile"
                                        />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu variant="dark">
                                        <Dropdown.Item style={{backgroundColor: '#343a40'}} href="/main">메인화면</Dropdown.Item>
                                        <Dropdown.Item style={{backgroundColor: '#343a40'}} href="/setting/profile">프로필</Dropdown.Item>
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

