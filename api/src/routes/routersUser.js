const { Router } = require("express");
const {
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
	getAllUsers,
	manageUsers,
	nameUser,
} = require("../controllers/user.controllers");
const router = Router();

router.post("/create", async (req, res) => {
  try {
    res.json(await createUser(req.body));
  } catch (error) {
    res.json(error);
  }
});

router.post("/register", registerUser);

router.patch("/update/:id", updateUser);

router.post("/login", login);

router.post("/registerBuy", registerBuy);

router.get("/getProfile", userInfo);

router.get("/activateAccount", activateAccount);

router.post("/sendEmail", sendEmailBuy);

router.post("/createdCartInDb", createdCartInDb);

router.post("/recoveryPassword", recoveryPassword);

router.post("/newPassword", setNewPasswordUser);

router.get("/all-users", getAllUsers);

router.post("/manage-users", manageUsers);

router.get("/name-user", nameUser)

module.exports = router;
