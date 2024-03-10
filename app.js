const express = require('express');
const path = require('path');
const rutasRegister = require('./routes/register.js');
const rutasProductos = require('./routes/productos.js');
const rutasLogin = require('./routes/login.js');
const rutasCart = require('./routes/cart.js');
const rutasMain = require('./routes/main.js');

const app = express();
app.use ('/register', rutasRegister);
app.use ('/producto', rutasProductos);
app.use ('/login', rutasLogin);
app.use ('/cart', rutasCart);
app.use ('/', rutasMain);

app.use(express.json());

app.set("view engine", "ejs");

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.listen(3000, () =>{
    console.log(`Servidor corriendo en Puerto 3000`);
});







