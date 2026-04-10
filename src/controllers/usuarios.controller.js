const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const obtenerUsuarios = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM usuarios");
        res.json(result.rows);
    } catch (err) {
        console.error("Error al consultar usuarios:", err);
        return res.status(500).json({ error: "Error al obtener usuarios" });
    }
};

const crearUsuario = async (req, res) => {
    const { nombre, apellido, email, password, telefono, rol } = req.body;

    try {
        const usuarioExistente = await db.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );

        if (usuarioExistente.rows.length > 0) {
            return res.status(400).json({
                error: "El email ya está registrado",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO usuarios (nombre, apellido, email, password, telefono, rol)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id_usuario
        `;

        const result = await db.query(sql, [
            nombre,
            apellido,
            email,
            hashedPassword,
            telefono,
            rol,
        ]);

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            id_usuario: result.rows[0].id_usuario,
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const usuario = result.rows[0];

        const passwordValido = await bcrypt.compare(password, usuario.password);

        if (!passwordValido) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            {
                id: usuario.id_usuario,
                email: usuario.email,
                rol: usuario.rol,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({
            mensaje: "Login exitoso",
            token: token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                rol: usuario.rol,
            },
        });
    } catch (err) {
        console.error("Error en login:", err);
        return res.status(500).json({ error: "Error del servidor" });
    }
};

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    loginUsuario,
};