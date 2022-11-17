import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
// Importar modulos de firebase
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNjHi1N4LrNuWdlOvAeuqoMfugx8daZyA",
  authDomain: "pf-henry-ae594.firebaseapp.com",
  projectId: "pf-henry-ae594",
  storageBucket: "pf-henry-ae594.appspot.com",
  messagingSenderId: "316355123917",
  appId: "1:316355123917:web:91b6aedd38591aa321e784",
  measurementId: "G-SH5V7XV0CP"
};

const LoginForm = () => {
  const datosDePrueba = { email: "correo@mail.com", password: "12345" }
  const initialState = { email: "", password: "" }

  const [input, setInput] = useState(initialState)
  const navigate = useNavigate()

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider();

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

  const siginGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider)
      const token = await user.user.accessToken
      localStorage.setItem('token', token)
      alert("Inicio sesion correcto!! ")
      navigate('/perfil')
    } catch (error) {
      error.code
        ? alert('Error en proceso de autenticacion ', error.code)
        : error.message
          ? alert("Autenticacion fallida ", error.message)
          : error.customData.email
            ? alert("Error con el email ", error.customData.email)
            : alert("Error general", error)
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
          <div className='flex flex-col items-center mt-5'>
            <span>
              Aun no estas registrado?
              <Link className='py-1 px-3 rounded-md ml-3 text-blue-600 hover:text-white hover:bg-blue-600' to={'/register'}> Registrate aqui </Link>
            </span>

            <button type="button"
              className="mt-6 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
              onClick={siginGoogle}
            >
              <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
              Iniciar sesion con Google
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm