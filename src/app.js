require("dotenv").config();

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

require("../db");

const express = require("express");
const cors = require("cors");

const usuariosRoutes = require("./routes/usuarios.routes");
const clasesRoutes = require("./routes/clases.routes");
const empresasRoutes = require("./routes/empresas.routes");
const vacantesRoutes = require("./routes/vacantes.routes");
const postulacionesRoutes = require("./routes/postulaciones.routes");
const programasRoutes = require("./routes/programas.routes");
const cursosRoutes = require("./routes/cursos.routes");
const mentoresRoutes = require("./routes/mentores.routes");
const sesionesRoutes = require("./routes/sesiones.routes");
const inscripcionesRoutes = require("./routes/inscripciones.routes");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", usuariosRoutes);
app.use("/", clasesRoutes);
app.use("/", empresasRoutes);
app.use("/", vacantesRoutes);
app.use("/", postulacionesRoutes);
app.use("/", programasRoutes);
app.use("/", cursosRoutes);
app.use("/", mentoresRoutes);
app.use("/", sesionesRoutes);
app.use("/", inscripcionesRoutes);
db.query("SELECT NOW()")
  .then((res) => {
    console.log("PostgreSQL conectado:", res.rows[0]);
  })
  .catch((err) => {
    console.error("Error PostgreSQL:", err);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});