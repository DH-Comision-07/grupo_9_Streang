let db = require("../data/models");
const Op = db.Sequelize.Op;
const bycryptjs = require("bcryptjs");

const controller = {
  // APIs de usuarios
  listUsers: async function (req, res) {
    await db.Users.findAll()
      .then((users) => {
        const response = {
          meta: {
            status: 200,
            total: users.length,
            url: "/api/users",
          },
          data: users,
        };
        return res.json(response);
      })
      .catch((error) => res.json(error));
  },
  userDetail: async function (req, res) {
    try {
      await db.Users.findByPk(req.params.id).then((user) => {
        if (user == null) {
          return res.json({ error: "No se encontro el usuario" });
        } else {
          const response = {
            meta: {
              status: 200,
              url: "/api/users/:id",
            },
            data: user,
          };
          return res.json(response);
        }
      });
    } catch {
      (error) => res.json(error);
    }
  },

  createUser: async function (req, res) {
    const hashedPass = bycryptjs.hashSync(req.body.password, 10);
    req.body.password = hashedPass;
    console.log(hashedPass);
    await db.Users.create({
      password: hashedPass,
      rol_id: 1,
      avatar: "avatar-default.png",
      ...req.body,
    })
      .then((user) => {
        user.password = undefined;
        const response = {
          meta: {
            status: 200,
            url: "/api/users/" + user.id,
          },
          data: user,
        };
        return res.json(response);
      })
      .catch((error) => res.json(error));
  },

  deleteUser: async function (req, res) {
    let userToDelete = await db.Users.findByPk(req.params.id);
    try {
      if (!userToDelete) {
        return res.json({ error: "No se encontro el usuario" });
      }
      await db.Users.destroy({
        where: {
          id: req.params.id,
        },
      }).then((user) => {
        const response = {
          meta: {
            status: 200,
            url: "/api/users/" + user.id,
          },
          message: "user deleted",
        };
        return res.json(response);
      });
    } catch (error) {
      res.json(error);
    }
  },
  updateUser: async function (req, res) {
    let userToUpdate = await db.Users.findByPk(req.params.id);
    try {
      if (!userToUpdate) {
        return res.json({ error: "No se encontro el usuario" });
      }
      if (req.body.password) {
        req.body.password = bycryptjs.hashSync(req.body.password, 10);
      }
      await db.Users.update(
        {
          ...req.body,
          ...userToUpdate,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      let updatedUser = await db.Users.findByPk(req.params.id);
      console.log(updatedUser);

      const response = {
        meta: {
          status: 200,
          url: "/api/users/" + updatedUser.id,
        },
        message: "user updated",
        data: updatedUser,
      };
      return res.json(response);
    } catch (error) {
      res.json(error);
    }
  },

  // APIs de productos
};
module.exports = controller;
