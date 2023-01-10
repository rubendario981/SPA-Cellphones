const { Users, Cart, Cellphone, DetailCart } = require("../db.js");
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

const getAllUsers = async (req, res) =>{
	try {
		const allUsers = await Users.findAll()
		return res.json(allUsers)
	} catch (error) {
		console.log("Error controller user on get all users", error);
		return res.status(500).json(error)
	}
}

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

const nameUser = async(req, res) => {
	console.log(req.query.id);
	try {
		const user = await Users.findByPk(req.query.id)
		return user
			? res.json(user)
			: res.status(404).json("Usuario no identificado")
	} catch (error) {
		console.log("Error on get name user ", error);
		return res.status(500).json(error)		
	}
}

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

const manageUsers = async (req, res) =>{
	const { email } = req.body;
	try {
		const response = await Users.update(
			{ ...req.body },
			{ where: { email }}
		)
		return response[0] > 0
			? res.json(await Users.findOne({ where: { email }}))
			: res.status(404).json(`No se pudo actualizar usuario con email ${email}`)
	} catch (error) {
		console.log("Error on controller users on manage user ", error);
		return res.status(500).json(error)
	}
}

module.exports = {
  registerUser,
  updateUser,
  login,
  userInfo,
  registerBuy,
  activateAccount,
  recoveryPassword,
  setNewPasswordUser,
  sendEmailBuy,
  createdCartInDb,
	getAllUsers,
	manageUsers,
	nameUser,
};
