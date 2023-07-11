"use strict";
const Produits = require("../models/produits.model");

module.exports.addProduits = (req, res) => {
  let { design, prix, quantite } = req.body;
  const montant = parseInt(prix) * parseInt(quantite);

  const newProduits = {
    design,
    prix,
    quantite,
    montant,
  };

  Produits.addProduits(newProduits, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllProduits = (req, res) => {
  Produits.getAllProduits((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getAllProduits2 = (req, res) => {
  Produits.getAllProduits2((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getAllMoyenne = (req, res) => {
  Etudiants.getAllMoyenne((err, resp) => {
    if (!err) {
      res.send({ data: resp });
    } else {
      res.send({ err });
    }
  });
};

module.exports.getIdProduits = (req, res) => {
  Produits.getIdProduits(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send({ err });
    }
  });
};

module.exports.updateProduits = (req, res) => {
  let { design, prix, quantite } = req.body;
  const montant = parseInt(prix) * parseInt(quantite);

  const newProduits = {
    design,
    prix,
    quantite,
    montant,
  };

  Produits.updateProduits(newProduits, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.deleteProduits = (req, res) => {
  Produits.deleteProduits(req.params.id, (err, resp) => {
    if (!err) {
      res.send({ data: resp });
    } else {
      res.send({ err });
    }
  });
};

module.exports.searchProduits = (req, res) => {
  let { design } = req.body;
  const valeur = { design };

  Produits.searchProduits(valeur, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send({ err });
    }
  });
};
