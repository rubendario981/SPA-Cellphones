import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const DataUser = () => {
  const user = useSelector(state => state.user)
  
  return (
    <div>
      <div className='mb-14'>
        {!user
          ? <div>
            <h3 className='text-center font-bold mb-4 text-xl'>No has iniciado sesion</h3>
            <img src="https://baja.website/wp-content/uploads/2021/04/error-404-not-found.jpg" alt="No encontrado" />
            <div className='flex justify-around mt-6'>
              <Link to={'/login'}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >Ir a la pagina de login</Link>
              <Link to={'/'}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >Ir al inicio</Link>
            </div>
          </div>
          : user.status === "Inactivo"
            ? <div>
              <h3 className='text-center font-bold mb-4 text-xl'>Debes activar tu cuenta</h3>
              <img src="https://img.freepik.com/vector-premium/senal-bandeja-entrada-concepto-captura-todos-correos-electronicos-ilustracion-acciones-intercambio-correo-electronico-envio-recepcion_135661-353.jpg?w=2000" alt="Cuenta inactiva" />
              <p>Tu cuenta esta desactivada, por favor revisa el enlace que enviamos a tu correo para proceder a activar</p>
              <div className='flex justify-around mt-6'>
                <Link to={'/login'}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >Ir a la pagina de login</Link>
                <Link to={'/'}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >Ir al inicio</Link>
              </div>
            </div>
            : <div className='mb-14'>
              <h3 className='text-center font-bold mb-4 text-xl'>Estas son tus credenciales de usuario</h3>
              <p className='mb-2'><span className='font-bold'>Nombre:   </span> {user?.name} </p>
              <p className='mb-2'><span className='font-bold'>Correo:   </span> {user?.email}</p>
              <p className='mb-2'><span className='font-bold'>Pais:     </span> {user?.country || "No tienes registrado el pais"}</p>
              <p className='mb-2'><span className='font-bold'>Ciudad:   </span> {user?.city || "No tienes registrada tu ciudad"}</p>
              <p className='mb-2'><span className='font-bold'>Direccion:</span> {user?.address || "No tienes registrada tu direccion"}</p>
            </div>
        }
      </div>
    </div>
  )
}

export default DataUser