const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

require("../db");

const express = require("express");
const cors = require("cors");

const usuariosRoutes = require("./routes/usuarios.routes");
const clasesRoutes = require("./routes/clases.routes");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", usuariosRoutes);
app.use("/", clasesRoutes);

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