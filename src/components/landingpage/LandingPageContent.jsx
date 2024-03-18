import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChartImage from '../assets/images/chart1.jpeg'
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

function LandingPageContent() {
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate(`/login`);
    }

    return (
        <>
            <Row style={{height: '100vh', background: 'rgb(15, 15, 15)'}}
                 className="justify-content-between align-items-center pl-3 pr-3 pt-4 pb-4 mb-2 fixed-top bg-black">
                <Col style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} xs={6} lg={4}>
                    <div style={{textAlign: 'center', fontSize:'xxx-large', color:'white'}}>
                        <div> HOW DO </div>
                        <div> YOU GET READY </div>
                        <div> FOR REVIEW </div>
                        <Button onClick={goToLogin} variant="secondary" size="lg"> GETTING STARTED </Button>
                    </div>
                </Col>
                <Col style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} xs={6} lg={8}>
                    <div style={{textAlign: 'center'}}>
                        <img src={ChartImage} alt="이미지 설명" style={{width: '100%', maxWidth: '1000px'}} />
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default LandingPageContent;





