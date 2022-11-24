import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2"
import { updateUser } from '../../redux/actions';

const UpdateUser = () => {
  const user = useSelector(state => state.user)
  const initialState = { name: '', email: '', country: '', city: '', address: '' }
  const [input, setInput] = useState(initialState)
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  const validateFields = (field) => {
    const errors = {}
    if (!field.name || field.name.length < 3) {
      errors.name = "El nombre es requerido y debe ser mayor a 3 caracteres"
    }
    return errors
  }
  useEffect(() => {
    const getAllContries = async () => {
      const response = await (await fetch('https://countriesnow.space/api/v0.1/countries'))
      const data = await response.json();
      setCountries(await data.data)
    }
    getAllContries()
    if (user && Object.keys(user).length > 0) {
      for (const key in user) {
        if (Object.hasOwnProperty.call(user, key)) {
          const element = user[key];
          if (!element) user[key] = ""
        }
      }
      setInput(user)
    }
  }, [user])

  const handleChanges = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
    setErrors(validateFields({ ...input, [e.target.name]: e.target.value }))
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
    e.preventDefault(e)
    if (Object.entries(errors).length > 0) {
      alert("Algunos campos del formulario no cumplen con los requerimientos, por favor revisarlos e intente de nuevo")
    } else {
      try {
        const response = await dispatch(updateUser(input))
        if (response.payload) {
          Swal.fire({
            icon: "success",
            title: "Bien hecho",
            text: `${user.name} has actualizado tu perfil correctamente!!!`
          })
        } else if (response.response.data) {
          Swal.fire({
            icon: "warning",
            title: "Error en el proceso",
            text: "Algo salio mal al actulizar el perfil" + response.response.data
          })
        } else {
          Swal.fire({
            icon: "error",
            text: "Error general en proceso" + response
          })
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "Error al actualizar usuario" + error
        })
      }
    }
  }

  return (
    <div>
      <div className='font-bold text-2xl pb-4'>
        <h3>Actualizacion de datos</h3>
      </div>
      <form onSubmit={sendForm}>
        <div className="grid gap-6 mb-6 mr-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Nombres y apellidos
            </label>
            <input type="text" name='name' value={input.name} onChange={handleChanges}
              className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.name && <p className='text-red-600 text-sm ml-2'>{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Correo electronico <small><i>(Edicion no disponible)</i></small>
            </label>
            <input type="text" id="email" name='email' value={input.email} onChange={handleChanges}
              className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
              Pais
            </label>
            <select id='country' name="country" value={input?.country === null ? "" : input.country} onChange={handleChanges}
              className="shadow bg-white border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:ring-blue-500 focus:border-blue-500"
            >
              <option defaultValue hidden>Selecciona una opcion... </option>
              {countries?.map((country, index) => {
                return (<option key={index} value={country.country}>{country.country}</option>)
              })}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
              Ciudad
            </label>
            <select id='city' name="city" value={!input?.city ? "" : input.city} onChange={handleChanges}
              className="shadow bg-white border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:ring-blue-500 focus:border-blue-500"
            >
              <option defaultValue hidden>Selecciona una opcion... </option>
              {cities?.map((city, index) => {
                return (<option key={index} value={city}>{city}</option>)
              })}
            </select>
          </div>

          <div>
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
              Direccion
            </label>
            <input type="text" id="address" name='address' onChange={handleChanges} value={input.address}
              className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-around mt-6">
            <button type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Actualizar
            </button>

            <button type='button'
              className="bg-yellow-400 hover:bg-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                setInput(user)
                setErrors({})
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>

    </div>
  )
}

export default UpdateUser