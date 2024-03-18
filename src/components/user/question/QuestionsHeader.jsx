import {Button, Col, Container, Row} from "react-bootstrap";
import ProfilInfo from "../../common/ProfilInfo";
import SearchIcon from "../../assets/svg/SearchIcon";
import QuestionPlusIcon from "../../assets/svg/QuestionPlusIcon";
import React from "react";

const searchInputStyle = {
    borderTopLeftRadius: '40px',
    borderBottomLeftRadius: '40px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    background: '#121212',
    borderColor: '#303030',
    color: '#fff',
    height: '50px',
};

const searchButtonStyle = {
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    borderTopRightRadius: '40px',
    borderBottomRightRadius: '40px',
    width: '54px',
    height: '50px',
    background: '#222222',
    borderColor: '#303030',
};

function QuestionsHeader() {
    return (
        <>
            <Row className="justify-content-between pl-3 pr-3 pt-4 pb-4 mb-2 fixed-top bg-black">
                {/* 사이드 바 */}
                <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                    <ProfilInfo/>
                </Col>

                {/* 검색 창 */}
                <Col xs={6} sm={7} md={8} lg={8} xl={8} xxl={8}>
                    <form>
                        <Container>
                            <Row>
                                <Col className="px-0" xs={9}>
                                    <input style={searchInputStyle} className="form-control"/>
                                </Col>
                                <Col className="px-0">
                                    <button style={searchButtonStyle} type="submit"
                                            className="btn btn-primary bg-gray-400">
                                        <SearchIcon style={{width: '20px', height: '20px', marginLeft: '2px'}}/>
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    </form>
                </Col>

                {/* 문제 등록 */}
                <Col xs={3} sm={2} md={1} lg={1} xl={1} xxl={1}>
                    <Button variant="primary" className='bg-black border-black'>
                        <QuestionPlusIcon style={{width: '25px', height: '25px', color: '#bfbfbf'}}/>
                    </Button>
                </Col>
            </Row>

            {/* 최상단 고정을 위한 Empty Row*/}
            <Row>
                <Col className='p-3 mb-2'>Empty</Col>
            </Row>
        </>
    );
}

export default QuestionsHeader;
