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
        <div>
            <div>Login HOME</div>
            {isError ? (
                <div>
                    <div>Fail to fetch data</div>
                </div>
            ) : (
                <>
                    {questions && (
                        <div>
                            <h2>Questions:</h2>
                            <div className="container mx-auto my-96">
                                <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
                                    {questions.map((question, index) => (
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
                    )}
                </>
            )}
            <div>
                <button onClick={logout}>LOGOUT</button>
            </div>
        </div>
    );
}

export default HomeDashBoard
