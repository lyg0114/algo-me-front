import {useAuth} from "../../context/AuthContext";
import {orderApi} from "../../misc/OrderApi";
import {handleLogError} from "../../misc/Helpers";
import React, {useEffect, useState} from "react";
import QuestionCard from "../QuestionCard";

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

    const logout = () => {
        Auth.userLogout();
    };

    return (
        <div className="bg-white">
            <nav className="bg-gray-800 p-4 fixed top-0 w-full z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white font-bold text-lg">ALGO-MI</div>
                    <div className="flex space-x-4">
                        {/* 여기에 다른 네비게이션 링크들을 추가할 수 있습니다. */}
                        <button onClick={logout} className="bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-600 transition duration-300">
                           LOGOUT
                        </button>
                    </div>
                </div>
            </nav>


            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {questions !== null && questions.map((question,index) => (
                        <QuestionCard
                            key={index}
                            _id={question.id}
                            img={question.img}
                            title={question.title}
                            reviewCount={question.reviewCount}
                            registDt={question.registDt}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeDashBoard
