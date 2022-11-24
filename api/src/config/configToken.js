const jwt = require('jsonwebtoken');
const SECRET_KEY = 'PF-Henry'; //cambiar a una variable de entorno

const setToken = (id, status, timer) => {
	const token = jwt.sign(
		{ id, status },
		SECRET_KEY,
		{
			expiresIn: !timer ? 7200 : timer, // 7200 equivale a 2 horas
		}
	);
	return token
}

const verifyToken = (token)=>{
	try {
		const validate = jwt.verify(token, SECRET_KEY)
		return validate		
	} catch (error) {
		return false
	}
}

module.exports = { setToken, verifyToken }