const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const Producto = require("./models/producto");
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

/* --------------MIDDLEWARES--------------- */

app.use(bodyParser.json());

/* ----------------MULTER----------------- */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

/* -------------CONFIGURO EJS-------------- */
app.set("views", "./views");
app.set("view engine", "ejs");

/* ---------------RUTAS-------------- */

/* FORMULARIO DE INGRESO DE PRODUCTO */
app.get("/", (req, res) => {
  //Debe mostrar un formulario
  res.render("formulario");
});

app.post("/ingreso", upload.single("imagenProducto"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error(`Error subiendo el archivo`);
    error.httpStatusCode = 400;
    return next(error);
  }

  let nuevoProducto = {
    nombre: req.body.nombreProducto,
    precio: req.body.precioProducto,
    descripcion: req.body.descripcionProducto,
    urlFoto: req.file.path,
  };

  const producto = new Producto(nuevoProducto);
  console.log("Creando producto", nuevoProducto);

  producto
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("Formulario enviado");
});

/* LISTADO DE PRODUCTOS */
app.get("/listar", (req, res) => {
  //Debe mostrar una tabla
  res.send("<h1>Listar</h1>");
});

app.get("/set-correo", (req, res) => {
  res.render("set-correo");
});

app.post("/set-correo", (req, res) => {
  console.log("Correo Enviado");
  console.log(req.body);
  res.redirect("/set-correo");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Servidor andando en puerto ${PORT}`);
});
