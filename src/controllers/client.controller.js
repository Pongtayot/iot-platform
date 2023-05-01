const db = require("../db/models");
const constants = require("../../constant");
const { Op, Sequelize } = require("sequelize");
const cron = require("node-cron");

/**
 * @swagger
 * /client:
 *    get:
 *       summary : Return Client Connect
 *       tags : [Client]
 *       responses:
 *         200:
 *           description: The Client Connect
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/InfoClientResponses'
 *         500:
 *          description: Server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
exports.getClient = async (req, res) => {
  try {
    const clients = await db.ConnectedClients.findAll({
      where: {
        id: {
          [Op.eq]: db.Sequelize.literal(`(
            SELECT MAX(id) FROM ConnectedClients tb2 
            WHERE ip_address = ConnectedClients.ip_address and node_name = ConnectedClients.node_name
            GROUP BY ip_address, node_name
          )`),
        },
      },
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({
      result: constants.kResultNok,
      message: JSON.stringify(error),
    });
  }
};

/**
 * @swagger
 * /client:
 *    post:
 *       summary : Create new client connect
 *       tags : [Client]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientRequest'
 *       responses:
 *         201:
 *           description: The Client was successfully created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ClientResponses'
 *         500:
 *          description: Server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
exports.addClient = async (req, res) => {
  try {
    const clientIp = req.body.ip_address;
    const now = new Date();

    // Insert new record into Sequelize model with an expiry time of 1 minute
    const expiryTime = new Date(now.getTime() + 1 * 60 * 1000); // expiry time is 1 minute from now
    const client = await db.ConnectedClients.create({
      ip_address: clientIp,
      node_name: req.body.node_name,
      last_active: expiryTime,
    });

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({
      result: constants.kResultNok,
      message: JSON.stringify(error),
    });
  }
};

// Function to delete expired records
const deleteExpiredRecords = async () => {
  const now = new Date();
  await db.ConnectedClients.destroy({
    where: {
      last_active: {
        [Op.lt]: now,
      },
    },
  });
};

// Schedule the function to run every minute
cron.schedule("* * * * *", deleteExpiredRecords);

/**
 * @swagger
 * tags:
 *    name: Client
 *    description: Client management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ClientRequest:
 *       type: object
 *       required:
 *          -ip_address
 *          -node_name
 *       properties:
 *          ip_address:
 *            type: string
 *            description: The client IP Address
 *          node_name:
 *            type: string
 *            description: The client name
 *     ClientResponses:
 *       type: object
 *       properties:
 *          id:
 *            type: integer
 *            description: The Client id
 *          ip_address:
 *            type: string
 *            description: The Client ip address
 *          node_name:
 *            type: string
 *            description: The Client node name
 *          last_active:
 *            type: string
 *            format: date-time
 *            description: The Client last active
 *          updated_at:
 *            type: string
 *            format: date-time
 *            description: The Client updated
 *          created_at:
 *            type: string
 *            format: date-time
 *            description: The Client created
 *     InfoClientResponses:
 *       type: object
 *       properties:
 *          id:
 *            type: integer
 *            description: The Client id
 *          ip_address:
 *            type: string
 *            description: The Client ip address
 *          node_name:
 *            type: string
 *            description: The Client node name
 *          last_active:
 *            type: string
 *            format: date-time
 *            description: The Client last active
 *          updated_at:
 *            type: string
 *            format: date-time
 *            description: The Client updated
 *          created_at:
 *            type: string
 *            format: date-time
 *            description: The Client created
 *       example:
 *         id: 1
 *         ip_address: 192.169.0.1
 *         node_name: room
 *         last_active: 2023-04-27T11:04:40.235Z
 *         created_at: 2023-04-27T11:03:40.236Z
 *         updated_at: 2023-04-27T11:03:40.236Z
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         result:
 *           type: string
 *           description: The status error
 *         message:
 *           type: string
 *           description: The error message
 */
