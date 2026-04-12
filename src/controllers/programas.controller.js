const db = require("../config/db");

const obtenerProgramas = async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM programas ORDER BY id_programa ASC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener programas:", error);
        res.status(500).json({ error: "Error al obtener programas" });
    }
};

const obtenerProgramaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "SELECT * FROM programas WHERE id_programa = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Programa no encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener programa:", error);
        res.status(500).json({ error: "Error al obtener programa" });
    }
};

const crearPrograma = async (req, res) => {
    const {
        nombre,
        descripcion,
        categoria,
        duracion,
        estado,
        fecha_inicio,
        fecha_fin
    } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO programas
            (nombre, descripcion, categoria, duracion, estado, fecha_inicio, fecha_fin)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [
                nombre,
                descripcion,
                categoria,
                duracion,
                estado || "activo",
                fecha_inicio || null,
                fecha_fin || null
            ]
        );

        res.status(201).json({
            mensaje: "Programa creado correctamente",
            programa: result.rows[0]
        });
    } catch (error) {
        console.error("Error al crear programa:", error);
        res.status(500).json({ error: "Error al crear programa" });
    }
};

const actualizarPrograma = async (req, res) => {
    const { id } = req.params;
    const {
        nombre,
        descripcion,
        categoria,
        duracion,
        estado,
        fecha_inicio,
        fecha_fin
    } = req.body;

    try {
        const result = await db.query(
            `UPDATE programas
            SET nombre = $1,
                descripcion = $2,
                categoria = $3,
                duracion = $4,
                estado = $5,
                fecha_inicio = $6,
                fecha_fin = $7
            WHERE id_programa = $8
            RETURNING *`,
            [
                nombre,
                descripcion,
                categoria,
                duracion,
                estado,
                fecha_inicio,
                fecha_fin,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Programa no encontrado" });
        }

        res.json({
            mensaje: "Programa actualizado correctamente",
            programa: result.rows[0]
        });
    } catch (error) {
        console.error("Error al actualizar programa:", error);
        res.status(500).json({ error: "Error al actualizar programa" });
    }
};

const eliminarPrograma = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "DELETE FROM programas WHERE id_programa = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Programa no encontrado" });
        }

        res.json({
            mensaje: "Programa eliminado correctamente",
            programa: result.rows[0]
        });
    } catch (error) {
        console.error("Error al eliminar programa:", error);
        res.status(500).json({ error: "Error al eliminar programa" });
    }
};

module.exports = {
    obtenerProgramas,
    obtenerProgramaPorId,
    crearPrograma,
    actualizarPrograma,
    eliminarPrograma
};