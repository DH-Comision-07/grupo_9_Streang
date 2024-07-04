let db = require("../data/models");

const controller = {
    sendMessage: async function(req, res){
        try{
            db.Contact.create(req.body)
            res.render('contactResponse',{response:{msg:"Tu mensaje fue enviado con éxito! Nos comunicaremos contigo lo antes posible."}})
        }catch(error){
           console.log(error);
           res.render('contactResponse',{response:{msg:"Ocurrio un error y tu mensaje no fue enviado. Intenta de nuevo más tarde."}})
        }
        
    }
}

module.exports = controller