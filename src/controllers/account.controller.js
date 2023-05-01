const bcrypt = require("bcrypt");
const jwt = require("../configs/jwt");
const db = require("../db/models");
const constants = require("../../constant");

/**
 * @swagger
 * /account/register:
 *    post:
 *       summary : Create new account
 *       tags : [Account]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterRequest'
 *       responses:
 *         201:
 *           description: The account was successfully created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/RegisterResponses'
 */
exports.register = async (req, res) => {
  try {
    const myPlaintextPassword = req.body.password;
    const saltRounds = 10;
    req.body.password = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    const result = await db.Accounts.create(req.body);
    res.status(201).json({
      result: constants.kResultOk,
      message: JSON.stringify(result),
    });
  } catch (error) {
    res.status(500).json({
      result: constants.kResultNok,
      message: JSON.stringify(error),
    });
  }
};

/**
 * @swagger
 * /account/login:
 *    post:
 *       summary : Login and response jwt token
 *       tags : [Account]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginRequest'
 *       responses:
 *         200:
 *           description: Login successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/LoginResponses'
 *         401:
 *           description: Unauthenticated
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const result = await db.Accounts.findOne({ where: { username } });
  if (result && (await bcrypt.compare(password, result.password))) {
    const payload = {
      sub: result.username,
      addtional: "todo",
    };
    const token = jwt.genarateToken(payload);
    res.json({
      result: constants.kResultOk,
      token: token,
      message: JSON.stringify(result),
    });
  } else {
    res.status(401).json({
      result: constants.kResultNok,
      message: "Incorrect",
    });
  }
};

/**
 * @swagger
 * /account/info:
 *    get:
 *       summary : Return info JWT
 *       tags : [Account]
 *       responses:
 *         200:
 *           description: The info JWT
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/InfoResponses'
 *         401:
 *           description: Unauthenticated
 *       security: [{bearerAuth: []}]
 */
exports.info = (req, res) =>
  res.json({ username: req.sub, password: req.password });

/**
 * @swagger
 * tags:
 *    name: Account
 *    description: Account management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *          -username
 *          -password
 *       properties:
 *          username:
 *            type: string
 *            description: The account Username
 *          password:
 *            type: string
 *            description: The account Password
 *     RegisterResponses:
 *       type: object
 *       properties:
 *          result:
 *            type: string
 *            description: The Status Register
 *          message:
 *            type: string
 *            description: The debug message
 *     LoginRequest:
 *       type: object
 *       required:
 *          -username
 *          -password
 *       properties:
 *          username:
 *            type: string
 *            description: The account Username
 *          password:
 *            type: string
 *            description: The account Password
 *     LoginResponses:
 *       type: object
 *       properties:
 *         result:
 *           type: string
 *           description: Status Login
 *         token:
 *           type: string
 *           description: The JWT Token
 *         message:
 *           type: string
 *           description: The debug message
 *     InfoResponses:
 *       type: object
 *       properties:
 *         username:
 *            type: string
 *            description: The account Username
 *       example:
 *         username: admin
 */
