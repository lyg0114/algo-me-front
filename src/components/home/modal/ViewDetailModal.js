import React from 'react';
import ReactModal from 'react-modal';

const ViewDetailModal = ({isOpen, closeModal, question}) => {

    if (question == null) {
        return <></>
    }

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Modal"
            className="modal absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 pt-52 pb-52 pl-52 pr-52 rounded-lg flex flex-col justify-center items-center border-4 border-blue-500"
            overlayClassName="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-75"
        >
            <div className="text-center w-max">
                <h2 className="text-3xl font-bold mb-4">
                    <a href={question.url}>
                        {question.title}
                    </a>
                </h2>
                <table className="w-full mb-4">
                    <tbody>
                    <tr>
                        <td className="text-lg font-semibold text-left">플랫폼</td>
                        <td className="pl-4 pr-4">:</td>
                        <td className="text-lg">{question.fromSource}</td>
                    </tr>
                    <tr>
                        <td className="text-lg font-semibold text-left">복습횟수</td>
                        <td className="pl-4 pr-4">:</td>
                        <td className="text-lg">{question.reviewCount}</td>
                    </tr>
                    <tr>
                        <td className="text-lg font-semibold text-left">문제종류</td>
                        <td className="pl-4 pr-4">:</td>
                        <td className="text-lg">{question.questionType}</td>
                    </tr>
                    <tr>
                        <td className="text-lg font-semibold text-left">등록일</td>
                        <td className="pl-4 pr-4">:</td>
                        <td className="text-lg">{question.registDt}</td>
                    </tr>
                    </tbody>
                </table>

                <div className="mt-10">
                    <button
                        onClick={closeModal}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                       수정
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Close
                    </button>
                </div>
            </div>
        </ReactModal>
    )
};

export default ViewDetailModal;
