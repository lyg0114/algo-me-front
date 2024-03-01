import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {backendApi} from "../../util/BackendApi";
import {useAuth} from "../../context/AuthContext";
import {handleLogError} from "../../util/Helpers";
import ListPagination from "../../common/ListPagination";
import SideMenu from "../../common/SideMenu";
import SearchIcon from "../../assets/svg/SearchIcon";
import QuestionPlusIcon from "../../assets/svg/QuestionPlusIcon";

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
    const [questions, setQuestions] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [number, setNumber] = useState(0);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [first, setFirst] = useState(true);
    const [last, setLast] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        fetchQuestions(0, itemsPerPage);
    }, [itemsPerPage])

    const fetchQuestions = async (page, size) => {
        let user = Auth.getUser();
        try {
            const response = await backendApi.getQuestions(user, page, size, searchInput);

            if (response.data === "") {
                setQuestions([]);
                return;
            }

            setQuestions(response.data.content);
            setPageCount(response.data.totalPages - 1);
            setNumber(response.data.number);
            setFirst(response.data.first)
            setLast(response.data.last)

            const currentPage = response.data.number;
            const totalPageCount = response.data.totalPages;

            const tmpStartPage = Math.floor((currentPage) / itemsPerPage) * itemsPerPage + 1;
            setStartPage(tmpStartPage)
            const tmpEndPage = Math.min(tmpStartPage + itemsPerPage - 1, totalPageCount)
            setEndPage(tmpEndPage);
        } catch (error) {
            handleLogError(error);
            setError(error);
        } finally {
        }
    };

    const handlePageClick = async (index) => {
        fetchQuestions(index, itemsPerPage);
    };

    const handleSearchButtonClick = (e) => {
        e.preventDefault();
        console.log("Search button clicked!");
        fetchQuestions(0, itemsPerPage);
        // You can add your search logic here
    };

    return (
        <>
            <Row className="justify-content-between pl-3 pr-3 pt-4 pb-4 mb-2 fixed-top bg-black">
                {/* 사이드 바 */}
                <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                    <SideMenu/>
                </Col>

                {/* 검색 창 */}
                <Col xs={6} sm={7} md={8} lg={8} xl={8} xxl={8}>
                    <form>
                        <Container>
                            <Row>
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
                    <Button variant="primary" className='bg-black border-black'>
                        <QuestionPlusIcon style={{width: '25px', height: '25px', color: '#bfbfbf'}}/>
                    </Button>
                </Col>
            </Row>

            {/* 최상단 고정을 위한 Empty Row*/}
            <Row>
                <Col className='p-3 mb-2'>Empty</Col>
            </Row>

            {/* 내용 부분 */}
            <Row xs={1} md={2} lg={3} xl={4} xxl={4} className="g-4 mt-3 pl-5 pr-5">
                {questions.length === 0 ? (
                    <Col>
                        <p style={{color: '#bfbfbf', textAlign: 'center'}}>데이터가 존재하지 않습니다.</p>
                    </Col>
                ) : (
                    questions.map((question, idx) => (
                        <Col key={idx}>
                            <Card style={{borderColor: '#121212'}}>
                                <Card.Img variant="top"
                                          src="https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXJsfGVufDB8fDB8fHww"/>
                                <Card.Body style={{background: '#0f0f0f', color: '#bfbfbf'}}>
                                    <Card.Title>{question.title}</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>


            {/* 페이지네이션*/}
            <Row className='mt-4'>
                <Col></Col>
                <Col xs='auto' md='auto' lg='auto' xl='auto' xxl='auto'>
                    <ListPagination
                        number={number}
                        pageCount={pageCount}
                        onPageClick={handlePageClick}
                        startPage={startPage}
                        endPage={endPage}
                        first={first}
                        last={last}
                    />
                </Col>
                <Col></Col>
            </Row>
            <Row className='mt-4 md-4'>
            </Row>

        </>
    );
}

export default QuestionsContent;
