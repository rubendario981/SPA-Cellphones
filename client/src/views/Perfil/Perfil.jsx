import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../redux/actions';

const Perfil = () => {
	const [usuario, setUsuario] = useState({})
	const token = localStorage.getItem('token')
	const dispatch = useDispatch()
	let user = {}

	if (!token) {
		localStorage.setItem('token', '')
	} else {
		// decodifico el token y lo guardo en un objeto
		user = JSON.parse(window.atob(token?.split('.')[1]))
	}
	useEffect(() => {
		async function perfilUser() {
			const porfil = await dispatch(getProfile(user.id))
			setUsuario(porfil.payload.data)
		}
		perfilUser()
	}, [])

	return (
		<div className='mt-15 pt-15'>
			{!usuario.name
				? <p>No estas logeado en la pagina !!!</p>
			: <div>
					<h3>Estas son tus credenciales de usuario</h3>
					<p>{usuario.name} </p>
					<p>{usuario.email}</p>
					<p>{usuario.country}</p>
					<p>{usuario.address}</p>
				</div>
			}

		</div>
	)
}

export default Perfil