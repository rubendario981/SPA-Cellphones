import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllUsers, manageUsers } from '../../redux/actions';

const ManageUsers = () => {
	const allUsers = useSelector(state => state.allUsers)
	const profile = useSelector(state => state.user)
	const dispatch = useDispatch()

	const [user, setUser] = useState({ id: "", name: "", email: "", status: "", show: false })
	const getUser = { id: "" }

	useEffect(() => {
		dispatch(getAllUsers())
	}, [dispatch])

	const handleUser = (e) => {
		if (e.target.name === "id") {
			const findUser = allUsers.find(user => user.id === parseInt(e.target.value))
			for (const key in findUser) {
				if (Object.hasOwnProperty.call(findUser, key)) {
					const element = findUser[key];
					if (!element) findUser[key] = ""
				}
			}
			findUser.show = true
			setUser(findUser)
		}
	}

	const handleChanges = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const updateUser = async(e) => {
		e.preventDefault();
		const response = profile.status !== "Master" && user.status === "Admin"
			? Swal.fire("Accion no permitida", "Solo los usuarios master pueden convertir usuarios normales a Administradores", "info")
			: (
				await dispatch(manageUsers(user))
			)
		console.log("REspuesta", response); // hay que cambiar y actualizar segun id usuario
		response.payload?.status === 200
				? Swal.fire("Usuario actualizado correctamente", "", "success")
				: Swal.fire("No se pudo actualizar usuario", `${response.data}`, "error")
	}

	return (
		<div className='flex justify-center py-6'>
			<div className="w-full mx-6 border-2 border-blue-300 shadow-md shadow-blue-300 rounded px-8 pt-6 pb-8 mb-4">
				<div className='font-bold text-2xl pb-4'>
					<h3>Administracion de usuarios</h3>
				</div>
				{!user.show &&
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
							Selecciona un usuario
						</label>
						<select
							className="shadow border border-gray-500 rounded w-full py-2 px-3  bg-white text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
							onChange={handleUser}
							name="id"
							value={getUser.id}
						>
							<option defaultValue value={''} hidden>Selecciona una opcion </option>
							{allUsers.map((user, index) => {
								return (<option key={index} value={user.id}>{user.name} - {user.email}</option>)
							})}
						</select>
					</div>
				}
				<hr />
				{user.show &&
					<form onSubmit={updateUser}>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
								Nombre usuario
							</label>
							<input
								type="text"
								className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="Nombre usuario"
								name='name'
								value={user.name}
								onChange={handleChanges}
								required
								autoFocus
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
								Correo electronico
							</label>
							<input
								type="email"
								className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="F. ex. email@mail.com"
								name='email'
								value={user.email}
								onChange={handleChanges}
								required
							/>
						</div>
						<div className='mb-4'>
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
								Cambiar de rol
							</label>
							<select
								className="shadow border border-gray-500 rounded w-full py-2 px-3  bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								name="status"
								value={user.status}
								onChange={handleChanges}
							>
								<option defaultValue value="" hidden>Selecciona una opcion</option>
								<option className='text-black' value="User">Usuario normal (cliente)</option>
								<option className='text-black' value="Inactivo">Desactivar</option>
								<option className='text-black' value="Suspendido">Suspender</option>
								<option className='text-black' value="Admin">Convertir administrador (solo master puede hacerlo)</option>
								<option className='text-black' value="Eliminado">Eliminar</option>
							</select>
						</div>
						<div className="flex items-center justify-around mt-8 mb-4">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
								Actualizar usuario
							</button>

							<button type='reset' onClick={() => setUser({ id: "", name: "", email: "", status: "", show: false })}
								className="bg-yellow-400 hover:bg-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
								Cancelar
							</button>
						</div>
					</form>
				}
			</div>

		</div>
	)
}

export default ManageUsers