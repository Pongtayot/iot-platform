const router = require("express").Router();

router.use("/account", require("./account.route"));
router.use("/sensors", require("./sensor.route"));
router.use("/client", require("./client.route"))

module.exports = router;