const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/auth.middleware");

const {
    obtenerInscripciones,
    obtenerInscripcionPorId,
    crearInscripcion,
    actualizarInscripcion,
    eliminarInscripcion
} = require("../controllers/inscripciones.controller");

router.get("/inscripciones", verificarToken, obtenerInscripciones);
router.get("/inscripciones/:id", verificarToken, obtenerInscripcionPorId);
router.post("/inscripciones", verificarToken, crearInscripcion);
router.put("/inscripciones/:id", verificarToken, actualizarInscripcion);
router.delete("/inscripciones/:id", verificarToken, eliminarInscripcion);

module.exports = router;