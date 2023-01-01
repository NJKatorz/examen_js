const express = require('express');

const router = express.Router();

const { register, login } = require('../models/users');

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

/* Register a user */
router.post('/register', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const usermail = req?.body?.usermail?.length !== 0 ? req.body.usermail : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !password) return res.sendStatus(400); // 400 Bad Request

  const authenticatedUser = await register(username, usermail, password);

  if (!authenticatedUser) return res.sendStatus(409); // 409 Conflict

  return res.json(authenticatedUser);
});

/* Login a user */
router.post('/login', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const usermail = req?.body?.usermail?.length !== 0 ? req.body.usermail : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !password) return res.sendStatus(400); // 400 Bad Reques

  const authenticatedUser = await login(username, usermail, password);

  if (!authenticatedUser) return res.sendStatus(401); // 401 Unauthorized

  return res.json(authenticatedUser);
});

module.exports = router;
