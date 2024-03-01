import React, {useEffect, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {backendApi} from "../../util/BackendApi";
import {useAuth} from "../../context/AuthContext";
import {handleLogError} from "../../util/Helpers";
import ListPagination from "../../common/ListPagination";

function QuestionsContent() {
    const Auth = useAuth();
    const [isError, setError] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [number, setNumber] = useState(0);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [first, setFirst] = useState(true);
    const [last, setLast] = useState(false);


    useEffect(() => {
        fetchQuestions(0, itemsPerPage);
    }, [itemsPerPage])

    const fetchQuestions = async (page, size) => {
        let user = Auth.getUser();
        try {
            const response = await backendApi.getQuestions(user, page, size);
            console.log(response.data)

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

            console.log(`현재 페이지가 ${tmpStartPage}부터 ${tmpEndPage} 사이의 구간에 속합니다.`);

        } catch (error) {
            handleLogError(error);
            setError(error);
        } finally {
        }
    };

    const handlePageClick = async (index) => {
        fetchQuestions(index, itemsPerPage);
    };

    return (
        <>
            {/* 내용 부분 */}
            <Row xs={1} md={2} lg={3} xl={4} xxl={4} className="g-4 mt-3 pl-5 pr-5">
                {questions.map((question, idx) => (
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
                ))}
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
