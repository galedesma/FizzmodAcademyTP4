//import nodeMailer from "nodemailer";
import Producto from "../models/producto.js";

/* ---------CONFIGURO NODEMAILER------------ */

/* const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.PASSWORD}`,
  },
}); */

/* ---------------------------------------- */

export const mostrarFormularioProducto = (req, res) => {
  res.render("formulario");
};

export const postNuevoProducto = (req, res) => {
  let nuevoProducto = {
    nombre: req.body.nombreProducto,
    precio: req.body.precioProducto,
    descripcion: req.body.descripcionProducto,
    urlFoto: req.body.imagenProducto,
  };

  const producto = new Producto(nuevoProducto);

  producto
    .save()
    .then((result) => {
      console.log("Creando nuevo producto", result);

      Producto.find()
        .then((resultados) => {
          if (resultados.length % 10 == 0) {
            res.redirect("/set-correo");
          } else {
            console.log("Producto Creado");
            res.redirect("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("Formulario enviado");
};

export const listarProductos = (req, res) => {
  Producto.find()
    .then((resultados) => {
      res.render("tabla", { resultados });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const mostrarFormularioEmail = (req, res) => {
  res.render("set-correo");
};

/* La autenticación de las credenciales de google falla si trato de importar el método */
/* export const enviarEmail = (req, res) => {
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
        to: `${req.body.usuarioEmail}`,
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
} */
