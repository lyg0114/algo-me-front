import {useAuth} from "../../context/AuthContext";
import {orderApi} from "../../misc/OrderApi";
import {handleLogError} from "../../misc/Helpers";
import {useEffect, useState} from "react";

function HomeDashBoard() {
    const Auth = useAuth();
    const [isError, setError] = useState(null);
    const [questions, setQuestions] = useState(null);

    const fetchQuestions = async () => {
        let user = Auth.getUser();
        try {
            const response = await orderApi.getQuestions(user);
            const result = await response.data.content; // 변경된 부분: response.data가 아닌 response.json()을 사용
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
                            <ul>
                                {questions.map((question) => (
                                    <li key={question.id}>
                                        <div>
                                            <strong>Title:</strong> {question.title}
                                        </div>
                                        <div>
                                            <strong>URL:</strong>{" "}
                                            <a href={question.url} target="_blank" rel="noopener noreferrer">
                                                {question.url}
                                            </a>
                                        </div>
                                        <div>
                                            <strong>Source:</strong> {question.fromSource}
                                        </div>
                                        {/* Add more fields as needed */}
                                    </li>
                                ))}
                            </ul>
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
