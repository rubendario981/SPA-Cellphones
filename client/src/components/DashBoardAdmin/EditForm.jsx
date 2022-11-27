import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { editCellphone } from '../../redux/actions';
import Swal from "sweetalert2"

const EditForm = () => {
  const initialState = { files: '', name: '', cpu: '', ram: '', screen: '', price: '', front_camera: '', rear_camera: '', internal_storage: '', battery: '', oId: '', brandId: '', precio: '', stock: '' }

  const [input, setInput] = useState(initialState)
  const [images, setImages] = useState({ files: [] })
  const [errors, setErrors] = useState({})
  const formProduct = useRef(null)
  const brands = useSelector(state => state.brands)
  const os = useSelector(state => state.os)
  const products = useSelector(state => state.allProducts)

  useEffect(() => {

  }, [images])


  const dispatch = useDispatch()

  const navigate = useNavigate()

  const validateFields = (field) => {
    const errors = {}
    if (field.name.length === 0) {
      errors.name = "Este campo es requerido"
    }
    if (field.name) {
      if (products.find(data => data.name.toLowerCase() === field.name.toLowerCase())) {
        errors.name = "Este celular ya existe"
      }
    }
    if (!field.brandId) {
      errors.brandId = "Elija una opcion"
    }
    if (!field.oId) {
      errors.oId = "Elija una opcion"
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

  const updateCell = async (e) => {
    e.preventDefault()
    const form = formProduct.current;
    const data = new FormData(form);
    data.append("id", input.id)
    const response = await dispatch(editCellphone(data))
    if (response.payload) {
      Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        text: `Se ha creado el producto ${input.name} correctamente`
      })
      setInput({ name: '' })
    } else {
      console.log("Error al crear el producto", response)
      Swal.fire({
        icon: "error",
        title: "No se pudo actualizar el producto",
        text: "Error general " + response
      })
    }
  }

  const [cellphone, setCellphone] = useState({ name: '' })

  const changeCell = (e) => {
    const findCell = products.find(data => data.id === parseInt(e.target.value))
    for (const key in findCell) {
      if (Object.hasOwnProperty.call(findCell, key)) {
        const element = findCell[key];
        if (!element) findCell[key] = ""
      }
    }
    setInput(findCell)
  }

  return (
    <div className='flex justify-center py-6'>
      <div className="w-full mx-6 border-2 border-blue-300 shadow-md shadow-blue-300 rounded px-8 pt-6 pb-8 mb-4">
        <div className='font-bold text-2xl pb-4'>
          <h3>Edicion de producto</h3>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
            Selecciona el celular a editar
          </label>
          <select
            className="shadow border border-gray-500 rounded w-full py-2 px-3  bg-white text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            onChange={changeCell}
            name="name"
            value={cellphone.name}
          >
            <option defaultValue value={''} hidden>Selecciona una opcion </option>
            {products.map((cell, index) => {
              return (<option key={index} value={cell.id}>{cell.name}</option>)
            })}
          </select>
        </div>
        
        <hr />

        {input.name.length > 0 &&
          <form onSubmit={updateCell} ref={formProduct}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
                Nombre celular
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow border border-gray-500 rounded w-full py-2 px-3 bg-white text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow border border-gray-500 rounded w-full py-2 px-3  bg-white text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Precio
              </label>
              <input
                type="text"
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                Actualizar producto
              </button>

              <button type='reset'
                className="bg-yellow-400 hover:bg-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  setInput({ name : ''})
                  setErrors({})
                }} >
                  Cancelar
              </button>
            </div>
          </form>
        }
      </div>
    </div>
  )
}

export default EditForm;