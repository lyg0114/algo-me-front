import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image';
import {Container} from "react-bootstrap";
import ProfileImage from '../assets/images/profil.jpeg';

function ProfilInfo() {
    return (
        <>
            <div style={{color: '#bfbfbf', marginTop: '8px'}}>
                <Container>
                    <Row>
                        <Col xs={6} sm={6} md={3} lg={4} xl={4} xxl={3}>
                            <div className='mt-1'>ALGO-MI</div>
                        </Col>
                        <Col xs={6} sm={6} md={9} lg={8} xl={8} xxl={9}>
                            <div className="d-flex justify-content-start">
                                <Image style={{width: '40px', height: '40px'}} src={ProfileImage} roundedCircle/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default ProfilInfo;
