const express = require("express");
const router = express.Router();
const { obtenerUsuarios } = require("../controllers/usuarios.controller");

router.get("/usuarios", obtenerUsuarios);

module.exports = router;