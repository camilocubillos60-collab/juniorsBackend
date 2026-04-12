const db = require("../config/db");

const obtenerMentores = async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM mentores ORDER BY id_mentor ASC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener mentores:", error);
        res.status(500).json({ error: "Error al obtener mentores" });
    }
};

const obtenerMentorPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "SELECT * FROM mentores WHERE id_mentor = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Mentor no encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener mentor:", error);
        res.status(500).json({ error: "Error al obtener mentor" });
    }
};

const crearMentor = async (req, res) => {
    const {
        id_usuario,
        titulo_profesional,
        nivel_estudio,
        area_conocimiento,
        experiencia,
        descripcion_perfil,
        estado,
        disponibilidad,
        linkedin
    } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO mentores
            (id_usuario, titulo_profesional, nivel_estudio, area_conocimiento, experiencia, descripcion_perfil, estado, disponibilidad, linkedin)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *`,
            [
                id_usuario,
                titulo_profesional,
                nivel_estudio,
                area_conocimiento,
                experiencia,
                descripcion_perfil,
                estado || "activo",
                disponibilidad,
                linkedin
            ]
        );

        res.status(201).json({
            mensaje: "Mentor creado correctamente",
            mentor: result.rows[0]
        });
    } catch (error) {
        console.error("Error al crear mentor:", error);
        res.status(500).json({ error: "Error al crear mentor" });
    }
};

const actualizarMentor = async (req, res) => {
    const { id } = req.params;
    const {
        titulo_profesional,
        nivel_estudio,
        area_conocimiento,
        experiencia,
        descripcion_perfil,
        estado,
        disponibilidad,
        linkedin
    } = req.body;

    try {
        const result = await db.query(
            `UPDATE mentores
            SET titulo_profesional = $1,
                nivel_estudio = $2,
                area_conocimiento = $3,
                experiencia = $4,
                descripcion_perfil = $5,
                estado = $6,
                disponibilidad = $7,
                linkedin = $8
            WHERE id_mentor = $9
            RETURNING *`,
            [
                titulo_profesional,
                nivel_estudio,
                area_conocimiento,
                experiencia,
                descripcion_perfil,
                estado,
                disponibilidad,
                linkedin,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Mentor no encontrado" });
        }

        res.json({
            mensaje: "Mentor actualizado correctamente",
            mentor: result.rows[0]
        });
    } catch (error) {
        console.error("Error al actualizar mentor:", error);
        res.status(500).json({ error: "Error al actualizar mentor" });
    }
};

const eliminarMentor = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "DELETE FROM mentores WHERE id_mentor = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Mentor no encontrado" });
        }

        res.json({
            mensaje: "Mentor eliminado correctamente",
            mentor: result.rows[0]
        });
    } catch (error) {
        console.error("Error al eliminar mentor:", error);
        res.status(500).json({ error: "Error al eliminar mentor" });
    }
};

module.exports = {
    obtenerMentores,
    obtenerMentorPorId,
    crearMentor,
    actualizarMentor,
    eliminarMentor
};