import axios from 'axios'
import React, {useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const URL = process.env.REACT_APP_URL || "http://localhost:3001" 

const RecoveryPassword = () => {
	const token = localStorage.getItem('tokenRestorePasswd')
	const initialState = { password: '', reTypePassword: '' }
	const [input, setInput] = useState(initialState)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validateFields = (field) => {
		const errors = {}		
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
		if (field.password !== field.reTypePassword) {
			errors.noMatchPass = "Las contraseñas no coinciden"
		}
		return errors
	}

	const handleChanges = (e) =>{
    setInput({ ...input, [e.target.name]: e.target.value })
		setErrors(validateFields({ ...input, [e.target.name]: e.target.value }))

	}
  
	const resetPasswd = async (e) =>{
    e.preventDefault()
    try {
      const setNewPasswd = await axios.post(`${URL}/user/newPassword`, { password: input.password, token})
      if(setNewPasswd.data){
        localStorage.removeItem('tokenRestorePasswd')
        Swal.fire({
          icon: 'success',
          title: 'Bien hecho',
          text: setNewPasswd.data
        })
      }
    } catch (error) {
      if(error.response.data){
        Swal.fire({
          icon: 'error',
          title: 'Oops... No se pudo reestablecer contraseña',
          text: error.response.data
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops... No se pudo reestablecer contraseña',
          text: "Error general al reset password"
        })
        console.log("Error general al reset password", error);
      }      
    }
	}
  
	return (
		<div className='flex justify-center py-6 mb-40'>
      <div className="w-8/12 border-blue-300 shadow-md shadow-blue-300 rounded px-8 pt-6 pb-8 mb-4">
        <div className='font-bold text-2xl pb-8'>
          <h3>Recuperacion de contraseña</h3>
        </div>
        <form onSubmit={resetPasswd}>
					<div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
              Asignar nueva contraseña
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingresa tu nueva contraseña"
              name='password'
              value={input.password}
              onChange={handleChanges}
              required
              autoFocus
            />
						{errors.password && <p className='text-red-600'>{errors.password}</p>}
          </div>
					<div className="mb-10">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
              Repite la nueva contraseña
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Repite la contraseña"
              name='reTypePassword'
              value={input.reTypePassword}
              onChange={handleChanges}
              required
            />
						{errors.noMatchPass && <p className='text-red-600'>{errors.noMatchPass}</p>}
          </div>

          <div className="flex items-center justify-around">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Cambiar contraseña
            </button>

            <button type='button'
              className="bg-yellow-400 hover:bg-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate('/')} >
              Cancelar
            </button>
          </div>
                   
        </form>
      </div>
    </div>
	)
}

export default RecoveryPassword