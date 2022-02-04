import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import "../../styles/Modal.css";

export default function ConfirmModal({ onSubmit }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    setShow(false);
    onSubmit(e);
  }

  return (
    <>
      <Button variant='outline-success' className='mt-3 mr-3' onClick={handleShow}>
        Complete service
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You can't edit or add new products in this form after clicked in complete service
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleSubmit}>
            Complete service
          </Button>
          <Button variant="outline-primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
