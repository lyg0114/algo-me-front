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
            const result = await response.json();
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
                            <pre>{JSON.stringify(questions, null, 2)}</pre>
                        </div>
                    )}
                </>
            )}
            <div>
                <button onClick={logout}>LOGOUT</button>
            </div>
        </div>
    );
};

export default HomeDashBoard
