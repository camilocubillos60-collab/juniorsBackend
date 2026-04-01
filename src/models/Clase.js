const mongoose = require("mongoose");

const claseSchema = new mongoose.Schema(
    {
        titulo: String,
        descripcion: String,
        video_url: String,
        fecha: String,
        materiales: [String],
    },
    { collection: "clases" }
);

module.exports = mongoose.model("Clase", claseSchema);