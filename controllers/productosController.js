const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/json-products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productosController = { 
    paginaProductos: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/productDetail.html'));
        res.render("productDetail");
    },

    productDetail: (req, res) => {
        let productId = req.params.id;
        if(productId == "create"){
           res.render("newProduct");
        } else {
            let product = products.find(product => product.id == productId);
            res.render("productDetail", {product: product});
        }      
    }, 

    newProduct: (req, res) => {
        res.render("newProduct");

    },
    create: function(req, res){
        let maxId = 0;
        for (const obj of products) {
            if (obj.id && obj.id > maxId) {
                maxId = obj.id;
            }
        }

        function extractYouTubeId(url) {
            const match = url.match(/[?&]v=([^?&]+)/);
            return match ? match[1] : null;
        }
        const youtubeId = extractYouTubeId(req.body.video);
       
        try{            
            let newProduct = {
                id: maxId + 1,
                name: req.body.name,
                price: parseFloat(req.body.price),
                video: youtubeId,
                description: req.body.description,
                mainImage: req.files['mainImage'][0],
                moreImages: req.files['moreImages'],
                bannerImage: req.files['bannerImage'][0],
                category: req.body.category,
                discount: parseFloat(req.body.discount),
                finalPrice : parseFloat(req.body.price) - (parseFloat(req.body.price) * (parseFloat(req.body.discount) / 100)),
                format: req.body.format,
                platform: req.body.platform,
                stock: parseInt(req.body.stock)
            }
            console.log(youtubeId);
            products.push(newProduct);
            let JSONproducts = JSON.stringify(products);
            fs.writeFileSync(productsFilePath, JSONproducts);
            res.send(products);                
                
        } catch (error) {
            res.status(500).send(`No se seleccionaron las imágenes correspondientes. Seleccione las imágenes
            que desea cargar e intente nuevamente.`);
        }
    }
};

module.exports = productosController;
