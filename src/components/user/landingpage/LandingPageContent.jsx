import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function LandingPageContent() {
    return (
        <>
            <Row style={{ height: '100%', background: 'rgb(15, 15, 15)' }} className="justify-content-between pl-3 pr-3 pt-4 pb-4 mb-2 fixed-top bg-black">
                <Col style={{ height: '100%' }} className='' xs={6} lg={6}>
                    CONTENT
                </Col>
                <Col style={{ height: '100%' }} className='' xs={6} lg={6}>
                    CONTENT
                </Col>
            </Row>
        </>
    );
}

export default LandingPageContent;





