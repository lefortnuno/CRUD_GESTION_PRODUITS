let dbConn = require("../config/db.config");

//#region IDENTATION DE CODE
//#endregion

let Produits = function (produit) {
  this.numProd = produit.numProd;
  this.design = produit.design;
  this.prix = produit.prix;
  this.quantite = produit.quantite;
  this.montant = produit.montant;
};

const REQUETE_DE_BASE = `SELECT numProd, design, prix, quantite, montant FROM Produits `;
const REQUETE_AVANCER = `SELECT numProd, SUM(montant) as total, MIN(prix) as mMin, MAX(prix) as mMax FROM Produits `;

const ORDER_BY = ` ORDER BY numProd DESC `;

Produits.addProduits = (newProduits, result) => {
  dbConn.query("INSERT INTO Produits SET ?", newProduits, (err, res) => {
    if (!err) {
      result(null, { success: true, message: "Ajout reussi !" });
    } else {
      result(err, null);
    }
  });
};

Produits.getAllProduits = (result) => {
  dbConn.query(REQUETE_DE_BASE + ORDER_BY, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Produits.getAllProduits2 = (result) => {
  dbConn.query(REQUETE_AVANCER + ORDER_BY, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Produits.getIdProduits = (numProd, result) => {
  dbConn.query(REQUETE_DE_BASE + ` WHERE numProd = ?`, numProd, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      if (res.length !== 0) {
        result(null, res);
      } else {
        result(null, res);
      }
    }
  });
};

Produits.searchProduits = (valeur, result) => {
  dbConn.query(
    REQUETE_DE_BASE + ` WHERE ( design LIKE '%${valeur.design}%' )` + ORDER_BY,
    (err, res) => {
      if (err) {
        result({ err, message: "erreur !", success: false }, null);
      } else {
        if (res.length !== 0) {
          result(null, { res, success: true });
        } else {
          result(null, { res, message: "Introuvable !", success: false });
        }
      }
    }
  );
};

Produits.updateProduits = (newProduits, numProd, result) => {
  dbConn.query(
    `UPDATE Produits SET ? WHERE numProd = ${numProd}`,
    newProduits,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, { success: true, message: "Reussi" });
      }
    }
  );
};

Produits.deleteProduits = (numProd, result) => {
  Produits.getIdProduits(numProd, (err, resAttribut) => {
    dbConn.query(
      `DELETE FROM Produits WHERE numProd = ${numProd}`,
      function (err, res) {
        if (err) {
          result(err, null);
        } else {
          result(null, { success: true });
        }
      }
    );
  });
};

module.exports = Produits;
