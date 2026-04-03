const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("../db");
require("./config/mysql");

const express = require("express");
const usuariosRoutes = require("./routes/usuarios.routes");
const clasesRoutes = require("./routes/clases.routes");

const app = express();

app.use(express.json());

app.use("/", usuariosRoutes);
app.use("/", clasesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});