const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/auth.middleware");

const {
    obtenerCursos,
    obtenerCursoPorId,
    crearCurso,
    actualizarCurso,
    eliminarCurso
} = require("../controllers/cursos.controller");

router.get("/cursos", verificarToken, obtenerCursos);
router.get("/cursos/:id", verificarToken, obtenerCursoPorId);
router.post("/cursos", verificarToken, crearCurso);
router.put("/cursos/:id", verificarToken, actualizarCurso);
router.delete("/cursos/:id", verificarToken, eliminarCurso);

module.exports = router;