import {useAuth} from "../../../context/AuthContext";
import {orderApi} from "../../../util/OrderApi";
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

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        let user = Auth.getUser();
        try {
            const response = await orderApi.getQuestions(user);
            const result = await response.data.content;
            setTimeout(() => {
                setQuestions(prevItems => prevItems.concat(result));
            }, 1500);
        } catch (error) {
            handleLogError(error);
            setError(error);
        }
    };

    const getQuestionDetail = async (id) => {
        let user = Auth.getUser();
        try {
            const response = await orderApi.getQuestion(user, id);
            setQuestion(response.data);
            setIsViewDetailModalOpen(true);
        } catch (error) {
            handleLogError(error);
            setError(error);
        }
    }

    const closeModalAndGoToHome = () => {
        setIsViewDetailModalOpen(false);
        fetchQuestions();
        navigate('/');
    };

    return (
        <div className="bg-white">
            <ViewDetailModal
                isOpen={isViewDetailModalOpen}
                closeModalAndGoToHome={closeModalAndGoToHome}
                question={question}
            />

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-end mb-4">
                    <NavLink className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                             to="/save-question/" color='violet' as={NavLink}>문제등록</NavLink>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    <InfiniteScroll
                        dataLength={questions.length}
                        next={fetchQuestions}
                        hasMore={true}
                        loader={<h2>Loading...</h2>}
                    >
                        {questions.map((question, index) => (
                            <QuestionCard
                                key={index}
                                id={question.id}
                                img={question.img}
                                title={question.title}
                                reviewCount={question.reviewCount}
                                registDt={question.registDt}
                                getQuestionDetail={getQuestionDetail}
                            />
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
}

export default HomeDashBoard
