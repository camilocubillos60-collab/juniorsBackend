const db = require("../config/db");

const obtenerVacantes = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM vacantes ORDER BY id_vacante ASC");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener vacantes:", error);
        res.status(500).json({ error: "Error al obtener vacantes" });
    }
};

const obtenerVacantePorId = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "SELECT * FROM vacantes WHERE id_vacante = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Vacante no encontrada" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener vacante:", error);
        res.status(500).json({ error: "Error al obtener vacante" });
    }
};

const crearVacante = async (req, res) => {
    const {
        id_empresa,
        titulo,
        descripcion,
        requisitos,
        ubicacion,
        modalidad,
        tipo_contrato,
        salario,
        fecha_cierre,
        estado
    } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO vacantes
            (id_empresa, titulo, descripcion, requisitos, ubicacion, modalidad, tipo_contrato, salario, fecha_cierre, estado)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING *`,
            [
                id_empresa,
                titulo,
                descripcion,
                requisitos,
                ubicacion,
                modalidad,
                tipo_contrato,
                salario,
                fecha_cierre,
                estado || "activa"
            ]
        );

        res.status(201).json({
            mensaje: "Vacante creada correctamente",
            vacante: result.rows[0]
        });
    } catch (error) {
        console.error("Error al crear vacante:", error);
        res.status(500).json({ error: "Error al crear vacante" });
    }
};

const actualizarVacante = async (req, res) => {
    const { id } = req.params;

    const {
        titulo,
        descripcion,
        requisitos,
        ubicacion,
        modalidad,
        tipo_contrato,
        salario,
        fecha_cierre,
        estado
    } = req.body;

    try {
        const result = await db.query(
            `UPDATE vacantes
            SET titulo=$1,
                descripcion=$2,
                requisitos=$3,
                ubicacion=$4,
                modalidad=$5,
                tipo_contrato=$6,
                salario=$7,
                fecha_cierre=$8,
                estado=$9
            WHERE id_vacante=$10
            RETURNING *`,
            [
                titulo,
                descripcion,
                requisitos,
                ubicacion,
                modalidad,
                tipo_contrato,
                salario,
                fecha_cierre,
                estado,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Vacante no encontrada" });
        }

        res.json({
            mensaje: "Vacante actualizada",
            vacante: result.rows[0]
        });
    } catch (error) {
        console.error("Error al actualizar vacante:", error);
        res.status(500).json({ error: "Error al actualizar vacante" });
    }
};

const eliminarVacante = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "DELETE FROM vacantes WHERE id_vacante = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Vacante no encontrada" });
        }

        res.json({
            mensaje: "Vacante eliminada",
            vacante: result.rows[0]
        });
    } catch (error) {
        console.error("Error al eliminar vacante:", error);
        res.status(500).json({ error: "Error al eliminar vacante" });
    }
};

module.exports = {
    obtenerVacantes,
    obtenerVacantePorId,
    crearVacante,
    actualizarVacante,
    eliminarVacante
};