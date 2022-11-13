import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCellPhone } from '../../redux/actions';

const FormProduct = () => {
	const datosDePrueba = { name: 'Samsung s20', image: 'https://www.centropolismedellin.com/wp-content/uploads/2021/11/Hombre-cargando-celular.jpg', cpu: 'Snapdragon 800', ram: '4', screen: '5.5', price: '700', front_camera: '20 mp', rear_camera: '200', internal_storage: '512', battery: "2355", precio: "1500" }

	const initialState = { name: '', image: '', cpu: '', ram: '', screen: '', price: '', front_camera: '', rear_camera: '', internal_storage: '', battery: '', oId: '', brandId: '', precio: '' }

	const [input, setInput] = useState(initialState)
	const brands = useSelector(state => state.brands)
	const os = useSelector(state => state.os)

	const dispatch = useDispatch()

	const handleChanges = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value })
	}

	const sendForm = async (e) => {
		e.preventDefault()
		console.log('sending values', input.brandId, input.oId);
		await dispatch(createCellPhone(input))

	}

	return (
		<div className='flex justify-around  py-6'>
			<div className="w-8/12 bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className='font-bold text-2xl pb-8'>
					<h3>Creacion de producto</h3>
				</div>
				<form onSubmit={sendForm}>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
							Nombre celular
						</label>
						<input
							type="text"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Ingresa el nombre del celular"
							name='name'
							value={input.name}
							onChange={handleChanges}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
							Marca celular
						</label>
						<select
							className="shadow border rounded w-full py-2 px-3 bg-white text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
							onChange={handleChanges}
							name="brandId"
							value={input.brandId}
							>
							<option defaultValue hidden>Selecciona una opcion </option>
							{brands.map((brand, index) => {
								return (<option key={index} value={brand.id} >{brand.name}</option>)
							})}
						</select>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
							Seleccione sistema operativo
						</label>
						<select
							className="shadow border rounded w-full py-2 px-3  bg-white text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
							onChange={handleChanges}
							name="oId"
							value={input.oId}
							>
							<option defaultValue hidden>Selecciona una opcion </option>
							{os.map((os, index) => {
								return (<option key={index} value={os.id}>{os.name}</option>)
							})}
						</select>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
							image
						</label>
						<input
							type="text"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Ingresa imagen url"
							name='image'
							value={input.image}
							onChange={handleChanges}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
							Precio
						</label>
						<input
							type="text"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Ingresa imagen url"
							name='precio'
							value={input.precio}
							onChange={handleChanges}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpu">
							cpu (cambiar por select)
						</label>
						<input
							type="text"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Ingresa cpu celular"
							name='cpu'
							value={input.cpu}
							onChange={handleChanges}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ram">
							RAM
						</label>
						<input
							type="text"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Cantidad de RAM"
							name='ram'
							value={input.ram}
							onChange={handleChanges}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="screen">
							Tamaño de pantalla
						</label>
						<input
							type="text"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Ingresa tamaño pantalla"
							name='screen'
							value={input.screen}
							onChange={handleChanges}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
							Precio
						</label>
						<input
							type="text"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Precio del producto"
							name='price'
							value={input.price}
							onChange={handleChanges}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="front_camera">
							Camara frontal
						</label>
						<input
							type="text"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Resolucion camara delantera"
							name='front_camera'
							value={input.front_camera}
							onChange={handleChanges}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rear_camera">
							Camara trasera
						</label>
						<input
							type="text"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Resolucion camara trasera"
							name='rear_camera'
							value={input.rear_camera}
							onChange={handleChanges}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rear_camera">
							Capacidad bateria
						</label>
						<input
							type="text"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Ingresa capacidad bateria"
							name='battery'
							value={input.battery}
							onChange={handleChanges}
							required
						/>
					</div>
					<div className="mb-10">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="internal_storage">
							Almacenamiento interno
						</label>
						<input
							type="text"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Cantidad almacenamiento"
							name='internal_storage'
							value={input.internal_storage}
							onChange={handleChanges}
							required
						/>
					</div>
					<div className="flex items-center justify-around">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
							Crear producto
						</button>
						<button type="button"
							className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							onClick={() => setInput(datosDePrueba)} >
							Datos de prueba
						</button>
						<button type='reset'
							className="bg-yellow-400 hover:bg-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							onClick={() => setInput(initialState)} >
							Limpiar campos
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FormProduct