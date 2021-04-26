import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: "Se requiere ingresar un título",
    minLength: 1,
    maxLength: 100,
  },
  precio: {
    type: Number,
    required: "Se requiere ingresar un precio",
  },
  descripcion: {
    type: String,
    required: "Se requiere ingresar una descripción",
    minLength: 1,
    maxLength: 400,
  },
  urlFoto: {
    type: String,
    required: "Se requiere ingresar una url a la imágen",
    minLength: 1,
  },
});

const Producto = mongoose.model("Producto", productoSchema);

export default Producto;
