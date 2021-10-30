const userService = require('../services/userService');
const tokenFcts = require('../utils/jsonWebToken');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = await userService.createUser(displayName, email, password, image);
  return res.status(201).json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await userService.login(email, password);
  return res.status(200).json({ token });
};

const getAll = async (_req, res) => {
  const result = await userService.getAll();
  return res.status(200).json(result);
};

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;
  req.user = tokenFcts.verifyToken(token);
  return next();
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await userService.getById(id);
  return res.status(200).json(result);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  await userService.deleteUser(id);
  return res.status(204).end();
};

module.exports = {
  createUser,
  login,
  getAll,
  validateToken,
  getById,
  deleteUser,
};