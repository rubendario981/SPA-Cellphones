const { Users } = require('../db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Stripe = require('stripe');
const SECRET_KEY = 'PF-Henry'; //cambiar a una variable de entorno
const SECRET_KEY_STRIPE =
  'sk_test_51M5u48DvLT9vn19qTA8TOlOzuB26PmvGzIM0TQN5IJfC77HnAIMdmwfnWuQl9jRtQaapf1SKeMuQ4v1gaYOdvqjk00ak0cmM9Q'; //cambiar a una variable de entorno

const stripe = new Stripe(SECRET_KEY_STRIPE);

const registerUser = async (req, res) => {
  const { email } = req.body;
  try {
    const findUser = await Users.findOne({ where: { email } });
    if (findUser) return res.status(400).json('Usuario ya existe');

    const newUser = await Users.create(req.body);
    console.log('nuevo usuario', newUser);
    const token = jwt.sign(
      { id: newUser.id, status: newUser.status },
      SECRET_KEY,
      {
        expiresIn: 7200, // 2 horas
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json(error);
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
    console.log('usuario encontrado', findUser);

    const validatePassword = await bcrypt.compareSync(
      password,
      findUser.password
    );

    if (validatePassword) {
      const token = jwt.sign(
        { id: findUser.id, status: findUser.status },
        SECRET_KEY,
        {
          expiresIn: 7200, // 2 horas
        }
      );
      console.log(token, 'token');
      return res.json({ token });
    } else {
      return res.status(400).json('Contraseña incorrecta');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const userInfo = async (req, res) => {
  console.log(req.query.id);
  console.log('asd');
  try {
    const findUser = await Users.findByPk(req.query.id);
    return res.json(findUser ? findUser : 'No se encontro usuario');
  } catch (error) {
    return res.status(500).json(error);
  }
};

const usuariosPrueba = async (req, res) => {
  const usuarios = [
    {
      id: 1,
      name: 'Scarlet',
      surname: 'Johanson',
      email: 'scarlet@mail.com',
      password: '12345',
      status: 'Admin',
    },
    {
      id: 2,
      name: 'Gal',
      surname: 'Gadot',
      email: 'gal@mail.com',
      password: '12345',
      status: 'Admin',
    },
    {
      id: 3,
      name: 'Dua',
      surname: 'Lipa',
      email: 'dua@mail.com',
      password: '12345',
      status: 'User',
    },
    {
      id: 4,
      name: 'Martina',
      surname: 'Scomazon',
      email: 'martina@mail.com',
      password: '12345',
      status: 'User',
    },
  ];
  try {
    const findUsers = await Users.findAll();
    // console.log('primer find', findUsers.length);
    if (findUsers.length === 0) {
      const create = await Users.bulkCreate(usuarios);
      console.log('usuarios creados', create.length);
    } else {
      console.log('No hay necesidad de crear usuarios', findUsers[0]);
    }
  } catch (error) {
    console.log('Error al crear usuarios de prueba', error);
  }
};

const registerBuy = async (req, res) => {
  try {
    const { id, amount } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Cell World',
      payment_method: id,
      confirm: true,
    });

    console.log(payment);

    res.json({ message: 'succesFull payment' });
  } catch (error) {
    res.json({ message: error.raw.message });
  }
};

module.exports = {
  registerUser,
  updateUser,
  login,
  userInfo,
  usuariosPrueba,
  registerBuy,
};
