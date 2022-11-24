import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios"
import { getProfile, resetProducts } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export default function Pago() {

  const [loading, setloading] = useState(false)
  let user = useSelector(s => s.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const stripe = useStripe() //Conexion a stripe
  const elements = useElements() //Seleccionador de elementos de stripe
  const products = JSON.parse(localStorage.getItem("products"))
  const total = products.map(e => e.price * e.cant).reduce((a, b) => a + b, 0)
  const token = JSON.parse(localStorage.getItem("token"))
  const idUser = (JSON.parse(window.atob(token?.split('.')[1]))).id

  useEffect(() => {
    dispatch(getProfile(idUser))
  }, [])


  console.log("el usuario que llega al front: ", user);

  async function handelSubmit(e) {
    e.preventDefault()
    setloading(true)
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({  //Creando un nuevo metodo de pago
        type: "card",                                                             //Metodo de pago
        card: elements.getElement(CardElement)      //Seleccionando el elemento que va a contener el numero de la tarjeta
      })

      if (!error) { //Si no hay error en el pago
        const { id } = paymentMethod

        const { data } = await axios.post(`http://localhost:3001/user/registerBuy`, {
          id,
          amount: total * 100,
          receipt_email: user.email,
          metadata: {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "country": user.country,
            "city": user.city,
            "address": user.address,
            "card_number": user.card_number,
            "status": user.status,
          }
        })
        setloading(false)
        //Se envia el mail
        await axios.post("http://localhost:3001/user/sendEmail", user)
        //Alerta de que su compra fue exitosa
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pago realizado con exito',
          showConfirmButton: false,
          timer: 2000
        })
        //Armo un objeto para mandarlo por body
        let aux = user
        let obj = { products, aux }
        //Actualizo el stock de los telefonos en la base de datos
        const listCellPhones = await axios.patch("http://localhost:3001/products/updateStock", obj.products)
        dispatch(resetProducts(listCellPhones.data))
        //Ejecuto ruta para crear el carrito en la base de datos
        await axios.post("http://localhost:3001/user/createdCartInDb", obj)
        //Reseteo el carrito
        localStorage.setItem("products", "[]")
        //Go to home
        navigate("/")
        //limpiando el input del cardNumber
        elements.getElement(CardElement).clear()
      } else {
        setloading(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChangeInput(e) {
    if (e.target.name === "name")
      user.name = e.target.value
    if (e.target.name === "email")
      user.email = e.target.value
    console.log(user);
  }

  return (
    <>
      <div className="bg-red-200 m-5 h-screen flex justify-items-center">
        <form onSubmit={handelSubmit} className="bg-blue-300 w-full h-full">
          <div className="m-60 flex flex-col text-center text-xl">
            <label htmlFor="">Datos de la tarjeta</label>
            <CardElement className="w-3/5 m-auto mb-3" ></CardElement>
            <div className="flex flex-col w-3/5 text-center text-xl justify-center m-auto">
              <label htmlFor="">Nombre y apellido</label>
              <input onChange={handleChangeInput} name="name" type="text" className="text-center text-lg" defaultValue={user?.name} />
              <label className="mt-3" htmlFor="">Mail <br /> <p className="text-sm">(Aca va a recibir informacion sobre su pago)</p></label>
              <input onChange={handleChangeInput} name="email" className="mb-5 text-center" type="text" defaultValue={user?.email} />
            </div>
            <div className="flex justify-center w-full">
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                {loading
                  ?
                  <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    {"Cergando..."}
                  </svg>
                  :
                  "Continuar"
                }
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}



