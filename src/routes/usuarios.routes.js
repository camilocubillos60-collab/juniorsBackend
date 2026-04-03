const express = require("express");
const router = express.Router();
const { obtenerUsuarios, crearUsuario, loginUsuario } = require("../controllers/usuarios.controller");
const verificarToken = require("../middlewares/auth.middleware");

router.get("/usuarios", verificarToken, obtenerUsuarios);
router.post("/usuarios", crearUsuario);
router.post("/login", loginUsuario);

module.exports = router;