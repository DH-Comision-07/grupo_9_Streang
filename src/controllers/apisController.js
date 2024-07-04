let db = require("../data/models");
const Op = db.Sequelize.Op;
const bycryptjs = require("bcryptjs");

const controller = {
  // APIs de usuarios
  listUsers: async function (req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.headers.origin && ['http://localhost:3000', 'http://localhost:3001'].includes(req.headers.origin)) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    } // Para permitir acceso a la base de datos

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
  listProducts: async function (req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.headers.origin && ['http://localhost:3000', 'http://localhost:3001'].includes(req.headers.origin)) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    } // Para permitir acceso a la base de datos

    try {
      await db.Products.findAll().then((products) => {
        const response = {
          meta: {
            status: 200,
            total: products.length,
            url: "/api/products",
          },
          data: products,
        };
        return res.json(response);
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  productDetail: async function (req, res) {
    try {
      let product = await db.Products.findByPk(req.params.id);
      if (!product || product == null) {
        return res.status(404).json({ error: "No se encontro el producto" });
      }
      let response = {
        meta: {
          status: 200,
          url: "/api/products/:id",
        },
        data: product,
      };
      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  createProduct: async function (req, res) {
    try {
      function extractYouTubeId(url) {
        const match = url.match(/[?&]v=([^?&]+)/);
        return match ? match[1] : null;
      }
      const youtubeId = extractYouTubeId(req.body.video);

      req.body.video = youtubeId;
      req.body.final_price =
        req.body.price - (req.body.price * req.body.discount) / 100;

      await db.Products.create({
        main_image: "default.avif",
        more_images_1: "default.avif",
        more_images_2: "default.avif",
        more_images_3: "default.avif",
        banner_image: "default.avif",
        platform_id: 1,
        format_id: 1,
        ...req.body,
      }).then((product) => {
        const response = {
          meta: {
            status: 200,
            url: "/api/products/" + product.id,
          },
          message: "product created",
          data: product,
        };
        return res.json(response);
      });
    } catch (error) {
      console.log(error);
      return res.json({ error: "No se pudo crear el producto" });
    }
  },

  deleteProduct: async function (req, res) {
    let productToEdit = await db.Products.findByPk(req.params.id);
    try {
      if (!productToEdit) {
        return res.json({ error: "No se encontro el producto" });
      }

      await db.Products.destroy({
        where: {
          id: req.params.id,
        },
      }).then((product) => {
        const response = {
          meta: {
            status: 200,
            url: "/api/products/" + product.id,
          },
          message: "product deleted",
        };
        return res.json(response);
      });
    } catch (error) {
      console.log(error);
      return res.json({ error: "No se pudo eliminar el producto" });
    }
  },

  updateProduct: async function (req, res) {
    let productToUpdate = await db.Products.findByPk(req.params.id);

    try {
      if (!productToUpdate) {
        return res.json({ error: "No se encontro el producto" });
      }

      function extractYouTubeId(url) {
        const match = url.match(/[?&]v=([^?&]+)/);
        return match ? match[1] : null;
      }
      const youtubeId = extractYouTubeId(req.body.video);

      req.body.video = youtubeId;
      req.body.final_price =
        req.body.price - (req.body.price * req.body.discount) / 100;

      await db.Products.update(
        {
          main_image: productToUpdate.main_image,
          more_images_1: productToUpdate.more_images_1,
          more_images_2: productToUpdate.more_images_2,
          more_images_3: productToUpdate.more_images_3,
          banner_image: productToUpdate.banner_image,
          platform_id: 1,
          format_id: 1,
          ...req.body,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      let productUpdated = await db.Products.findByPk(req.params.id);
      let response = {
        meta: {
          status: 200,
          url: "/api/products/" + productUpdated.id,
        },
        message: "product updated",
        data: productUpdated,
      };
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.json({ error: "No se pudo actualizar el producto" });
    }
  }
};

module.exports = controller;