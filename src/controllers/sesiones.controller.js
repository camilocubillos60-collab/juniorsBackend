const db = require("../config/db");

const obtenerSesiones = async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM sesiones ORDER BY id_sesion ASC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener sesiones:", error);
        res.status(500).json({ error: "Error al obtener sesiones" });
    }
};

const obtenerSesionPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "SELECT * FROM sesiones WHERE id_sesion = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Sesión no encontrada" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener sesión:", error);
        res.status(500).json({ error: "Error al obtener sesión" });
    }
};

const crearSesion = async (req, res) => {
    const {
        id_mentor,
        id_usuario,
        fecha_sesion,
        tema,
        descripcion,
        estado,
        observaciones
    } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO sesiones
            (id_mentor, id_usuario, fecha_sesion, tema, descripcion, estado, observaciones)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [
                id_mentor,
                id_usuario,
                fecha_sesion,
                tema,
                descripcion,
                estado || "programada",
                observaciones || null
            ]
        );

        res.status(201).json({
            mensaje: "Sesión creada correctamente",
            sesion: result.rows[0]
        });
    } catch (error) {
        console.error("Error al crear sesión:", error);
        res.status(500).json({ error: "Error al crear sesión" });
    }
};

const actualizarSesion = async (req, res) => {
    const { id } = req.params;
    const {
        fecha_sesion,
        tema,
        descripcion,
        estado,
        observaciones
    } = req.body;

    try {
        const result = await db.query(
            `UPDATE sesiones
            SET fecha_sesion = $1,
                tema = $2,
                descripcion = $3,
                estado = $4,
                observaciones = $5
            WHERE id_sesion = $6
            RETURNING *`,
            [
                fecha_sesion,
                tema,
                descripcion,
                estado,
                observaciones,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Sesión no encontrada" });
        }

        res.json({
            mensaje: "Sesión actualizada correctamente",
            sesion: result.rows[0]
        });
    } catch (error) {
        console.error("Error al actualizar sesión:", error);
        res.status(500).json({ error: "Error al actualizar sesión" });
    }
};

const eliminarSesion = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "DELETE FROM sesiones WHERE id_sesion = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Sesión no encontrada" });
        }

        res.json({
            mensaje: "Sesión eliminada correctamente",
            sesion: result.rows[0]
        });
    } catch (error) {
        console.error("Error al eliminar sesión:", error);
        res.status(500).json({ error: "Error al eliminar sesión" });
    }
};

module.exports = {
    obtenerSesiones,
    obtenerSesionPorId,
    crearSesion,
    actualizarSesion,
    eliminarSesion
};