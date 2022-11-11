import React, { useState, useEffect } from 'react'

const FormUser = () => {
	const [user, setUser] = useState({ name: "", surname: "", email: "", password: "", retypepass: "", country: "", city: "", address: "", card_number: "", isAdmin: false })
	const [errors, setErrors] = useState({})
	const [allFields, setAllFields] = useState(false)

	const validateFields = (field) =>{
		const errors = {}
		if(field.password !== field.retypepass){
			errors.noMatchPass ="Las contraseñas no coinciden"
		}
		return errors
	}
	const [countries, setCountries] = useState([])
	const [cities, setCities] = useState([])
	useEffect(() => {
		const getAllContries = async () =>{
			const response = await (await fetch('https://countriesnow.space/api/v0.1/countries'))
			const data = await response.json();
			setCountries(await data.data)
		}
		getAllContries()

	}, [])
	

	const handleChanges = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
		setErrors(validateFields({ ...user, [e.target.name]: e.target.value }))
		if(e.target.name === "country"){
			let country = e.target.value
			const getCities = async () =>{
				const searchCountry = countries.find(c => c.country === country);
				setCities(searchCountry.cities);
			}
			getCities()
		}
	}

	const sendForm = (e) => {
		e.preventDefault()
		console.log('credential user', user);
	}

	return (
		<div className='flex justify-around  py-6'>
			<div className="w-8/12 bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className='font-bold text-2xl pb-8'>
					<h3>Registro usuario</h3>
				</div>
				<form onSubmit={sendForm}>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
							Nombres
						</label>
						<input
							type="text"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Ingresa tus nombres "
							name='name'
							value={user.name}
							onChange={handleChanges}
							required
							autoFocus
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
							Apellidos
						</label>
						<input
							type="text"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Ingresa tus apellidos"
							name='surname'
							value={user.surname}
							onChange={handleChanges}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
							Correo electronico
						</label>
						<input
							type="email"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Ingresa tu correo"
							name='email'
							value={user.email}
							onChange={handleChanges}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
							Contraseña
						</label>
						<input
							type="password"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Asignar contraseña"
							name='password'
							value={user.password}
							onChange={handleChanges}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
							Repite tu contraseña
						</label>
						<input
							type="password"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Repetir contraseña"
							name='retypepass'
							value={user.retypepass}
							onChange={handleChanges}
							required
						/>
						{ errors.noMatchPass && <p className='text-red-600'>{errors.noMatchPass}</p>}
					</div>
					<button 
						className="block rounded-2xl px-6 py-2 bg-green-400 hover:bg-green-500 text-gray-700 hover:text-white text-sm font-bold mb-2"
						onClick={()=> setAllFields( value => !value)}>{!allFields ? "Mostrar todo 🔽" : "Ocultar campos no requerios 🔼"}</button>
					<div className={!allFields ? "hidden" : ""}>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
								Pais
							</label>
							<select
								className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								name="country"
								value={user.country}
								onChange={handleChanges}>
								<option defaultValue hidden>Selecciona una opcion... </option>
								{ countries?.map((country, index)=>{
									return(<option key={index} value={country.country}>{country.country}</option>)
								})}
							</select>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
								Ciudad
							</label>
							<select
								className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								name="city"
								value={user.city}
								onChange={handleChanges}>
								<option defaultValue hidden>Selecciona una opcion... </option>
								{ cities?.map((city, index)=>{
									return( <option key={index} value={city}>{city}</option>)
								})}
							</select>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
								Ingresa tu numero de tarjeta <small> <i> (No requerimos mas datos)</i></small>
							</label>
							<input
								type="text"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
								className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
							Crear producto
						</button>
						<button type='button'
							className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							onClick={() => setUser({name: "Scarlet", surname: "Jhohanson", email: "scarlet@henry.com", password: "12345", retypepass: "12345", country: "Colombia", city: "Cali", address: "", card_number: "", isAdmin: false})}
						>
							Cargar datos de pueba
						</button>
						<button type='reset' className="bg-yellow-400 hover:bg-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
							Limpiar campos
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FormUser