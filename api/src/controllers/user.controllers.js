const { Users, Cart, Cellphone, DetailCart, Rating } = require("../db.js");
const bcrypt = require("bcrypt");
const Stripe = require("stripe");
const SECRET_KEY_STRIPE =
  "sk_test_51M5u48DvLT9vn19qTA8TOlOzuB26PmvGzIM0TQN5IJfC77HnAIMdmwfnWuQl9jRtQaapf1SKeMuQ4v1gaYOdvqjk00ak0cmM9Q"; //cambiar a una variable de entorno

const stripe = new Stripe(SECRET_KEY_STRIPE);

const {
  mailActivateAccount,
  mailToRecoveryPassword,
  BuyCart,
} = require("../config/nodemailer.js");
const { setToken, verifyToken } = require("../config/configToken.js");

const URL_SERVER = process.env.URL_SERVER || "http://localhost:3001/user/";
const URL_CLIENT = process.env.URL_CLIENT || "http://localhost:3000/";

const registerUser = async (req, res) => {
  const { email, name } = req.body;
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
      ? res.status(400).json("No se pudo activar cuenta")
      : res.redirect(`${URL_CLIENT}perfil`);
  } catch (error) {
    console.log("Error en controller usuario al activar cuenta", error);
    return res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    await Users.update({ ...req.body }, { where: { id: req.params.id } });
    const findUser = await Users.findByPk(req.params.id);
    const findCarts = await Cart.findAll({
      where: { userId: req.params.id },
      include: Cellphone,
    });

    return res.json({ findUser, findCarts });
  } catch (error) {
    console.log("Error en controler usuario al actualizar usuario", error);
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await Users.findOne({ where: { email } });
    if (!findUser)
      return res.status(404).json("No estas registrado en la pagina");

    const validatePassword = await bcrypt.compareSync(
      password,
      findUser.password
    );

    if (validatePassword) {
      const token = setToken(findUser.id, findUser.status);
      const findCarts = await Cart.findAll({
        where: { userId: findUser.id },
        include: Cellphone,
      });
      return res.json({ token, findCarts, findUser });
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

const recoveryPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json("Correo no identificado");
  try {
    const findUser = await Users.findOne({ where: { email } });
    if (!findUser) {
      return res
        .status(404)
        .json({ message: `El correo ${email} no esta registrado ` });
    } else {
      const token = setToken(findUser.id, findUser.status, 600);

      mailToRecoveryPassword(email, findUser.name, URL_CLIENT);
      return res.json({
        message: `Por favor revisa tu cuenta de correo ${email} para continuar el proceso de recuperacion de contraseña`,
        token,
      });
    }
  } catch (error) {
    console.log("Error controlador usuario recuperacion contraseña", error);
    return res.status(500).json(error);
  }
};

const setNewPasswordUser = async (req, res) => {
  const { password, token } = req.body;
  if (!token) return res.status(404).json("Sin token para procesar!!!");
  try {
    const valitadeToken = await verifyToken(token);

    if (!valitadeToken) return res.status(400).json("Token expirado!!!");
    const salt = await bcrypt.genSaltSync(10);
    const cryptPasswd = await bcrypt.hashSync(password, salt);

    const findAndUpdateUser = await Users.update(
      { password: cryptPasswd },
      { where: { id: valitadeToken.id } }
    );
    return res.json(
      findAndUpdateUser[0] === 0
        ? "Fallo proceso asignacion nueva contraseña"
        : "Contraseña actualizada correctamente"
    );
  } catch (error) {
    console.log(
      "Error en controlador establecer nueva contraseña usuario",
      error
    );
    return res.status(500).json(error);
  }
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
    console.log(
      "Error controlador usuario al tener informacion usuario",
      error
    );
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
    await Users.create({
      name: "Ruben Guzman",
      email: "rubendario981@hotmail.com",
      password: "12345",
      status: "Admin",
    });

    await Users.create({
      name: "Fermin Solaberrieta",
      email: "fermin234@hotmail.com",
      password: "$2b$10$i9r4a4bUo9l.MxQcZFjwg.GwWXtDB59poQa4Ce9RUERvpkRBECx.S",
      status: "Inactivo",
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
    
    console.log("Se crearon usuarios de prueba correctamente");

    await Rating.create({ cellphoneId: 1, title: "Muy buen producto",   comment: "Un muy buen celular a muy buen precio",         score: 4, userId: 1 })
    await Rating.create({ cellphoneId: 1, title: "Buen servicio",       comment: "La atencion fue genial",                        score: 5, userId: 3 })
    await Rating.create({ cellphoneId: 2, title: "No rinde la bateria", comment: "Tengo que cargar el celular cada dos horas",    score: 2, userId: 1 })
    await Rating.create({ cellphoneId: 2, title: "Va lento al jugar",   comment: "No puedo jugar mi juego favorito, lo demas ok", score: 3, userId: 2 })
    await Rating.create({ cellphoneId: 2, title: "Memoria muy chica",   comment: "No me alcanza su memoria interna para fotos",   score: 3, userId: 3 })
    await Rating.create({ cellphoneId: 3, title: "Es lo maximo ",       comment: "El mejor celular que he tenido en la vida ",    score: 5, userId: 4 })
    await Rating.create({ cellphoneId: 3, title: "Va muy bien",         comment: "Funcionamiento excelente para juegos",          score: 4, userId: 5 })
    await Rating.create({ cellphoneId: 4, title: "Increible calidad",   comment: "La mejor compra en relacion calidad precio",    score: 4, userId: 1 })
    await Rating.create({ cellphoneId: 4, title: "Justo lo que espere", comment: "Un amigo lo tiene y funciona muy bien",         score: 4, userId: 2 })
    await Rating.create({ cellphoneId: 5, title: "Muy buen diseño ",    comment: "Tiene un diseño que me enamoro",                score: 5, userId: 6 })
    await Rating.create({ cellphoneId: 5, title: "Camaras destacables", comment: "El set de camaras es espectacular",             score: 4, userId: 3 })
    await Rating.create({ cellphoneId: 6, title: "Buena resolucion",    comment: "Las fotos se ven geniales en todo ambiente",    score: 4, userId: 2 })
    await Rating.create({ cellphoneId: 6, title: "Pantalla intermite ", comment: "En ocasiones la pantalla enciende apaga",       score: 3, userId: 5 })
    await Rating.create({ cellphoneId: 6, title: "Tamaño enorme",       comment: "El tamaño es muy grande y se resbala aveces",   score: 3, userId: 6 })
    await Rating.create({ cellphoneId: 6, title: "Tamaño enorme",       comment: "El tamaño es muy grande y se resbala aveces",   score: 3, userId: 6 })
    await Rating.create({ cellphoneId: 6, title: "Tamaño enorme",       comment: "El tamaño es muy grande y se resbala aveces",   score: 3, userId: 6 })
    
    // const allRatings = await Rating.findAll()
    
    console.log("Se crearon las puntuaciones de los celulares correctamente");
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

const sendEmailBuy = async (req, res) => {
  const { email, name, total } = req.body;
  try {
    res.json(await BuyCart(email, name, total));
  } catch (error) {
    res.json(error);
  }
};

const createdCartInDb = async (req, res) => {
  //aux es toda la informacion del usuario que compro el carrito
  //products array de objs de la compra que realizo
  const { products, aux } = req.body;
  console.log({ products, aux });
  try {
    //creo el carrito del usuario
    let cart = await Cart.create({
      userId: aux.id,
      status: "Por despachar",
    });

    //agrego cada producto al carrito creado anteriormente
    products.map(async (e) => {
      await DetailCart.create({
        cartId: cart.id,
        cantidad: e.cant,
        valor_unitario: e.price,
        cellphoneId: e.id,
      });
    });
    res.json({ products, aux });
  } catch (error) {
    res.json(error);
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
  recoveryPassword,
  setNewPasswordUser,
  sendEmailBuy,
  createdCartInDb,
};
