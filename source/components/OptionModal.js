import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        contentLabel="Selected Option"
        onRequestClose={props.clearSelectedOptionHandler}
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal-title">Selected Option</h3>
        <p className="modal-body">{props.selectedOption}</p>
        <button className="button" onClick={props.clearSelectedOptionHandler}>Okay</button>
    </Modal>
);

export default OptionModal;