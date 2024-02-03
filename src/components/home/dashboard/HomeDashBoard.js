import {useAuth} from "../../context/AuthContext";
import {orderApi} from "../../misc/OrderApi";
import {handleLogError} from "../../misc/Helpers";
import React, {useEffect, useState} from "react";
import QuestionCard from "../QuestionCard";
import {NavLink} from "react-router-dom";

function HomeDashBoard() {
    const Auth = useAuth();
    const [isError, setError] = useState(null);
    const [questions, setQuestions] = useState(null);
    const fetchQuestions = async () => {
        let user = Auth.getUser();
        try {
            const response = await orderApi.getQuestions(user);
            const result = await response.data.content;
            setQuestions(result);
        } catch (error) {
            handleLogError(error);
            setError(error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-end mb-4">
                    <NavLink className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to="/new-question" color='violet' as={NavLink}>REGISTER</NavLink>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {questions !== null &&
                        questions.map((question, index) => (
                            <QuestionCard
                                key={index}
                                id={question.id}
                                img={question.img}
                                title={question.title}
                                reviewCount={question.reviewCount}
                                registDt={question.registDt}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default HomeDashBoard
