import {createContext, useContext, useEffect, useState} from 'react';

export const QuestionsContext = createContext();

function QuestionsProvider({children}) {
    const [question, setQuestion] = useState(null)
    useEffect(() => {
        setQuestion("TEST DATA");
    }, [])

    const getQuestion = () => {
        return question;
    }

    const contextValue = {
        getQuestion
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
