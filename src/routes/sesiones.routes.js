const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/auth.middleware");

const {
    obtenerSesiones,
    obtenerSesionPorId,
    crearSesion,
    actualizarSesion,
    eliminarSesion
} = require("../controllers/sesiones.controller");

router.get("/sesiones", verificarToken, obtenerSesiones);
router.get("/sesiones/:id", verificarToken, obtenerSesionPorId);
router.post("/sesiones", verificarToken, crearSesion);
router.put("/sesiones/:id", verificarToken, actualizarSesion);
router.delete("/sesiones/:id", verificarToken, eliminarSesion);

module.exports = router;