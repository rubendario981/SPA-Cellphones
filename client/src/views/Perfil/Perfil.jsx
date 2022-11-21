import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../redux/actions';

const Perfil = () => {
	const [usuario, setUsuario] = useState({})
	const [carritos, setCarritos] = useState([])
	const token = localStorage.getItem('token')
	const dispatch = useDispatch()
	let user = {}

	if (token) {
		// decodifico el token y lo guardo en un objeto
		user = JSON.parse(window.atob(token?.split('.')[1]))
	} else localStorage.removeItem('token')

	useEffect(() => {
		async function perfilUser() {
			const perfil = await dispatch(getProfile(user.id))
			setUsuario(perfil.payload.data.findUser)
			setCarritos(perfil.payload.data.findCarts)
		}
		perfilUser()
	}, [])

	return (
		<div className='mt-45 pt-15'>
			{!usuario?.name
				? <p>No estas logeado en la pagina !!!</p>
				: user.status === "Inactivo"
				? <p>Debes activar tu cuenta</p>
				: <div className='mb-14'>
					<h3>Estas son tus credenciales de usuario</h3>
					<p>{usuario?.name} </p>
					<p>{usuario?.email}</p>
					<p>{usuario?.country}</p>
					<p>{usuario?.address}</p>
				</div>
			}

			<hr />

			{carritos?.length === 0
				? <p>No hay productos en tu carrito</p>
				: carritos?.map(e => {
					return (
						<div className='flex flex-wrap justify-around border border-blue-400 m-6 p-6 bg-blue-200' key={e.id}>
							<h2 className='block w-screen'>Carrito No {e.id}</h2>
							<h3 className='block w-screen'>Estado de compra: {e.status}</h3>
							{e.cellphones.map((cell, index) => {
								return (
									<div className='' key={index}>
										<div className='p-6 w-96 mb-6 border border-gray-200 rounded-lg shadow-md  dark:border-gray-700 '>
											<h3>Nombre: {cell?.name}</h3>
											<img src={cell?.image} width="100px" alt={cell?.name} />
											<h5>Precio de venta: $ {cell?.detailCart.valor_unitario}</h5>
											<h5>Unidades vendidas: {cell?.detailCart.cantidad}</h5>
											<h5>Subtotal: $ {cell?.detailCart.cantidad * cell?.detailCart.valor_unitario}</h5>
											<h5>Bateria :{cell?.battery}</h5>
										</div>
									</div>
								)
							})}
						</div>
					)
				})
			}
		</div>
	)
}

export default Perfil