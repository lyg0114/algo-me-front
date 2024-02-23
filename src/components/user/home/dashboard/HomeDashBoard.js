import {useAuth} from "../../../context/AuthContext";
import {backendApi} from "../../../util/BackendApi";
import {handleLogError} from "../../../util/Helpers";
import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import ViewDetailModal from "../modal/ViewDetailModal";
import InfiniteScroll from "react-infinite-scroll-component";
import QuestionCard from "../QuestionCard";

function HomeDashBoard() {
    const Auth = useAuth();
    const [isError, setError] = useState(null);
    const [question, setQuestion] = useState(null);
    const [isViewDetailModalOpen, setIsViewDetailModalOpen] = useState(false);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(12);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchQuestions();
    }, []); // useEffect를 searchTerm에 의존하도록 수정

    const fetchQuestions = async () => {
        let user = Auth.getUser();
        try {
            const response = await backendApi.getQuestions(user, page, size, searchTerm);
            if (response.data != "") {
                const result = await response.data.content;
                setHasMore(!response.data.last);
                setTimeout(() => {
                    setQuestions(prevItems => prevItems.concat(result));
                }, 0);
                setPage(page + 1);

            } else {
                console.log("#######")
                console.log("empty")
                console.log("#######")
            }
        } catch (error) {
            handleLogError(error);
            setError(error);
        } finally {
            console.log(page)
        }
    };

    const getQuestionDetail = async (id) => {
        let user = Auth.getUser();
        try {
            const response = await backendApi.getQuestion(user, id);
            setQuestion(response.data);
            setIsViewDetailModalOpen(true);
        } catch (error) {
            handleLogError(error);
            setError(error);
        }
    };

    const closeModalAndGoToHome = () => {
        setIsViewDetailModalOpen(false);
        navigate('/');
    };

    const handleSearch = () => {
        console.log("call - handleSearch");
        setPage(0); // 페이지 초기화
        setQuestions([]); // 질문 목록 초기화
        fetchQuestions(); // 새로운 검색어로 데이터 가져오기
    };

    return (
        <div className="bg-white">
            <ViewDetailModal
                isOpen={isViewDetailModalOpen}
                closeModalAndGoToHome={closeModalAndGoToHome}
                question={question}
            />

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mr-2 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            style={{width: "400px"}}
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            검색
                        </button>
                    </div>
                    <NavLink
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        to="/save-question/"
                        color="violet"
                        as={NavLink}
                    >
                        문제등록
                    </NavLink>
                </div>

                <InfiniteScroll
                    dataLength={questions.length}
                    next={fetchQuestions}
                    hasMore={hasMore}
                    loader={<h2>Loading...</h2>}
                >
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {questions.map((question, index) => (
                            <QuestionCard
                                key={index}
                                id={question.id}
                                img={question.img}
                                title={question.title}
                                fromSource={question.fromSource}
                                reviewCount={question.reviewCount}
                                registDt={question.registDt}
                                getQuestionDetail={getQuestionDetail}
                            />
                        ))}
                    </div>

                </InfiniteScroll>
            </div>
        </div>
    );
}

export default HomeDashBoard;
