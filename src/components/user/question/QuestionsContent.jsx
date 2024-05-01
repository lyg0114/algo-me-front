import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {backendQuestionApi} from "../../util/api/BackendQuestionApi";
import {useAuth} from "../../context/AuthContext";
import {handleLogError} from "../../util/Helpers";
import ListPagination from "../../common/ListPagination";
import ProfilInfo from "../../common/ProfilInfo";
import SearchIcon from "../../assets/svg/SearchIcon";
import QuestionPlusIcon from "../../assets/svg/QuestionPlusIcon";
import QuestionCard from "./QuestionCard";
import PaginationUtil from "../../util/PaginationUtil";
import {NavLink} from "react-router-dom";
import DummyQuestionCard from "./DummyQuestionCard";

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

function QuestionsContent() {
    const Auth = useAuth();
    const [isError, setError] = useState(null);
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const [questions, setQuestions] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const [pageCount, setPageCount] = useState(0);
    const [number, setNumber] = useState(0);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(0);
    const itemsPerPage = 12;
    const sectionSize = 10;

    useEffect(() => {
        fetchQuestions(0, itemsPerPage);
    }, [])

    const fetchQuestions = async (page, size) => {
        setLoading(true);
        setQuestions([]);
        let user = Auth.getUser();
        try {
            const response = await backendQuestionApi.getQuestions(user, page, size, searchInput);
            if (response.data === "") {
                return;
            }
            setQuestions(response.data.content);
            pagination(response);
        } catch (error) {
            handleLogError(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const pagination = (response) => {
        setPageCount(response.data.totalPages - 1);
        setNumber(response.data.number);
        const {startPage, endPage} = PaginationUtil(response, sectionSize);
        setStartPage(startPage);
        setEndPage(endPage);
    };

    const handlePageClick = async (index) => {
        fetchQuestions(index, itemsPerPage);
    };

    const handleSearchButtonClick = (e) => {
        e.preventDefault();
        fetchQuestions(0, itemsPerPage);
    };

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
                            <Row className='mt-1'>
                                <Col className="px-0" xs={9}>
                                    <input
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        style={searchInputStyle}
                                        className="form-control"
                                    />
                                </Col>
                                <Col className="px-0">
                                    <button
                                        style={searchButtonStyle} type="submit"
                                        className="btn btn-primary bg-gray-400"
                                        onClick={handleSearchButtonClick}
                                    >
                                        <SearchIcon style={{width: '20px', height: '20px', marginLeft: '2px'}}/>
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    </form>
                </Col>

                {/* 문제 등록 */}
                <Col xs={3} sm={2} md={1} lg={1} xl={1} xxl={1}>
                    <Row className='mt-1'>
                        <NavLink to="/save-question/" color='violet' as={NavLink}>
                            <Button className='bg-black border-black'>
                                <QuestionPlusIcon style={{width: '25px', height: '25px', color: '#bfbfbf'}}/>
                            </Button>
                        </NavLink>

                    </Row>
                </Col>
            </Row>

            {/* 최상단 고정을 위한 Empty Row*/}
            <Row>
                <Col className='p-3 mb-2'>Empty</Col>
            </Row>

            {loading && (
                <Row xs={1} md={2} lg={3} xl={4} xxl={4} className="g-4 mt-3 mb-3 pl-5 pr-5">
                    {Array.from({length: itemsPerPage}, (_, index) => (
                        <Col key={index}>
                            <DummyQuestionCard/>
                        </Col>
                    ))}
                </Row>)}

            {!loading && questions.length === 0 ? (
                <Row className="g-4 mt-3 pl-5 pr-5">
                    <Col>
                        <p style={{color: '#bfbfbf', textAlign: 'center'}}>데이터가 존재하지 않습니다.</p>
                    </Col>
                </Row>
            ) : (
                <Row xs={1} md={2} lg={3} xl={4} xxl={4} className="g-4 mt-3 pl-5 pr-5">
                    {questions.map((question, idx) => (
                        <Col key={idx}>
                            <QuestionCard
                                id={question.id}
                                title={question.title}
                                fromSource={question.fromSource}
                                reviewCount={question.reviewCount}
                                registDt={question.registDt}
                            />
                        </Col>
                    ))}
                </Row>
            )}

            {/* 페이지네이션*/}
            <Row className='mt-4'>
                <Col></Col>
                <Col xs='auto' md='auto' lg='auto' xl='auto' xxl='auto'>
                    {questions.length > 0 && (
                        <ListPagination
                            number={number}
                            pageCount={pageCount}
                            onPageClick={handlePageClick}
                            startPage={startPage}
                            endPage={endPage}
                        />
                    )}
                </Col>
                <Col></Col>
            </Row>

            <Row className='mt-4 md-4'>
            </Row>
        </>
    );
}

export default QuestionsContent;
