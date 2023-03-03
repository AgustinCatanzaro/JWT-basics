const jwt = require('jsonwebtoken')

const { BadRequest } = require('../errors')

const login = async (req, res) => {
	const { username, password } = req.body
	// si usamos DB, usamos mongoo para validar al usuario mongoose validation
	// o usar Joi
	// Por ahora solo nos fijamos si ingresaron info en la request. Lo hacemos en el mismo controller

	if (!username || !password) {
		throw new BadRequest('Please provide email and password')
	}

	//A forma de Demo, esto deberia ser la ID generada por la DB
	const id = new Date().getDate()

	//Esta es la payload, en lo posible que envie poca informacion ya que ralentiza los procesos.
	const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	})
	// no mandar password por aca, pero podemos mandar cualquier tipo de info. Sirve para instanciar cada info/elemento en cada usuario.
	// en el token se deberia usar el ID, Creado en la DB... En este proyecto de prueba no se usa ya que no nos conectamos a una DB

	res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
	const luckyNumber = Math.floor(Math.random() * 100)
	res.status(200).json({
		msg: `Hello, ${req.user.username}`, //Esta agarrando esta info del middleware Auth donde se destructura el token.
		secret: `your data is ${luckyNumber}`,
	})
}

module.exports = {
	login,
	dashboard,
}
