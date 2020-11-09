const cartRouter = require("express").Router();
const passport = require("passport");

const {User, Product, Cart, CartProductQuant } = require("../Models/index");
const S = require("sequelize");

cartRouter.post("/", (req, res) => {
    const productId = req.body.product.id;
    const userId = req.body.user.id;
  
    Cart.findAll({
      where: {
        UserId: req.body.user.id,
        isPaid: false,
      },
      include: [{ model: Product }],
    })
      .then((cart) => {
        //Si no hay carro creo uno
        if (cart.length === 0) {
          Cart.create({
            UserId: userId,
          }).then((newCart) => {
            CartProductQuant.create({
              quantity: 1,
              ProductId: productId,
              CartId: userId,
            });
            res.send(newCart);
          });
          //Si ya tiene carro agregá productos
        } else {
          //console.log("buscar error");
          CartProductQuant.findAll({
            where: {
              CartId: cart[0].id,
              ProductId: productId,
            },
          }).then((cartQuant) => {
            if (cartQuant.length === 0) {
              CartProductQuant.create({
                quantity: 1,
                ProductId: productId,
                CartId: userId,
              }).then(() => res.sendStatus(200));
            } else {
              cartQuant[0].increment("quantity").then(() => res.sendStatus(200));
            }
          });
        }
      })
      .catch((error) => console.log(error));
  });
  
  cartRouter.put("/", (req, res) => {
    Cart.findAll({
      where: {
        UserId: req.body.user.id,
        isPaid: false,
      },
      include: [{ model: Product }],
    }).then((cart) => {
      CartProductQuant.findAll({
        where: {
          CartId: cart[0].id,
          ProductId: req.body.product.id,
        },
      }).then((cartQuant) => {
        cartQuant[0].increment("quantity");
      });
    });
  });
  
  cartRouter.get("/:userId", (req, res) => {
    Cart.findAll({
      where: {
        UserId: req.params.userId,
      },
      include: [{ model: Product }],
      //order: [Cart.ProductId, "id", "DESC"]
      // ['id', 'DESC'],,
    }).then((cart) => {
      // console.log('CARRITO', cart)
      res.send(cart[0]);
    });
  });
  
  /* router.get("/cart", (req, res) => {
    Cart.findAll({
      where: {
        UserId: 100,
      },
      include: [{ model: Product }],
    }).then((cart) => {
      console.log("cart", cart);
      res.send(cart);
    });
  }); */
  
  //Modificar cantidad (mandar user object, product object y {cant: 1} (ó -1 dependiendo el caso))
  cartRouter.put("/cant", (req, res) => {
    console.log("req body", req.body);
    Cart.findAll({
      where: {
        UserId: req.body.user.id,
        isPaid: false,
      },
      include: [{ model: Product }],
    })
      .then((cart) => {
        CartProductQuant.findAll({
          where: {
            CartId: cart[0].id,
            ProductId: req.body.product.id,
          },
        }).then((cartQuant) => {
          if (cartQuant[0].quantity + req.body.cant.cant < 1) {
            (cartQuant[0].increment = 0), cartQuant[0].save;
          } else {
            cartQuant[0].increment("quantity", { by: req.body.cant.cant });
          }
        });
      })
      .then(() => res.sendStatus(200));
  });
  
  //Eliminar del carro
  cartRouter.put("/destroy", (req, res) => {
    Cart.findAll({
      where: {
        UserId: req.body.user.id,
        isPaid: false,
      },
      include: [{ model: Product }],
    })
      .then((cart) => {
        CartProductQuant.findAll({
          where: {
            CartId: cart[0].id,
            ProductId: req.body.product.id,
          },
        }).then((cartQuant) => {
          cartQuant[0].destroy();
        });
      })
      .then(() => res.sendStatus(200));
  });

  module.exports = cartRouter
