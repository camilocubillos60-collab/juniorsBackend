const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/auth.middleware");

const {
    obtenerEmpresas,
    obtenerEmpresaPorId,
    crearEmpresa,
    actualizarEmpresa,
    eliminarEmpresa
} = require("../controllers/empresas.controller");

router.get("/empresas", verificarToken, obtenerEmpresas);
router.get("/empresas/:id", verificarToken, obtenerEmpresaPorId);
router.post("/empresas", verificarToken, crearEmpresa);
router.put("/empresas/:id", verificarToken, actualizarEmpresa);
router.delete("/empresas/:id", verificarToken, eliminarEmpresa);

module.exports = router;