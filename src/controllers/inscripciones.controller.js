const db = require("../config/db");

const obtenerInscripciones = async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM inscripciones ORDER BY id_inscripcion ASC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener inscripciones:", error);
        res.status(500).json({ error: "Error al obtener inscripciones" });
    }
};

const obtenerInscripcionPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "SELECT * FROM inscripciones WHERE id_inscripcion = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Inscripción no encontrada" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener inscripción:", error);
        res.status(500).json({ error: "Error al obtener inscripción" });
    }
};

const crearInscripcion = async (req, res) => {
    const {
        id_usuario,
        id_programa,
        estado,
        observaciones
    } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO inscripciones
            (id_usuario, id_programa, estado, observaciones)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [
                id_usuario,
                id_programa,
                estado || "pendiente",
                observaciones || null
            ]
        );

        res.status(201).json({
            mensaje: "Inscripción creada correctamente",
            inscripcion: result.rows[0]
        });
    } catch (error) {
        console.error("Error al crear inscripción:", error);
        res.status(500).json({ error: "Error al crear inscripción" });
    }
};

const actualizarInscripcion = async (req, res) => {
    const { id } = req.params;
    const { estado, observaciones } = req.body;

    try {
        const result = await db.query(
            `UPDATE inscripciones
            SET estado = $1,
                observaciones = $2
            WHERE id_inscripcion = $3
            RETURNING *`,
            [estado, observaciones, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Inscripción no encontrada" });
        }

        res.json({
            mensaje: "Inscripción actualizada correctamente",
            inscripcion: result.rows[0]
        });
    } catch (error) {
        console.error("Error al actualizar inscripción:", error);
        res.status(500).json({ error: "Error al actualizar inscripción" });
    }
};

const eliminarInscripcion = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "DELETE FROM inscripciones WHERE id_inscripcion = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Inscripción no encontrada" });
        }

        res.json({
            mensaje: "Inscripción eliminada correctamente",
            inscripcion: result.rows[0]
        });
    } catch (error) {
        console.error("Error al eliminar inscripción:", error);
        res.status(500).json({ error: "Error al eliminar inscripción" });
    }
};

module.exports = {
    obtenerInscripciones,
    obtenerInscripcionPorId,
    crearInscripcion,
    actualizarInscripcion,
    eliminarInscripcion
};