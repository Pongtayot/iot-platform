const router = require("express").Router();
const clientController = require("../controllers/client.controller");

router.post("/", clientController.addClient);
router.get("/", clientController.getClient);

module.exports = router;
