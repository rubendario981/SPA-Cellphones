const { Router } = require('express');
const {
  registerUser,
  updateUser,
  login,
  userInfo,
  registerBuy,
} = require('../controllers/user.controllers');
const router = Router();

router.post('/create', async (req, res) => {
  try {
    res.json(await createUser(req.body));
  } catch (error) {
    res.json(error);
  }
});

router.post('/register', registerUser);

router.patch('/update/:id', updateUser);

router.post('/login', login);

router.post('/registerBuy', registerBuy);

router.get('/getProfile', userInfo);

module.exports = router;
