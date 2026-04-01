const Clase = require("../models/Clase");

const obtenerClases = async (req, res) => {
    try {
        const clases = await Clase.find();
        res.json(clases);
    } catch (error) {
        console.log("ERROR REAL GET:", error);
        res.status(500).json({ error: "Error al obtener las clases" });
    }
};

const crearClase = async (req, res) => {
    try {
        const nuevaClase = new Clase(req.body);
        await nuevaClase.save();
        res.json(nuevaClase);
    } catch (error) {
        console.log("ERROR REAL POST:", error);
        res.status(500).json({ error: "Error al crear la clase" });
    }
};

const actualizarClase = async (req, res) => {
    try {
        const claseActualizada = await Clase.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!claseActualizada) {
            return res.status(404).json({ error: "Clase no encontrada" });
        }

        res.json(claseActualizada);
    } catch (error) {
        console.log("ERROR REAL PUT:", error);
        res.status(500).json({ error: "Error al actualizar la clase" });
    }
};

const eliminarClase = async (req, res) => {
    try {
        console.log("ID recibido:", req.params.id);

        const claseEliminada = await Clase.findByIdAndDelete(req.params.id);

        if (!claseEliminada) {
            return res.status(404).json({ error: "Clase no encontrada" });
        }

        res.json({
            mensaje: "Clase eliminada",
            claseEliminada
        });
    } catch (error) {
        console.log("ERROR REAL DELETE:", error);
        res.status(500).json({ error: "Error al eliminar la clase" });
    }
};

module.exports = {
    obtenerClases,
    crearClase,
    actualizarClase,
    eliminarClase,
};