
const productosController = { 
    paginaProductos: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/productDetail.html'));
        res.render("productDetail");
    },
    newProduct: (req, res) => {
        res.render("newProduct");
    }
};

module.exports = productosController;
