const express = require('express')
const Contenedor = require('./Contenedor.js');

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on("Error", error => console.log(`Error en servidor ${error}`));

const productos = new Contenedor("productos.txt");
const main = async function () {
    await productos.main();
}
main();

app.get('/productos', (req, res) => {
    let listaProductos = productos.getAll();
    res.send(listaProductos)
})

app.get('/productoRandom', (req, res) => {
    let listaProductos = productos.getAll();
    let posicion = parseInt(Math.random() * listaProductos.length);
    res.send(listaProductos[posicion]);
})
