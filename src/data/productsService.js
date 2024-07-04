const path = require('path');
const fs = require('fs');
// const { viewCategory, viewDiscounts } = require('../controllers/productosController');
// const { create } = require('domain');
// const session = require('express-session');
const {validationResult} = require('express-validator');
// const userController = require("../controllers/userController");
let db = require("./models");
const Op = db.Sequelize.Op



const productsService = {


    setUser: function(req){
        let user = req.session.userLogged;
        return user;
    },

    check: function(req){
        let user = req.session.userLogged;
        return user;
    },

    getAll: async function(req, res){
        try{
            const products = await db.Products.findAll();
            // console.log(products);
            return products;
        } catch(error){
            console.log(error);
        }
        
    },

    getOne: async function(req, res){
        let product = await db.Products.findByPk(req.params.id);
        let comments = await db.Comments.findAll({where: {product_id: req.params.id}});
        let products = await db.Products.findAll({where: {category : product.category}});
        console.log(comments);
        res.render('productDetail', {product: product, comments: comments, products});
    },

    viewCategory: async function(category){
        let result = db.Products.findAll({where: {category: category}});
        return result;
    },

    create: async function(req, res){

        // Verificacion de imagenes. Si no se cargo una imagen, se define por defecto la imagen "default.avif"
        let mainImage = "";
        let moreImages1 = "";
        let moreImages2 = "";
        let moreImages3 = "";
        let bannerImage = "";

        if(!req.files['mainImage'] || req.files['mainImage'][0] == undefined || !req.files['mainImage'][0]){
            mainImage = 'default.avif'
        } else {
            mainImage = req.files['mainImage'][0].filename;
        }

        if(!req.files['moreImages'] || req.files['moreImages'][0] == undefined){
            moreImages1 = "default.avif"
            moreImages2 = "default.avif"
            moreImages3 = "default.avif";
        } else if (req.files['moreImages'][1] == undefined){
            moreImages1 = req.files['moreImages'][0].filename;
            moreImages2 = "default.avif"
            moreImages3 = "default.avif";
        } else if( req.files['moreImages'][2] == undefined){
            moreImages1 = req.files['moreImages'][0].filename;
            moreImages2 = req.files['moreImages'][1].filename;
            moreImages3 = "default.avif";
        } else {
            moreImages1 = req.files['moreImages'][0].filename;
            moreImages2 = req.files['moreImages'][1].filename;
            moreImages3 = req.files['moreImages'][2].filename;
        }

        if(!req.files['bannerImage'] || req.files['bannerImage'][0] == undefined){
            bannerImage = 'default.avif';
        } else {
            bannerImage = req.files['bannerImage'][0].filename;
        }
        
        function extractYouTubeId(url) {
            const match = url.match(/[?&]v=([^?&]+)/);
            return match ? match[1] : null;
        }
        const youtubeId = extractYouTubeId(req.body.video);

        let finalPrice = parseFloat(req.body.price) - (parseFloat(req.body.price) * (parseFloat(req.body.discount) / 100));
        
        try{            
            let newProduct = await db.Products.create({
                name: req.body.name,
                price: parseFloat(req.body.price),
                video: youtubeId,
                description: req.body.description,
                available: true,
                main_image: mainImage,
                more_images_1: moreImages1,
                more_images_2: moreImages2,
                more_images_3: moreImages3,
                banner_image: bannerImage,
                category: req.body.category || "others",
                discount: parseFloat(req.body.discount),
                final_price: finalPrice,
                format_id: 1,
                platform_id: 1,
                stock: parseInt(req.body.stock)
            })

            return res.redirect("/");
                
        } catch (error) {
            console.log(error);
            // return error;
        }

    },

    viewEdit: async function(req, res){
        // let productToEdit = this.products.find(product => product.id == id);
        let productToEdit = await db.Products.findByPk(req.params.id);
        res.render('editProduct', {product: productToEdit});
    },

    viewDiscounts: async function(){
        let discounts = await db.Products.findAll({where: {discount: {[Op.gt]: 0}}});
        return discounts;
    },

    edit: async function(req, res){

        let productToEdit = await db.Products.findByPk(req.params.id);
        if(!productToEdit){
            res.status(400).json({"Ocurrio un error": "No se encontro el producto"});
        }
        // Verificacion de imagenes.
        let mainImage = "";
        let moreImages1 = "";
        let moreImages2 = "";
        let moreImages3 = "";
        let bannerImage = "";

        if(!req.files['mainImage'] || req.files['mainImage'][0] == undefined || !req.files['mainImage'][0]){
            mainImage = productToEdit.main_image;
        } else {
            mainImage = req.files['mainImage'][0].filename;
        }

        if(!req.files['moreImages'] || req.files['moreImages'][0] == undefined){
            moreImages1 = productToEdit.more_images_1;
            moreImages2 = productToEdit.more_images_2;
            moreImages3 = productToEdit.more_images_3;
        } else if (req.files['moreImages'][1] == undefined){
            moreImages1 = req.files['moreImages'][0].filename;
            moreImages2 = productToEdit.more_images_2;
            moreImages3 = productToEdit.more_images_3;
        } else if( req.files['moreImages'][2] == undefined){
            moreImages1 = req.files['moreImages'][0].filename;
            moreImages2 = req.files['moreImages'][1].filename;
            moreImages3 = productToEdit.more_images_3;
        } else {
            moreImages1 = req.files['moreImages'][0].filename;
            moreImages2 = req.files['moreImages'][1].filename;
            moreImages3 = req.files['moreImages'][2].filename;
        }

        if(!req.files['bannerImage'] || req.files['bannerImage'][0] == undefined){
            bannerImage= productToEdit.banner_image;
        } else {
            bannerImage = req.files['bannerImage'][0].filename;
        }

        let finalPrice = parseFloat(req.body.price) - (parseFloat(req.body.price) * (parseFloat(req.body.discount) / 100));

        // OBTENER ID DE VIDEO DE YOUTUBE
        function extractYouTubeId(url) {
            const match = url.match(/[?&]v=([^?&]+)/);
            return match ? match[1] : null;
        }
        const youtubeId = extractYouTubeId(req.body.video);

        try{
            await db.Products.update({
                name: req.body.name,
                price: parseFloat(req.body.price),
                video: youtubeId,
                description: req.body.description,
                available: true,
                main_image: mainImage,
                more_images_1: moreImages1,
                more_images_2: moreImages2,
                more_images_3: moreImages3,
                banner_image: bannerImage,
                category: req.body.category,
                discount: parseFloat(req.body.discount),
                final_price: finalPrice,
                format_id: 1,
                platform_id: 1,
                stock: parseInt(req.body.stock)
            }, {
                where:{
                    id: req.params.id}
            })
        } catch(error) {
            console.log(error);
            // res.status(400).json({"Ocurrio un error": error})
            res.redirect(`/products/edit/${req.params.id}`);
        }		
    },

    delete: async function(id){
        try {
            let productToDelete = await db.Products.findByPk(id);
            if(productToDelete){
                await productToDelete.destroy();
            } else {
                res.send("producto no encontrado");
            }
        } catch(error) {
            return error;
        }
        

    },

    search: async function(req, res){
        try{
            let searched = req.query.query_search;
            let result = await db.Products.findAll({where: {name: {[Op.like]: `%${searched}%`}}});
            res.render("search", {result: result});
        } catch(error) {
            console.log(error);
            res.status(400).json({"Ocurrio un error": error})
        }
    }
}
module.exports = productsService;