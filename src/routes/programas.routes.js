const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/auth.middleware");

const {
    obtenerProgramas,
    obtenerProgramaPorId,
    crearPrograma,
    actualizarPrograma,
    eliminarPrograma
} = require("../controllers/programas.controller");

router.get("/programas", verificarToken, obtenerProgramas);
router.get("/programas/:id", verificarToken, obtenerProgramaPorId);
router.post("/programas", verificarToken, crearPrograma);
router.put("/programas/:id", verificarToken, actualizarPrograma);
router.delete("/programas/:id", verificarToken, eliminarPrograma);

module.exports = router;