const express = require('express');
const path = require('path');
const mainRouter = require('./routes/mainRoutes.routes');


const app = express();
app.set("view engine", "ejs");
app.use('/', mainRouter);


app.use(express.json());



const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.listen(3000, () =>{
    console.log(`Servidor corriendo en Puerto 3000`);
});







