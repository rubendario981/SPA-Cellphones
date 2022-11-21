const { Users, Cart, Cellphone, DetailCart } = require("../db.js");
const bcrypt = require("bcrypt");
const Stripe = require("stripe");
const SECRET_KEY_STRIPE =
  "sk_test_51M5u48DvLT9vn19qTA8TOlOzuB26PmvGzIM0TQN5IJfC77HnAIMdmwfnWuQl9jRtQaapf1SKeMuQ4v1gaYOdvqjk00ak0cmM9Q"; //cambiar a una variable de entorno

const stripe = new Stripe(SECRET_KEY_STRIPE);

const { mailActivateAccount } = require("../config/nodemailer.js");
const { setToken } = require("../config/configToken.js");


const URL_SERVER = process.env.URL_SERVER || 'http://localhost:3001/user/'
const URL_CLIENT = process.env.URL_CLIENT || 'http://localhost:3000/'


const registerUser = async (req, res) => {
  const { email, name } = req.body;
  console.log(email, name, "controllers");
  try {
    const findUser = await Users.findOne({ where: { email } });
    if (findUser) return res.status(400).json("Usuario ya existe");

    const newUser = await Users.create({ ...req.body, status: "Inactivo" });

    const token = setToken(newUser.id, newUser.status);

    mailActivateAccount(name, email, URL_SERVER, token);
    return res.json({ token });
  } catch (error) {
    console.log("Error en controller registro usuario", error);
    return res.status(500).json(error);
  }
};

const activateAccount = async (req, res) => {
  const token = req.query.token;
  try {
    const decodeToken = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    const activateUser = await Users.update(
      { status: "User" },
      { where: { id: decodeToken.id } }
    );
    return activateUser[0] === 0
      ? res.status(400).json('No se pudo activar cuenta')
      : res.redirect(`${URL_CLIENT}perfil`)
  } catch (error) {
    console.log("Error en controller usuario al activar cuenta", error);
    return res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const updateUser = await Users.update(
      { ...req.body },
      { where: { id: req.params.id } }
    );

    return res.json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await Users.findOne({ where: { email } });
    if(!findUser) return res.status(404).json("No estas registrado en la pagina")

    const validatePassword = await bcrypt.compareSync(
      password,
      findUser.password
    );

    if (validatePassword) {
      const token = setToken(findUser.id, findUser.status);
      return res.json({ token });
    } else {
      return res.status(400).json("Contraseña incorrecta");
    }
  } catch (error) {
    console.log("Error user controler login", error);
    return res.status(500).json(error);
  }
};

const findOrCreateCart = async (req, res) => {
  console.log("creando Carriito", req.body);
  try {
    const findUser = await Users.findByPk(req.body.id);
    if (!findUser)
      return res
        .status(404)
        .json("Controlador para crear carrito no encontro usuario");
    // encontrar carritos asociados al usuario......
  } catch (error) {}
};

const userInfo = async (req, res) => {
  try {
    const findUser = await Users.findByPk(req.query.id);
    if (!findUser) return res.json("No se encontro usuario");
    const findCarts = await Cart.findAll({
      where: { userId: req.query.id },
      include: Cellphone,
    });

    const token = setToken(findUser.id, findUser.status);

    return res.json({ token, findUser, findCarts });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const creatDatosPrueba = async (req, res) => {
  const crearCarritos = [
    { userId: 1, status: "En proceso" },
    { userId: 1, status: "Entregado" },
    { userId: 2, status: "Por despachar" },
    { userId: 3, status: "Despachado" },
    { userId: 4, status: "Entregado" },
  ];

  try {
    // Se crean usuarios de prueba correctamente
    await Users.create({
      name: "Scarlet Johanson",
      email: "scarlet@mail.com",
      password: "12345",
      status: "Admin",
    });
    await Users.create({
      name: "Gal Gadot",
      email: "gal@mail.com",
      password: "12345",
      status: "Admin",
    });
    await Users.create({
      name: "Dua Lipa",
      email: "dua@mail.com",
      password: "12345",
      status: "User",
    });
    await Users.create({
      name: "Leo Messi",
      email: "leomessi@mail.com",
      password: "12345",
      status: "User",
    });

    // se crean carritos de compra, un carrito por cada usuario y uno adicional para el usuario 1 con estado entregado
    await Cart.bulkCreate(crearCarritos);

    // se agregan productos a los diferentes carritos
    await DetailCart.create({
      cartId: 1,
      cantidad: 5,
      valor_unitario: (
        await Cellphone.findByPk(8, { attributes: ["price"] })
      ).price,
      cellphoneId: 8,
    });
    await DetailCart.create({
      cartId: 1,
      cantidad: 3,
      valor_unitario: (
        await Cellphone.findByPk(4, { attributes: ["price"] })
      ).price,
      cellphoneId: 4,
    });
    await DetailCart.create({
      cartId: 1,
      cantidad: 2,
      valor_unitario: (
        await Cellphone.findByPk(2, { attributes: ["price"] })
      ).price,
      cellphoneId: 2,
    });
    await DetailCart.create({
      cartId: 1,
      cantidad: 8,
      valor_unitario: (
        await Cellphone.findByPk(1, { attributes: ["price"] })
      ).price,
      cellphoneId: 1,
    });
    await DetailCart.create({
      cartId: 2,
      cantidad: 3,
      valor_unitario: (
        await Cellphone.findByPk(1, { attributes: ["price"] })
      ).price,
      cellphoneId: 8,
    });
    await DetailCart.create({
      cartId: 2,
      cantidad: 3,
      valor_unitario: (
        await Cellphone.findByPk(8, { attributes: ["price"] })
      ).price,
      cellphoneId: 1,
    });
    await DetailCart.create({
      cartId: 3,
      cantidad: 2,
      valor_unitario: (
        await Cellphone.findByPk(8, { attributes: ["price"] })
      ).price,
      cellphoneId: 8,
    });
    await DetailCart.create({
      cartId: 3,
      cantidad: 9,
      valor_unitario: (
        await Cellphone.findByPk(4, { attributes: ["price"] })
      ).price,
      cellphoneId: 4,
    });
    await DetailCart.create({
      cartId: 3,
      cantidad: 1,
      valor_unitario: (
        await Cellphone.findByPk(2, { attributes: ["price"] })
      ).price,
      cellphoneId: 2,
    });
    await DetailCart.create({
      cartId: 3,
      cantidad: 1,
      valor_unitario: (
        await Cellphone.findByPk(1, { attributes: ["price"] })
      ).price,
      cellphoneId: 1,
    });
    await DetailCart.create({
      cartId: 4,
      cantidad: 2,
      valor_unitario: (
        await Cellphone.findByPk(8, { attributes: ["price"] })
      ).price,
      cellphoneId: 8,
    });
    await DetailCart.create({
      cartId: 4,
      cantidad: 9,
      valor_unitario: (
        await Cellphone.findByPk(4, { attributes: ["price"] })
      ).price,
      cellphoneId: 4,
    });
    await DetailCart.create({
      cartId: 4,
      cantidad: 1,
      valor_unitario: (
        await Cellphone.findByPk(2, { attributes: ["price"] })
      ).price,
      cellphoneId: 2,
    });
    await DetailCart.create({
      cartId: 4,
      cantidad: 4,
      valor_unitario: (
        await Cellphone.findByPk(1, { attributes: ["price"] })
      ).price,
      cellphoneId: 1,
    });
    await DetailCart.create({
      cartId: 5,
      cantidad: 3,
      valor_unitario: (
        await Cellphone.findByPk(8, { attributes: ["price"] })
      ).price,
      cellphoneId: 8,
    });
    await DetailCart.create({
      cartId: 5,
      cantidad: 1,
      valor_unitario: (
        await Cellphone.findByPk(4, { attributes: ["price"] })
      ).price,
      cellphoneId: 4,
    });
    await DetailCart.create({
      cartId: 5,
      cantidad: 1,
      valor_unitario: (
        await Cellphone.findByPk(2, { attributes: ["price"] })
      ).price,
      cellphoneId: 2,
    });
    await DetailCart.create({
      cartId: 5,
      cantidad: 2,
      valor_unitario: (
        await Cellphone.findByPk(1, { attributes: ["price"] })
      ).price,
      cellphoneId: 1,
    });

    // Se busca los detalles de todos los carritos y se confirman sus datos
    const findAllCarts = await Cart.findAll({
      include: Cellphone,
    });

    console.log("Se crearon usuarios de prueba correctamente");
    // return res.json({ findAllCarts });
  } catch (error) {
    console.log("Error al crear usuarios de prueba", error);
    return res.status(500).json(error);
  }
};

const registerBuy = async (req, res) => {
  try {
    const { idUser, id, amount, receipt_email, metadata } = req.body;

    const payment = await stripe.paymentIntents.create({
      customer: idUser,
      payment_method: id,
      receipt_email,
      amount,
      currency: "USD",
      description: "Cell World",
      metadata,
      confirm: true,
    });

    console.log(payment);

    res.json({ message: "SuccesFull payment." });
  } catch (error) {
    res.json({ message: error.raw.message });
  }
};

module.exports = {
  registerUser,
  updateUser,
  login,
  userInfo,
  creatDatosPrueba,
  registerBuy,
  activateAccount,
};
