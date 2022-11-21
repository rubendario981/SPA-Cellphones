const jwt = require('jsonwebtoken');
const SECRET_KEY = 'PF-Henry'; //cambiar a una variable de entorno

const setToken = (id, status) => {
	const token = jwt.sign(
		{ id, status },
		SECRET_KEY,
		{
			expiresIn: 7200, // 2 horas
		}
	);
	return token
}

module.exports = { setToken }