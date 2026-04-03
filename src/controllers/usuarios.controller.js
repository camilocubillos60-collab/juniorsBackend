const db = require("../config/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const obtenerUsuarios = (req, res) => {
    db.query("SELECT * FROM usuarios", (err, results) => {
        if (err) {
            console.error("Error al consultar usuarios:", err);
            return res.status(500).json({ error: "Error al obtener usuarios" });
        }

        res.json(results);
    });
};

const crearUsuario = async (req, res) => {
    const { nombre, apellido, email, password, telefono, rol } = req.body;

    try {
        db.query(
            "SELECT * FROM usuarios WHERE email = ?",
            [email],
            async (err, results) => {
                if (err) {
                    console.error("Error al verificar email:", err);
                    return res.status(500).json({ error: "Error al servidor" });
                }

                if (results.length > 0) {
                    return res.status(400).json({
                        error: "El email ya está registrado",
                    });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                const sql = `
                INSERT INTO usuarios (nombre, apellido, email, password, telefono, rol)
                VALUES (?, ?, ?, ?, ?, ?)
                `;

                db.query(
                    sql,
                    [nombre, apellido, email, hashedPassword, telefono, rol],
                    (err, result) => {
                        if (err) {
                            console.error("Error al crear usuario:", err);
                            return res.status(500).json({ error: "Error al crear usuario" });
                        }

                        res.status(201).json({
                            mensaje: "Usuario creado correctamente",
                            id_usuario: result.insertId,
                        });
                    }
                );

            }
        );
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email],
        async (err, results) => {
            if (err) {
                console.error("Error en login:", err);
                return res.status(500).json({ error: "Error del servidor" });
            }

            if (results.length === 0) {
                return res.status(500).json({ error: "Usuario no encontrado" });
            }

            const usuario = results[0];

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
                "secreto_juniors",
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
        }
    );
};

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    loginUsuario,
};