const db = require("../db/models");
const constants = require("../../constant");
const { Op, Sequelize } = require("sequelize");

/**
 * @swagger
 * /sensors:
 *   get:
 *     summary: Returns the list of all the sensors rooms
 *     tags: [Sensors]
 *     responses:
 *       200:
 *         description: The list of the sensors rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SensorsRoomResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
exports.getSensorRoom = async (req, res) => {
  try {
    const result = await db.Sensors.findAll({
      attributes: ["id", "node_name"],
      group: ["node_name"],
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({
      result: constants.kResultNok,
      message: JSON.stringify(error),
    });
  }
};

/**
 * @swagger
 * /sensors/{node_name}:
 *   delete:
 *     summary: Delete a sensors
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: node_name
 *         schema:
 *           type: string
 *         required: true
 *         description: The sensors node_name
 *     responses:
 *       204:
 *         description: The sensors was successfully deleted
 *       404:
 *         description: The sensors was not found
 */
exports.deleteSensorRoom = async (req, res) => {
  try {
    const { node_name } = req.params;
    let result = await db.Sensors.findOne({
      where: {
        node_name: node_name,
      },
    });
    result = await db.Sensors.destroy({ where: { node_name: node_name } });
    res
      .status(204)
      .json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch {
    res
      .status(404)
      .json({ result: constants.kResultNok, message: "Internal error" });
  }
};

/**
 * @swagger
 * /sensors:
 *   post:
 *     summary: Create a new sensors
 *     tags: [Sensors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SensorsRequest'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SensorsResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
exports.addSensor = async (req, res) => {
  try {
    const nodeId = req.body.node_id;
    const nodeName = req.body.node_name;
    const memory = req.body.memory_size;
    const sensorId = req.body.sensor_id;
    const sensorName = req.body.sensor_name;
    const sensorValue = req.body.sensor_value;
    const sensorStatus = req.body.status;
    const now = new Date();
    const result = await db.Sensors.create({
      node_id: nodeId,
      node_name: nodeName,
      memory_size: memory,
      sensor_id: sensorId,
      sensor_name: sensorName,
      sensor_value: sensorValue,
      status: sensorStatus,
      last_active: now,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      result: constants.kResultNok,
      message: JSON.stringify(error),
    });
  }
};

/**
 * @swagger
 * /sensors/{node_name}:
 *   get:
 *     summary: Get the sensors by node_name
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: node_name
 *         schema:
 *           type: string
 *         required: true
 *         description: The sensors node_name
 *     responses:
 *       200:
 *         description: The sensors description by node_name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SensorsResponse'
 *       404:
 *         description: The product was not found
 */
exports.getSensorsByNodeName = async (req, res) => {
  let result = await db.Sensors.findAll({
    where: {
      node_name: req.params.node_name,
    },
    order: [["id", "DESC"]],
  });
  if (result) {
    res.json(result);
  } else {
    res.statue(404).json({});
  }
};

/**
 * @swagger
 * /sensors/all:
 *   get:
 *     summary: Returns the list of all the sensors
 *     tags: [Sensors]
 *     responses:
 *       200:
 *         description: The list of the sensors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SensorsResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
exports.getAllSensor = async (req, res) => {
  try {
    const result = await db.Sensors.findAll({
      where: {
        id: {
          [Op.eq]: db.Sequelize.literal(`(
            SELECT MAX(id) FROM sensors tb2 
            WHERE node_name = Sensors.node_name and sensor_id = Sensors.sensor_id
            GROUP BY node_name, sensor_id
          )`),
        },
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({
      result: constants.kResultNok,
      message: JSON.stringify(error),
    });
  }
};

/**
 * @swagger
 * tags:
 *    name: Sensors
 *    description: Sensors management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SensorsResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the sensors
 *         node_id:
 *           type: string
 *           description: The client id
 *         node_name:
 *           type: string
 *           description: The sensors locations
 *         memory_size:
 *           type: string
 *           description: The sensors memory size
 *         sensor_id:
 *           type: string
 *           description: The sensors name
 *         sensor_name:
 *           type: string
 *           description: The temperature measurement units
 *         sensor_value:
 *           type: string
 *           description: The sensors data
 *         status:
 *           type: string
 *           description: The sensors status
 *         last_active:
 *           type: string
 *           format: date-time
 *           description: The sensors last active
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The sensors created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The sensors updated
 *       example:
 *         id: 1
 *         node_id: 1
 *         node_name: Surgery Room 1
 *         memory_size: 242732
 *         sensor_id: DHT22_t
 *         sensor_name: temperature
 *         sensor_value: 23.89999962
 *         status: temperature too cold
 *         last_active: 2020-11-12T09:00:56.096Z
 *         created_at: 2020-11-12T09:00:56.096Z
 *         updated_at: 2020-11-12T09:00:56.096Z
 *     SensorsRequest:
 *       type: object
 *       required:
 *         - node_id
 *         - node_name
 *         - memory_size
 *         - temperature_value
 *         - humidity_value
 *         - pressure_value
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the sensors
 *         node_id:
 *           type: string
 *           description: The client id
 *         node_name:
 *           type: string
 *           description: The sensors locations
 *         memory_size:
 *           type: string
 *           description: The sensors memory size
 *         sensor_id:
 *           type: string
 *           description: The sensors name
 *         sensor_name:
 *           type: string
 *           description: The temperature measurement units
 *         sensor_value:
 *           type: string
 *           description: The sensors data
 *         status:
 *           type: string
 *           description: The sensors status
 *         last_active:
 *           type: string
 *           format: date-time
 *           description: The sensors last active
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The sensors created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The sensors updated
 *     SensorsRoomResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the sensors
 *         node_name:
 *           type: string
 *           description: The sensors locations
 *       example:
 *         id: 1
 *         node_name: Surgery Room 1
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         result:
 *           type: string
 *           description: The status error message
 *         message:
 *           type: string
 *           description: The error message
 */