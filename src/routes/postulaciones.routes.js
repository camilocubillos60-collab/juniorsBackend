const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/auth.middleware");

const {
    obtenerPostulaciones,
    obtenerPostulacionPorId,
    crearPostulacion,
    actualizarPostulacion,
    eliminarPostulacion
} = require("../controllers/postulaciones.controller");

router.get("/postulaciones", verificarToken, obtenerPostulaciones);
router.get("/postulaciones/:id", verificarToken, obtenerPostulacionPorId);
router.post("/postulaciones", verificarToken, crearPostulacion);
router.put("/postulaciones/:id", verificarToken, actualizarPostulacion);
router.delete("/postulaciones/:id", verificarToken, eliminarPostulacion);

module.exports = router;