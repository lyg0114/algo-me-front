import React from 'react';
import ReactModal from 'react-modal';

const SaveCompleteModal = ({isOpen, closeModal, message}) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Modal"
            className="modal absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 pt-20 pb-20 pl-64 pr-64 rounded-lg flex flex-col justify-center items-center border-4 border-blue-500"
            overlayClassName="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-75"
        >
            <div className="text-center">
                <h2 className="text-xl font-bold mb-4 max-w-500 whitespace-nowrap">{message}</h2>
                <button
                    onClick={closeModal}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </ReactModal>
    );
};

export default SaveCompleteModal;
