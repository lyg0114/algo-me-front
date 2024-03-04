import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SaveCompleteModal = ({isOpen, closeModal, message}) => {
    return (
        <Modal show={isOpen} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title className="font-weight-bold text-xl">{message}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <Button variant="primary" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default SaveCompleteModal;
