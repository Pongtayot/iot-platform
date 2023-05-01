const router = require("express").Router();
const sensorController = require("../controllers/sensor.controller");

router.get("/all/", sensorController.getAllSensor)
router.get("/", sensorController.getSensorRoom);
router.get("/:node_name", sensorController.getSensorsByNodeName);
router.delete("/:node_name", sensorController.deleteSensorRoom);
router.post("/", sensorController.addSensor);

module.exports = router;
