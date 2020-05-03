import React from "react"
import Modal from "react-bootstrap/Modal";

const ModalWindow = ({contact, isOpen, hideModal}) => {
    return(
        <Modal style= {{marginTop: "100px"}} show={isOpen} onHide={hideModal}>
            <Modal.Header>
                <Modal.Title>
                    {contact.name}
                    <h6 className="card-subtitle mb-2 text-muted">{contact.email}</h6>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{paddingBottom: "150px"}}><p>{contact.message}</p></Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={hideModal}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalWindow;