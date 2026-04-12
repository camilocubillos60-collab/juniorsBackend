const db = require("../config/db");

const obtenerEmpresas = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM empresas ORDER BY id_empresa ASC");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener empresas:", error);
        res.status(500).json({ error: "Error al obtener empresas" });
    }
};

const obtenerEmpresaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "SELECT * FROM empresas WHERE id_empresa = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Empresa no encontrada" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener empresa:", error);
        res.status(500).json({ error: "Error al obtener empresa" });
    }
};

const crearEmpresa = async (req, res) => {
    const {
        nombre,
        nit,
        email_contacto,
        telefono,
        direccion,
        sector,
        descripcion,
        estado
    } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO empresas
            (nombre, nit, email_contacto, telefono, direccion, sector, descripcion, estado)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [
                nombre,
                nit,
                email_contacto,
                telefono,
                direccion,
                sector,
                descripcion,
                estado || "activo"
            ]
        );

        res.status(201).json({
            mensaje: "Empresa creada correctamente",
            empresa: result.rows[0]
        });
    } catch (error) {
        console.error("Error al crear empresa:", error);
        res.status(500).json({ error: "Error al crear empresa" });
    }
};

const actualizarEmpresa = async (req, res) => {
    const { id } = req.params;
    const {
        nombre,
        nit,
        email_contacto,
        telefono,
        direccion,
        sector,
        descripcion,
        estado
    } = req.body;

    try {
        const result = await db.query(
            `UPDATE empresas
            SET nombre = $1,
                nit = $2,
                email_contacto = $3,
                telefono = $4,
                direccion = $5,
                sector = $6,
                descripcion = $7,
                estado = $8
            WHERE id_empresa = $9
            RETURNING *`,
            [
                nombre,
                nit,
                email_contacto,
                telefono,
                direccion,
                sector,
                descripcion,
                estado,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Empresa no encontrada" });
        }

        res.json({
            mensaje: "Empresa actualizada correctamente",
            empresa: result.rows[0]
        });
    } catch (error) {
        console.error("Error al actualizar empresa:", error);
        res.status(500).json({ error: "Error al actualizar empresa" });
    }
};

const eliminarEmpresa = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "DELETE FROM empresas WHERE id_empresa = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Empresa no encontrada" });
        }

        res.json({
            mensaje: "Empresa eliminada correctamente",
            empresa: result.rows[0]
        });
    } catch (error) {
        console.error("Error al eliminar empresa:", error);
        res.status(500).json({ error: "Error al eliminar empresa" });
    }
};

module.exports = {
    obtenerEmpresas,
    obtenerEmpresaPorId,
    crearEmpresa,
    actualizarEmpresa,
    eliminarEmpresa
};