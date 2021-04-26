import express from "express";
import bodyParser from "body-parser";
import {
  mostrarFormularioProducto,
  postNuevoProducto,
  listarProductos,
  mostrarFormularioEmail,
} from "./controllers/index.js";
import fs from "fs";
import mongoose from "mongoose";
import nodeMailer from "nodemailer";
import Producto from "./models/producto.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

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

app.use(bodyParser.urlencoded({ extended: true }));

/* ---------CONFIGURO NODEMAILER------------ */

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.PASSWORD}`,
  },
});

/* -------------CONFIGURO EJS-------------- */

app.set("views", "./views");
app.set("view engine", "ejs");

/* --------------FILE SYSTEM--------------- */

if (!fs.existsSync("correo.dat")) {
  fs.writeFileSync("correo.dat", "gonza.a.ledesma@gmail.com");
  console.log("correo.dat email ini");
}

/* ------------------RUTAS----------------- */

app.get("/", mostrarFormularioProducto);

app.post("/ingreso", postNuevoProducto);

app.get("/listar", listarProductos);

app.get("/set-correo", mostrarFormularioEmail);

app.post("/set-correo", (req, res) => {
  let { usuarioEmail } = req.body;

  fs.writeFile("correo.dat", usuarioEmail, (err) => {
    if (err) {
      throw new Error(`Error en la escritura de correo: ${err}`);
    }
  });

  Producto.find()
    .then((resultados) => {
      let rows = "";

      resultados.forEach((producto) => {
        rows += `
        <tr style="border: 1px solid black">
          <td style="border: 1px solid black">${producto.nombre}</td>
          <td style="border: 1px solid black">$${producto.precio}</td>
          <td style="border: 1px solid black">${producto.descripcion}</td>
          <td style="border: 1px solid black"><img src="${producto.urlFoto}" /></td>
        </tr>`;
      });

      const mailOptions = {
        from: `${process.env.EMAIL}`,
        to: `${usuarioEmail}`,
        subject: `Nuestra lista alcanzó los ${resultados.length} productos`,
        html: `
        <table style="border: 1px solid black">
          <thead style="border: 1px solid black">
            <tr style="border: 1px solid black">
              <th style="border: 1px solid black">Nombre</th>
              <th style="border: 1px solid black">Precio</th>
              <th style="border: 1px solid black">Descripción</th>
              <th style="border: 1px solid black">Imágen</th>
            </tr>
          </thead>
          <tbody style="border: 1px solid black">
            ${rows}
          </tbody>
        </table>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log(info);
      });
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("Correo Enviado");
  console.log(req.body);
  res.redirect("/set-correo");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Servidor andando en puerto ${PORT}`);
});
