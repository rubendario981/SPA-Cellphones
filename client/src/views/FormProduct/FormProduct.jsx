import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { createCellPhone } from '../../redux/actions';

const FormProduct = () => {
  const datosDePrueba = { name: 'Samsung s20', image: 'https://www.centropolismedellin.com/wp-content/uploads/2021/11/Hombre-cargando-celular.jpg', cpu: 'Snapdragon 800', ram: '4', screen: '5.5', price: '700', front_camera: '20 mp', rear_camera: '200', internal_storage: '512', battery: "2355", precio: "1500", oId: 1, brandId: 3, stock: 15 }

  const initialState = { name: '', image: '', cpu: '', ram: '', screen: '', price: '', front_camera: '', rear_camera: '', internal_storage: '', battery: '', oId: '', brandId: '', precio: '', stock: '' }

  const [input, setInput] = useState(initialState)
  const [errors, setErrors] = useState({})
  const brands = useSelector(state => state.brands)
  const os = useSelector(state => state.os)
  const products = useSelector(state => state.allProducts)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const validateFields = (field) => {
    const errors = {}
    if (field.name.length === 0) {
      errors.name = "Este campo es requerido"
    }
    if (field.name) {
      if (products.find(data => data.name.toLowerCase() === field.name.toLowerCase())) {
        // setErrors({...errors, name: "Este celular ya existe"})
        errors.name = "Este celular ya existe"
      }
    }
    if (!field.brandId) {
      errors.brandId = "Elija una opcion"
    }
    if (!field.oId) {
      errors.oId = "Elija una opcion"
    }
    if (!field.image) {
      errors.image = "Ingrese una imagen en formato URL"
    }
    if (!field.price) {
      errors.price = "Establecer un precio para el producto"
    }
    if (!field.cpu) {
      errors.cpu = "Este campo es requerido"
    }
    if (!field.ram) {
      errors.ram = "Este campo es requerido"
    }
    if (!field.screen) {
      errors.screen = "Este campo es requerido"
    }
    if (!field.front_camera) {
      errors.front_camera = "Este campo es requerido"
    }
    if (!field.rear_camera) {
      errors.rear_camera = "Este campo es requerido"
    }
    if (!field.battery) {
      errors.battery = "Este campo es requerido"
    }
    if (!field.internal_storage) {
      errors.internal_storage = "Este campo es requerido"
    }
    if (!field.stock) {
      errors.stock = "Este campo es requerido"
    }
    return errors
  }

  // El campo de precio solo acepta numeros --- falta evaluar si manejamos mas campos asi
  const justNumbers = (e) => {
    ((e.key === 'Backspace') || (e.key === 'Tab') || (e.key.includes('Arrow')) || (!/[0-9]/.test(e.key))) && (e.preventDefault())
  }

  const handleChanges = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })

    setErrors(validateFields({ ...input, [e.target.name]: e.target.value }))

  }

  const sendForm = async (e) => {
    e.preventDefault()
    const response = await dispatch(createCellPhone(input))
    if (response.payload[1]) {
      alert(`Se ha creado el producto ${input.name} correctamente`)
      navigate(`/product/${response.payload[0].id}`)      
    } else {
      alert("Error al crear el producto")
    }
  }

  return (
    <div className='flex justify-center py-6'>
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
              autoFocus
            />
            {errors.name && <span className='text-red-500'>{errors.name}</span>}
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
              required
            >
              <option defaultValue value={''} hidden>Selecciona una opcion </option>
              {brands.map((brand, index) => {
                return (<option key={index} value={brand.id} >{brand.name}</option>)
              })}
            </select>
            {errors.brandId && <span className='text-red-500'>{errors.brandId}</span>}
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
              required
            >
              <option defaultValue value={''} hidden>Selecciona una opcion </option>
              {os.map((os, index) => {
                return (<option key={index} value={os.id}>{os.name}</option>)
              })}
            </select>
            {errors.oId && <span className='text-red-500'>{errors.oId}</span>}
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
            {errors.image && <span className='text-red-500'>{errors.image}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Precio
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingresa precio producto"
              name='price'
              value={input.price}
              onChange={handleChanges}
              onKeyPress={justNumbers}
              required
            />
            {errors.price && <span className='text-red-500'>{errors.price}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpu">
              CPU
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
            {errors.cpu && <span className='text-red-500'>{errors.cpu}</span>}
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
            {errors.ram && <span className='text-red-500'>{errors.ram}</span>}
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
            {errors.screen && <span className='text-red-500'>{errors.screen}</span>}
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
            {errors.front_camera && <span className='text-red-500'>{errors.front_camera}</span>}
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
            {errors.rear_camera && <span className='text-red-500'>{errors.rear_camera}</span>}
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
            {errors.battery && <span className='text-red-500'>{errors.battery}</span>}
          </div>
          <div className="mb-4">
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
            {errors.internal_storage && <span className='text-red-500'>{errors.internal_storage}</span>}
          </div>
          <div className="mb-10">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="internal_storage">
              Stock
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Unidades de inventario"
              name='stock'
              value={input.stock}
              onChange={handleChanges}
              onKeyPress={justNumbers}
              required
            />
            {errors.stock && <span className='text-red-500'>{errors.stock}</span>}
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
              onClick={() =>{
                setInput(initialState)
                setErrors({})
              }} >
              Limpiar campos
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormProduct