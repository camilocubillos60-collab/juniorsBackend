const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/auth.middleware");

const {
    obtenerMentores,
    obtenerMentorPorId,
    crearMentor,
    actualizarMentor,
    eliminarMentor
} = require("../controllers/mentores.controller");

router.get("/mentores", verificarToken, obtenerMentores);
router.get("/mentores/:id", verificarToken, obtenerMentorPorId);
router.post("/mentores", verificarToken, crearMentor);
router.put("/mentores/:id", verificarToken, actualizarMentor);
router.delete("/mentores/:id", verificarToken, eliminarMentor);

module.exports = router;