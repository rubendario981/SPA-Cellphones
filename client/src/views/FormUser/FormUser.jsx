import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/actions';

const FormUser = () => {
	const initialState = { name: "", email: "", password: "", retypepass: "", country: "", city: "", address: "", card_number: "", isAdmin: false }
	const [user, setUser] = useState(initialState)
	const [errors, setErrors] = useState({})
	const [allFields, setAllFields] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const validateFields = (field) => {
		const errors = {}
		if (!field.name || field.name.length < 3) {
			errors.name = "El nombre es requerido y debe ser mayor a 3 caracteres"
		}
		if (!field.email) {
			errors.email = "El campo de correo electronico es requerido"
		}
		if (!field.password.match(/[a-z]/g)) {
			errors.password = "El campo de contraseña debe contener una minuscula"
		}
		if (!field.password.match(/[A-Z]/g)) {
			errors.password = "El campo de contraseña debe contener una mayuscula"
		}
		if (!field.password.match(/[0-9]/g)) {
			errors.password = "El campo de contraseña debe contener al menos un numero"
		}
		if (field.password.length < 5) {
			errors.password = "El campo de contraseña debe contener al menos 5 caracteres"
		}
		if (field.password !== field.retypepass) {
			errors.noMatchPass = "Las contraseñas no coinciden"
		}
		return errors
	}
	const [countries, setCountries] = useState([])
	const [cities, setCities] = useState([])
	useEffect(() => {
		const getAllContries = async () => {
			const response = await (await fetch('https://countriesnow.space/api/v0.1/countries'))
			const data = await response.json();
			setCountries(await data.data)
		}
		getAllContries()

	}, [])


	const handleChanges = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
		setErrors(validateFields({ ...user, [e.target.name]: e.target.value }))
		if (e.target.name === "country") {
			let country = e.target.value
			const getCities = async () => {
				const searchCountry = countries.find(c => c.country === country);
				setCities(searchCountry.cities);
			}
			getCities()
		}
	}

	const sendForm = async (e) => {
		e.preventDefault()
		if (Object.entries(errors).length > 0) {
			alert("Algunos campos del formulario no cumplen con los requerimientos, por favor revisarlos e intente de nuevo")
		} else {
			try {
				const response = await dispatch(createUser(user))
				if (response.payload) {
					alert(`${user.name} te has registrado en nuestra pagina correctamente`)
					navigate('/')
				} else if (response.response.data) {
					alert(`Algo salio mal al registrarse ` + response.response.data)
				} else {
					alert("Error general en proceso" + response)
				}
			} catch (error) {
				alert("Error al crear usuario " + error)
			}
		}

	}

	return (
		<div className='flex justify-center py-6'>
			<div className="w-8/12 border-2 border-blue-300 shadow-md shadow-blue-300 rounded px-8 pt-6 pb-8 mb-4">
				<div className='font-bold text-2xl pb-8'>
					<h3>Registro usuario</h3>
				</div>
				<form onSubmit={sendForm}>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
							Nombres completos
						</label>
						<input
							type="text"
							className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Ingresa tus nombres "
							name='name'
							value={user.name}
							onChange={handleChanges}
							required
							autoFocus
						/>
						{errors.name && <p className='text-red-600'>{errors.name}</p>}
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
							Correo electronico
						</label>
						<input
							type="email"
							className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Ingresa tu correo"
							name='email'
							value={user.email}
							onChange={handleChanges}
							required
						/>
						{errors.email && <p className='text-red-600'>{errors.email}</p>}
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
							Contraseña <small><i>(Incluir por lo menos una minuscula, una mayuscula y un numero)</i></small>
						</label>
						<input
							type="password"
							className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Asignar contraseña"
							name='password'
							value={user.password}
							onChange={handleChanges}
							required
						/>
						{errors.password && <p className='text-red-600'>{errors.password}</p>}
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
							Repite tu contraseña
						</label>
						<input
							type="password"
							className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Repetir contraseña"
							name='retypepass'
							value={user.retypepass}
							onChange={handleChanges}
							required
						/>
						{errors.noMatchPass && <p className='text-red-600'>{errors.noMatchPass}</p>}
					</div>
					<button
						className="block rounded-2xl px-6 py-2 bg-green-400 hover:bg-green-500 text-gray-700 hover:text-white text-sm font-bold mb-2"
						onClick={() => setAllFields(value => !value)}>{!allFields ? "Mostrar todo 🔽" : "Ocultar campos no requerios 🔼"}</button>
					<div className={!allFields ? "hidden" : ""}>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
								Pais
							</label>
							<select
								className="shadow border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								name="country"
								value={user.country}
								onChange={handleChanges}>
								<option defaultValue hidden>Selecciona una opcion... </option>
								{countries?.map((country, index) => {
									return (<option key={index} value={country.country}>{country.country}</option>)
								})}
							</select>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
								Ciudad
							</label>
							<select
								className="shadow border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								name="city"
								value={user.city}
								onChange={handleChanges}>
								<option defaultValue hidden>Selecciona una opcion... </option>
								{cities?.map((city, index) => {
									return (<option key={index} value={city}>{city}</option>)
								})}
							</select>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
								Ingresa tu numero de tarjeta <small> <i> (No requerimos mas datos)</i></small>
							</label>
							<input
								type="text"
								className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="0000 - 0000 - 0000 - 0000 - 0000"
								name='card_number'
								value={user.card_number}
								onChange={handleChanges}
							/>
						</div>
						<div className={"mb-4" + !user.isAdmin && "hidden"}>
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
								Rol <small> <i> (Solo disponible para administradores)</i></small>
							</label>
							<select
								className="shadow border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								name="isAdmin"
								value={user.isAdmin}
								onChange={handleChanges}>
								<option defaultValue={false} hidden>Selecciona una opcion... </option>
								<option value={false}>Cliente</option>
								<option value={true}>Administrador</option>
							</select>
						</div>
					</div>
					<div className="flex items-center justify-around mt-6">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
							Registrarse
						</button>
						<button type='button'
							className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							onClick={() => setUser({ name: "Scarlet Jhohanson", email: "scarlet@henry.com", password: "Hola5", retypepass: "Hola5", country: "Colombia", city: "Cali", address: "", card_number: "", isAdmin: false })}
						>
							Cargar datos de pueba
						</button>
						<button type='button'
							className="bg-yellow-400 hover:bg-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							onClick={() => {
								setUser(initialState)
								setErrors({})
							}}
						>
							Limpiar campos
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FormUser