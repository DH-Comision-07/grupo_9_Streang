const express = require('express');
const path = require('path');
const mainRouter = require('./routes/mainRoutes.routes');
const app = express();
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.use('/', mainRouter);


const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

const PORT = process.env.PORT || 3000;

app.use((req, res, next) =>{
    res.status(404).render('not-found')
})

app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`);
});







