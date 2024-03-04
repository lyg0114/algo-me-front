import React from "react";
import {Col, Row} from "react-bootstrap";
import SideMenu from "../../../common/SideMenu";


function QuestionSaveHeader() {
    return (
        <>
            <Row className="justify-content-between pl-3 pr-3 pt-4 pb-4 mb-2 fixed-top bg-black">
                {/* 사이드 바 */}
                <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                    <SideMenu/>
                </Col>
                {/* Dummy */}
                <Col xs={9} sm={9} md={9} lg={9} xl={9} xxl={9}>
                </Col>
            </Row>
            {/* 최상단 고정을 위한 Empty Row*/}
            <Row>
                <Col className='p-3 mb-2'>Empty</Col>
            </Row>
        </>
    );
}

export default QuestionSaveHeader;
