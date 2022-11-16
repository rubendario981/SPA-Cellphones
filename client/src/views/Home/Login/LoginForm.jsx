import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios"

const LoginForm = () => {
  const datosDePrueba = { email: "correo@mail.com", password: "12345" }
  const initialState = { email: "", password: "" }

  const [input, setInput] = useState(initialState)
  const navigate = useNavigate()

  const handleChanges = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })

  }

  const sendForm = async (e) => {
    e.preventDefault()
    try {
      const login = await axios.post('http://localhost:3001/user/login', input)
      login.status === 200 &&
        localStorage.setItem('token', login.data.token)
        alert("Bienvenio a nuestra pagina")
        navigate('/perfil')
      
    } catch (error) {
      alert("Algo ha salido mal, intenta de nuevo" + error)
    }
  }
  return (
    <div className='flex justify-center py-6 mb-40'>
      <div className="w-8/12 border-blue-300 shadow-md shadow-blue-300 rounded px-8 pt-6 pb-8 mb-4">
        <div className='font-bold text-2xl pb-8'>
          <h3>Inicio de sesion</h3>
        </div>
        <form onSubmit={sendForm}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
              Correo electronico
            </label>
            <input
              type="email"
              className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingresa tu correo electronico"
              name='email'
              value={input.email}
              onChange={handleChanges}
              required
            />
          </div><div className="mb-10">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
              Contraseña
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingresa tu contraseña"
              name='password'
              value={input.password}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="flex items-center justify-around">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Iniciar sesion
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

export default LoginForm