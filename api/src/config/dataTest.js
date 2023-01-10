const { Users, Cart, Cellphone, DetailCart, Rating } = require("../db.js");

const createUsers = async () => {
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

		console.log("Se crearon usuarios de prueba correctamente");
	} catch (error) {
		console.log("Error al crear usuarios de prueba", error);
	}
};

const createCarts = async () => {
	const crearCarritos = [
		{ userId: 1, status: "Por despachar" },
		{ userId: 1, status: "Entregado" },
		{ userId: 2, status: "Por despachar" },
		{ userId: 3, status: "Despachado" },
		{ userId: 4, status: "Entregado" },
		{ userId: 5, status: "Por despachar" },
	];

	try {
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
		await DetailCart.create({
			cartId: 6,
			cantidad: 3,
			valor_unitario: (
				await Cellphone.findByPk(10, { attributes: ["price"] })
			).price,
			cellphoneId: 10,
		});
		await DetailCart.create({
			cartId: 6,
			cantidad: 2,
			valor_unitario: (
				await Cellphone.findByPk(8, { attributes: ["price"] })
			).price,
			cellphoneId: 8,
		});
		await DetailCart.create({
			cartId: 6,
			cantidad: 1,
			valor_unitario: (
				await Cellphone.findByPk(3, { attributes: ["price"] })
			).price,
			cellphoneId: 3,
		});

		console.log("Se crearon los carritos con sus detalles correctamente");
	} catch (error) {
		console.log("Error al tratar de crear carritos de compra y sus detalles", error);
	}
}

const createRatings = async () =>{
	try {
		await Rating.create({ cellphoneId: 1, title: "Muy buen producto", comment: "Un muy buen celular a muy buen precio", score: 4, userId: 1 })
		await Rating.create({ cellphoneId: 1, title: "Buen servicio", comment: "La atencion fue genial", score: 5, userId: 3 })
		await Rating.create({ cellphoneId: 2, title: "No rinde la bateria", comment: "Tengo que cargar el celular cada dos horas", score: 2, userId: 1 })
		await Rating.create({ cellphoneId: 2, title: "Va lento al jugar", comment: "No puedo jugar mi juego favorito, lo demas ok", score: 3, userId: 2 })
		await Rating.create({ cellphoneId: 2, title: "Memoria muy chica", comment: "No me alcanza su memoria interna para fotos", score: 3, userId: 3 })
		await Rating.create({ cellphoneId: 3, title: "Es lo maximo ", comment: "El mejor celular que he tenido en la vida ", score: 5, userId: 4 })
		await Rating.create({ cellphoneId: 3, title: "Va muy bien", comment: "Funcionamiento excelente para juegos", score: 4, userId: 5 })
		await Rating.create({ cellphoneId: 4, title: "Increible calidad", comment: "La mejor compra en relacion calidad precio", score: 4, userId: 1 })
		await Rating.create({ cellphoneId: 4, title: "Justo lo que espere", comment: "Un amigo lo tiene y funciona muy bien", score: 4, userId: 2 })
		await Rating.create({ cellphoneId: 5, title: "Muy buen diseño ", comment: "Tiene un diseño que me enamoro", score: 5, userId: 6 })
		await Rating.create({ cellphoneId: 5, title: "Camaras destacables", comment: "El set de camaras es espectacular", score: 4, userId: 3 })
		await Rating.create({ cellphoneId: 6, title: "Buena resolucion", comment: "Las fotos se ven geniales en todo ambiente", score: 4, userId: 2 })
		await Rating.create({ cellphoneId: 6, title: "Pantalla intermite ", comment: "En ocasiones la pantalla enciende apaga", score: 3, userId: 5 })
		await Rating.create({ cellphoneId: 6, title: "Tamaño enorme", comment: "El tamaño es muy grande y se resbala aveces", score: 3, userId: 6 })

		console.log("Se crearon las puntuaciones de los celulares correctamente");
	} catch (error) {
		console.log("Error al crear el rating de los celulares", error);		
	}
}

module.exports = { createUsers, createCarts, createRatings }