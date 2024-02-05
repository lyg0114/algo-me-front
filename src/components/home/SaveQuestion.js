import React, {useState} from 'react'
import {NavLink, useNavigate} from "react-router-dom"; // useNavigate 추가
import {handleLogError} from "../misc/Helpers";
import {orderApi} from "../misc/OrderApi";
import {useAuth} from "../context/AuthContext";
import SaveCompleteModal from "./modal/SaveCompleteModal";


function SaveQuestion() {
    const Auth = useAuth();
    let user = Auth.getUser();
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [fromSource, setFromSource] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [isError, setIsError] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await orderApi.saveQuestions({title, url, fromSource, questionType}, user);
            openModal(response);
        } catch (error) {
            handleLogError(error)
            setIsError(true)
        }
    };

    const openModal = () => {
        setMessage("등록이 완료되었습니다.");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        clearInput();
        navigate('/');
    };

    const clearInput = () => {
        setIsError(false);
        setTitle("");
        setUrl("");
        setFromSource("");
        setQuestionType("");
    }

    return (
        <div className="bg-white">
            <SaveCompleteModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                message={message}
            />

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="questionType" className="block text-sm font-medium text-gray-700">
                            문제유형
                        </label>
                        <select
                            id="questionType"
                            name="questionType"
                            value={questionType}
                            onChange={(e) => setQuestionType(e.target.value)}
                            className="mt-1 p-2 w-1/4 border rounded-md"
                            required
                        >
                            <option value="">문제유형 선택</option>
                            <option value="GREEDY">GREEDY</option>
                            <option value="DP">DP</option>
                            <option value="DFS">DFS</option>
                            <option value="BFS">BFS</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fromSource" className="block text-sm font-medium text-gray-700">
                            출처
                        </label>
                        <select
                            id="fromSource"
                            name="fromSource"
                            value={fromSource}
                            onChange={(e) => setFromSource(e.target.value)}
                            className="mt-1 p-2 w-1/4 border rounded-md"
                            required
                        >
                            <option value="">출처 선택</option>
                            <option value="LEETCODE">LEETCODE</option>
                            <option value="백준">백준</option>
                            <option value="프로그래머스">프로그래머스</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            제목
                        </label>
                        <input
                            placeholder={"제목을 입력하세요"}
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                            URL
                        </label>
                        <input
                            placeholder={"URL을 입력하세요"}
                            type="text"
                            id="url"
                            name="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <div className="flex justify-end mb-8">
                        <NavLink
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                            to="/"
                            color='violet'
                            as={NavLink}>취소</NavLink>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            등록
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SaveQuestion
