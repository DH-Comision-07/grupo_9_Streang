// const fs = require('fs');
// const path = require('path');
// const usersFilePath = path.join(__dirname, '../data/users.json');
// let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))


// function rememberMiddleware(req, res, next){
//     let userLog = ''
//     if(req.cookies.Recordarme){
//         for (let i = 0; i < users.length; i++ ) {
//             if (users[i].email == req.cookies.Recordarme) {
//                 userLog = users[i];
//                 break;
//             }
//         }
//         req.session.userLogged = userLog;
//         res.locals.user = req.session.userLogged;
//     }   
//     next();
// }


// module.exports = rememberMiddleware;