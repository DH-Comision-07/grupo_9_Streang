const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.listen(3000, () =>{
    console.log(`Servidor corriendo en Puerto ${port}`)
});

// route para pagina raiz
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'))
});

// route para pagina de producto
app.get('/producto', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'))
});

// router para pagina de registro
app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'))
});

// router para pagina de carrito
app.get('/cart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/cart.html'))
});
