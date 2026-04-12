const db = require("../config/db");

const obtenerCursos = async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM cursos ORDER BY id_curso ASC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener cursos:", error);
        res.status(500).json({ error: "Error al obtener cursos" });
    }
};

const obtenerCursoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "SELECT * FROM cursos WHERE id_curso = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Curso no encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener curso:", error);
        res.status(500).json({ error: "Error al obtener curso" });
    }
};

const crearCurso = async (req, res) => {
    const {
        nombre,
        descripcion,
        id_programa,
        estado
    } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO cursos
            (nombre, descripcion, id_programa, estado)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [
                nombre,
                descripcion,
                id_programa,
                estado || "activo"
            ]
        );

        res.status(201).json({
            mensaje: "Curso creado correctamente",
            curso: result.rows[0]
        });
    } catch (error) {
        console.error("Error al crear curso:", error);
        res.status(500).json({ error: "Error al crear curso" });
    }
};

const actualizarCurso = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, estado } = req.body;

    try {
        const result = await db.query(
            `UPDATE cursos
            SET nombre = $1,
                descripcion = $2,
                estado = $3
            WHERE id_curso = $4
            RETURNING *`,
            [nombre, descripcion, estado, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Curso no encontrado" });
        }

        res.json({
            mensaje: "Curso actualizado",
            curso: result.rows[0]
        });
    } catch (error) {
        console.error("Error al actualizar curso:", error);
        res.status(500).json({ error: "Error al actualizar curso" });
    }
};

const eliminarCurso = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "DELETE FROM cursos WHERE id_curso = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Curso no encontrado" });
        }

        res.json({
            mensaje: "Curso eliminado",
            curso: result.rows[0]
        });
    } catch (error) {
        console.error("Error al eliminar curso:", error);
        res.status(500).json({ error: "Error al eliminar curso" });
    }
};

module.exports = {
    obtenerCursos,
    obtenerCursoPorId,
    crearCurso,
    actualizarCurso,
    eliminarCurso
};