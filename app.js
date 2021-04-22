const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

/* --------------CONEXIÓN A MONGODB-------------- */
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

app.get("/", (req, res) => {
  //Debe mostrar un formulario
  res.send("<h1>Servidor andando</h1>");
});

app.get("/listar", (req, res) => {
  //Debe mostrar un formulario
  res.send("<h1>Listar</h1>");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Servidor andando en puerto ${PORT}`);
});
