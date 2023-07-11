import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteConfirmation({
  showModal,
  hideModal,
  confirmModal,
  id,
  message,
}) {
  //#region // RENU HTML DU MODAL SUPPRIMER
  return (
    <Modal
      centered
      size="md"
      show={showModal}
      onHide={hideModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="h6">Suppression Définitive  </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">{message}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={hideModal}>
          NON
        </Button>
        <Button variant="danger" onClick={() => confirmModal(id)}>
          OUI
        </Button>
      </Modal.Footer>
    </Modal>
  );
  //#endregion
}
