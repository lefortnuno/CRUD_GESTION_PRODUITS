import axios from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const URL_DE_BASE = `produits/`;
let isValidate = false;

export default function ModalAjout(props) {
  //#region // MES VARIABLES
  const u_info = {
    u_token: localStorage.token,
    u_identification: localStorage.identification,
    u_attribut: localStorage.attribut,
    u_idUtilisateur: localStorage.idUtilisateur,
    u_etatUtilisateur: localStorage.etatUtilisateur,
  };
  const [inputs, setInputs] = useState({
    design: "",
    quantite: "",
    prix: "",
  });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    design: "Nom de l'Origine obligatoire",
    quantite: "Quantite",
    prix: "Prix",
    messageErreur: "",
  });
  //#endregion

  //#region // FONCTION DU BOUTTON ENREGISTRER
  const onSubmit = () => {
    const opts = {
      headers: {
        Authorization: u_info.u_token,
      },
    };
    axios.post(URL_DE_BASE, inputs).then(function (response) {
      if (response.status === 200) {
        toast.success("Ajout Reussi.");
        onClose();
      } else {
        toast.error("Echec de l'Ajout!");
      }
    });
  };
  //#endregion

  //#region // HANDLE CHANGE FONCTION
  const handleChange = (event) => {
    isValidate = true;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs((values) => ({ ...values, [name]: value }));
    setErreurs((values) => ({ ...values, messageErreur: false }));

    if (value.length === 0) {
      isValidate = false;
      setErreurs((values) => ({ ...values, [name]: true }));
      setMessages((values) => ({
        ...values,
        [name]: name + " obligatoire",
      }));
    } else if (value.length < 1) {
      isValidate = false;
      setErreurs((values) => ({ ...values, [name]: true }));
      setMessages((values) => ({
        ...values,
        [name]: name + " trop court",
      }));
    } else if (value.length > 2000) {
      isValidate = false;
      setErreurs((values) => ({ ...values, [name]: true }));
      setMessages((values) => ({
        ...values,
        [name]: name + " trop long",
      }));
    } else {
      isValidate = true;
      setErreurs((values) => ({ ...values, [name]: false }));
      setMessages((values) => ({ ...values, [name]: "" }));
    }
  };
  //#endregion

  //#region //VALIDATION FORMULAIRE
  const validation = (event) => {
    event.preventDefault();

    const inputsArray = Object.keys(inputs);
    inputsArray.forEach((element) => {
      const value = Object.values(inputs[element]);
      if (value.length === 0) {
        setErreurs((values) => ({ ...values, [element]: true }));
        isValidate = false;
      }
    });

    if (isValidate) {
      console.log(inputs);
      onSubmit();
    }
  };
  //#endregion

  //#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
  function onClose() {
    props.onHide();

    const inputsArray = Object.keys(inputs);

    inputsArray.forEach((element) => {
      setInputs((values) => ({ ...values, [element]: "" }));
      inputs[element] = "";
      isValidate = false;
      setErreurs((values) => ({ ...values, [element]: false }));
    });
  }
  //#endregion

  //#region // RENDU HTML DU MODAL AJOUT
  return (
    <>
      <Modal
        size="sm"
        show={props.show}
        onHide={props.closeAddModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="text-primary h5 md-4">
            Nouveau Produit
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>- Designation : </Form.Label>
              <Form.Control
                type="text"
                name="design"
                onChange={handleChange}
                placeholder="Nom de l'Origine"
                autoComplete="off"
                autoFocus
              />
              <small className="text-danger d-block">
                {erreurs.design ? messages.design : null}
              </small>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>- Prix : </Form.Label>
              <Form.Control
                type="number"
                name="prix"
                onChange={handleChange}
                placeholder="Prix"
                autoComplete="off"
              />
              <small className="text-danger d-block">
                {erreurs.prix ? messages.prix : null}
              </small>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>- Quantite : </Form.Label>
              <Form.Control
                type="number"
                name="quantite"
                onChange={handleChange}
                placeholder="Quantite"
                autoComplete="off"
              />
              <small className="text-danger d-block">
                {erreurs.quantite ? messages.quantite : null}
              </small>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button variant="primary" onClick={validation}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //#endregion
}
