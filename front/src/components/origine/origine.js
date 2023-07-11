import axios from "../../api/axios";
import { AjoutLibrary, libraryList } from "../../api/design";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { BsFillTrashFill, BsPencilSquare, BsSearch } from "react-icons/bs";

import ModalAjout from "./ModalAjout";
import ModalEdition from "./ModalEdit";
import DeleteConfirmation from "../../contexts/ModalSuppr";

const URL_DE_BASE = `produits/`;
const URL_AVANCER = `produits/avc/`;

export default function Origine() {
  //#region // MES VARIABLE
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);
  //#endregion

  //#region // DONNEE   Origine
  useEffect(() => {
    getUsers();
    getUsers2();
  }, []);

  function getUsers() {
    axios.get(URL_DE_BASE).then(function (response) {
      setUsers(response.data);
    });
  }
  function getUsers2() {
    axios.get(URL_AVANCER).then(function (response) {
      setUsers2(response.data);
    });
  }
  //#endregion

  //#region // MODAL DELETE  Origine
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage(
      `Etes vous sure de vouloir supprimer '${
        users.find((x) => x.numProd === id).design
      }'?`
    );
    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const submitDelete = (id) => {
    axios.delete(URL_DE_BASE + `${id}`).then(function (response) {
      getUsers();
      getUsers2();
      toast.success(`Suppr Reussi`);
      setDisplayConfirmationModal(false);
    });
  };
  //#endregion

  //#region // ----- MA RECHERCHE -----
  const [contenuTab, setContenuTab] = useState(false);
  function rechercheOrigine(event) {
    const design = event.target.value;
    if (!design) {
      getUsers();
      getUsers2();
      setContenuTab(true);
    } else {
      axios.post(URL_DE_BASE + `recherche/`, design).then((response) => {
        if (response.data.success) {
          setUsers(response.data.res);
          setContenuTab(true);
        } else {
          setUsers(response.data.res);
          setContenuTab(false);
        }
      });
    }
  }
  //#endregion

  //#region  //----- MY PAGINATION -----
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  function retourALaPremierPage() {
    setcurrentPage(1);
    if (currentPage > 5) {
      setmaxPageNumberLimit(5);
      setminPageNumberLimit(0);
    }
  }

  const pages = [];
  const nbrPage = Math.ceil(users.length / itemsPerPage);
  for (let i = 1; i <= nbrPage; i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    if (currentPage - 2 < minPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  //#endregion

  //#region // MODAL AJOUT Arrondissement
  const [show, setShow] = useState(false);
  const showAddModal = () => setShow(true);
  const closeAddModal = () => {
    getUsers();
    getUsers2();
    setShow(false);
  };
  //#endregion

  //#region // MODAL EDIT Arrondissement
  const [numCompteEdit, setNumCompteEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const showEditModal = (numCompte) => {
    setNumCompteEdit(numCompte);
    setShowEdit(true);
  };
  const closeEditModal = () => {
    getUsers();
    getUsers2();
    setShowEdit(false);
  };
  //#endregion

  return (
    <>
      {libraryList.forEach((x) => AjoutLibrary(x))}
      <div className="wrapper">
        <ModalAjout show={show} onHide={closeAddModal} />

        <ModalEdition showEdit={showEdit} onHide={closeEditModal}>
          {numCompteEdit}
        </ModalEdition>

        <DeleteConfirmation
          showModal={displayConfirmationModal}
          confirmModal={submitDelete}
          hideModal={hideConfirmationModal}
          id={id}
          message={deleteMessage}
        />

        <div
          className="main"
          style={{ marginLeft: "20px", marginTop: "20px", overflow: "hidden" }}
        >
          <div className="content">
            <div className="container-fluid">
              <div
                className="row mb-3"
                style={{ textAlign: "center", marginLeft: "50px " }}
              >
                <h2>GESTION DES PRODUITS</h2>
              </div>

              <div className="row mb">
                <button
                  type="button"
                  onClick={showAddModal}
                  className="btn btn-success"
                >
                  <i className="mdi mdi-plus-circle"></i> Ajouter
                </button>
              </div>

              <div className="row">
                <div className="col-xl-10 stretch-card grid-margin">
                  <div className="table-responsive text-nowrap">
                    <h4 className="text-center"> Liste des Produits </h4>
                    <br />
                    <table className="table table-striped w-auto">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Designation</th>
                          <th scope="col">Prix</th>
                          <th scope="col">Quantite</th>
                          <th scope="col">Montant</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contenuTab || users.length !== 0 ? (
                          currentItems.map((user, key) => (
                            <tr key={key}>
                              <th scope="row">N-{user.numProd} </th>
                              <td>{user.design}</td>
                              <td>{user.prix}</td>
                              <td>{user.quantite}</td>
                              <td>{user.montant}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm m-1 waves-effect"
                                  variant="default"
                                  name="numCompteEdit"
                                  onClick={() => showEditModal(user.numProd)}
                                >
                                  <BsPencilSquare />
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm m-1 waves-effect"
                                  variant="default"
                                  onClick={() => showDeleteModal(user.numProd)}
                                >
                                  <BsFillTrashFill />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={10}
                              className="text-danger text-center"
                            >
                              La liste est vide ....
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {nbrPage !== 1 && nbrPage !== 0 && users.length !== 0 ? (
                      <>
                        <ul className="pageNumbers">
                          <li>
                            <button
                              disabled={currentPage == pages[0] ? true : false}
                              onClick={handlePrevbtn}
                            >
                              Précédent
                            </button>
                          </li>
                          {renderPageNumbers}
                          <li>
                            <button
                              disabled={
                                currentPage == pages[pages.length - 1]
                                  ? true
                                  : false
                              }
                              onClick={handleNextbtn}
                            >
                              Suivant
                            </button>
                          </li>
                        </ul>
                        <br />
                      </>
                    ) : null}
                    <br />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-10 stretch-card grid-margin">
                  <div className="table-responsive text-nowrap">
                    <table className="table table-striped w-auto">
                      <thead>
                        <tr>
                          <th scope="col"> </th>
                          <th scope="col">Min</th>
                          <th scope="col">Max</th>
                          <th scope="col">TOTAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contenuTab || users.length !== 0 ? (
                          users2.map((user, key) => (
                            <tr key={key}>
                              <th scope="row"> </th>
                              <td>{user.mMin}</td>
                              <td>{user.mMax}</td>
                              <td>{user.total}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={10}
                              className="text-danger text-center"
                            >
                              La liste est vide ....
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
