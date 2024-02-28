import {createContext, useContext, useEffect, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import {backendApi} from "../../util/BackendApi";
import {handleLogError} from "../../util/Helpers";

export const QuestionsContext = createContext();

function QuestionsProvider({children}) {
    const Auth = useAuth();
    const [isError, setError] = useState(null);
    const [questions, setQuestion] = useState(null)
    useEffect(() => {
        fetchQuestions(0,10);
    }, [])

    const fetchQuestions = async (page, size) => {
        let user = Auth.getUser();
        try {
            const response = await backendApi.getQuestions(user, page, size);
            setQuestion(response.data.content);
        } catch (error) {
            handleLogError(error);
            setError(error);
        } finally {

        }
    };

    const contextValue = {
        questions,
        fetchQuestions
    }

    return (
        <QuestionsContext.Provider value={contextValue}>
            {children}
        </QuestionsContext.Provider>
    )
}

export default QuestionsContext

export function useQuestion() {
    return useContext(QuestionsContext)
}

export { QuestionsProvider }
