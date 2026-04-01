const express = require("express");
const router = express.Router();

const {
    obtenerClases,
    crearClase,
    actualizarClase,
    eliminarClase,
} = require("../controllers/clases.controller");

router.get("/clases", obtenerClases);
router.post("/clases", crearClase);
router.put("/clases/:id", actualizarClase);
router.delete("/clases/:id", eliminarClase);

module.exports = router;