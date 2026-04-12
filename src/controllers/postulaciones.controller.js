const db = require("../config/db");

const obtenerPostulaciones = async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM postulaciones ORDER BY id_postulacion ASC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener postulaciones:", error);
        res.status(500).json({ error: "Error al obtener postulaciones" });
    }
};

const obtenerPostulacionPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "SELECT * FROM postulaciones WHERE id_postulacion = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Postulación no encontrada" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener postulación:", error);
        res.status(500).json({ error: "Error al obtener postulación" });
    }
};

const crearPostulacion = async (req, res) => {
    const {
        id_usuario,
        id_vacante,
        estado,
        observaciones
    } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO postulaciones
            (id_usuario, id_vacante, estado, observaciones)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [
                id_usuario,
                id_vacante,
                estado || "pendiente",
                observaciones || null
            ]
        );

        res.status(201).json({
            mensaje: "Postulación creada correctamente",
            postulacion: result.rows[0]
        });
    } catch (error) {
        console.error("Error al crear postulación:", error);
        res.status(500).json({ error: "Error al crear postulación" });
    }
};

const actualizarPostulacion = async (req, res) => {
    const { id } = req.params;
    const { estado, observaciones } = req.body;

    try {
        const result = await db.query(
            `UPDATE postulaciones
            SET estado = $1,
                observaciones = $2
            WHERE id_postulacion = $3
            RETURNING *`,
            [estado, observaciones, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Postulación no encontrada" });
        }

        res.json({
            mensaje: "Postulación actualizada correctamente",
            postulacion: result.rows[0]
        });
    } catch (error) {
        console.error("Error al actualizar postulación:", error);
        res.status(500).json({ error: "Error al actualizar postulación" });
    }
};

const eliminarPostulacion = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "DELETE FROM postulaciones WHERE id_postulacion = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Postulación no encontrada" });
        }

        res.json({
            mensaje: "Postulación eliminada correctamente",
            postulacion: result.rows[0]
        });
    } catch (error) {
        console.error("Error al eliminar postulación:", error);
        res.status(500).json({ error: "Error al eliminar postulación" });
    }
};

module.exports = {
    obtenerPostulaciones,
    obtenerPostulacionPorId,
    crearPostulacion,
    actualizarPostulacion,
    eliminarPostulacion
};