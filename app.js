const express = require('express');
const path = require('path');
const mainRouter = require('./src/routes/mainRoutes.routes');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const passUserToViews = require('./src/middlewares/passUserToViews.js');
const cookieParser = require('cookie-parser')
const rememberMeMiddleware = require('./src/middlewares/rememberMeMiddleware.js')



app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({secret: "streang2024"}));
app.use(cookieParser());
app.use(rememberMeMiddleware)

app.set("view engine", "ejs");
app.set('views', 'src/views')
app.use('/', passUserToViews, rememberMeMiddleware, mainRouter);


const publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath));

const PORT = process.env.PORT || 3000;

app.use((req, res, next) =>{
    res.status(404).render('not-found')
})

app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`);
});