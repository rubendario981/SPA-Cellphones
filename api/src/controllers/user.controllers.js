const { Users } = require('../db.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SECRET_KEY = "PF-Henry"; //cambiar a una variable de entorno

const registerUser = async (req, res) => {
	const { email } = req.body
	try {
		const findUser = await Users.findOne({ where: { email } })
		if (findUser) return res.status(400).json('Usuario ya existe')

		const newUser = await Users.create(req.body)

		const token = jwt.sign({ id: newUser.id }, SECRET_KEY, {
			expiresIn: 7200 // 2 horas
		})

		res.json({ token })

	} catch (error) {
		res.status(500).json(error)
	}
}

const updateUser = async (req, res) => {
	try {
		const updateUser = await Users.update(
			{ ...req.body }, { where: { id: req.params.id } }
		)

		return res.json(updateUser)
	} catch (error) {
		res.status(500).json(error)
	}
}

const login = async (req, res) => {
	const { email, password } = req.body
	try {
		const findUser = await Users.findOne({ where: { email }})
		
		const validatePassword = await bcrypt.compareSync(password, findUser.password)

		if(validatePassword){
			const token = jwt.sign({ id: findUser.id }, SECRET_KEY, {
				expiresIn: 7200 // 2 horas
			})
			return res.json({ token })
		} else {
			return res.status(400).json('Contraseña incorrecta')
		}

	} catch (error) {
		res.status(500).json(error)
	}
}

module.exports = {
	registerUser,
	updateUser,
	login
}