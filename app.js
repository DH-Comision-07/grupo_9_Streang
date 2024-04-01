const express = require('express');
const path = require('path');
const mainRouter = require('./routes/mainRoutes.routes');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set("view engine", "ejs");
app.use('/', mainRouter);


const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.use((req, res, next) =>{
    res.status(404).render('not-found')
})

app.listen(3000, () =>{
    console.log(`Servidor corriendo en Puerto 3000`);
});







