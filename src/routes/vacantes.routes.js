const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/auth.middleware");

const {
    obtenerVacantes,
    obtenerVacantePorId,
    crearVacante,
    actualizarVacante,
    eliminarVacante
} = require("../controllers/vacantes.controller");

router.get("/vacantes", verificarToken, obtenerVacantes);
router.get("/vacantes/:id", verificarToken, obtenerVacantePorId);
router.post("/vacantes", verificarToken, crearVacante);
router.put("/vacantes/:id", verificarToken, actualizarVacante);
router.delete("/vacantes/:id", verificarToken, eliminarVacante);

module.exports = router;