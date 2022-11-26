const express = require("express");
const { handlerLoginUser, handlerRegisterUser, handlerTesUser, handlerUserLogout } = require("./handler");
const router = express.Router();
const authenticationToken = require("../../middleware/authenticationToken");

router.post('/register', handlerRegisterUser);
router.post('/login', handlerLoginUser);

module.exports = router;
