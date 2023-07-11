const router = require("express").Router();
const ProduitsController = require("../controllers/produits.controlleur");

router.post("/", ProduitsController.addProduits);
router.post("/recherche/", ProduitsController.searchProduits);

router.get("/", ProduitsController.getAllProduits);
router.get("/avc/", ProduitsController.getAllProduits2);
router.get("/:id", ProduitsController.getIdProduits);

router.put("/:id", ProduitsController.updateProduits);

router.delete("/:id", ProduitsController.deleteProduits);

module.exports = router;
