# Trabajo Práctico Nº4 - Servidores avanzados en Node.js

Crear un servidor Node.js con express que realice las siguientes acciones:

1. Debe proveer en su ruta raíz un formulario de entrada que envíe vía post al endpoint ‘/ingreso’
   los datos de un producto: nombre, precio, descripción y la url de su foto (esta vista será estática).
2. La información recibida por el backend, se almacenará en la colección ‘productos’ presente en
   una base de datos MongoDB Atlas (crear una cuenta propia).
3. Se deberá disponer de otra ruta get ‘/listar’ la cual devuelva una vista dinámica con una tabla que
   contenga los productos ingresados. La tabla tendrá las columnas Nombre, Precio (anteponer un $ en
   el valor), Descripción y Foto (representarla como imágen). Esta vista podrá ser implementada con
   handlebars, ejs ó pug a elección.
4. Si al listar no se encontraran productos, mostrar el mensaje: ‘No hay productos para listar’.
5. Cada 10 productos ingresados, el servidor deberá enviarnos un email con el listado completo.
   La dirección de correo la ingresaremos a través de un formulario. Dicho formulario estático se
   servirá en la ruta get ‘/set-correo’ y enviará los datos por post al endpoint ‘/set-correo’. El correo se
   almacenará en el archivo correo.dat en el filesystem del servidor. Al iniciar el servidor, si este
   archivo no está presente, crearlo con la dirección de correo de cada uno de ustedes.
   6 Subir el proyecto a un repo en github y realizar el deploy del servidor en Heroku (los repos
   pueden ser distintos)
