const obtenerUsuarios = (req, res) => {
    db.query("SELECT * FROM usuarios", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error en MySQL" });
        }
        res.json(results);
    });
};

module.exports = { obtenerUsuarios };