import React from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const CarritoCard = ({ name, image, rom, price, id, update, setUpdate, stock }) => {

  const product = JSON.parse(localStorage.getItem('products')).find(e => e.id === id)

  async function deletedCarrito() {
    let confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    if (confirm.isConfirmed) {
      let elementsCart = JSON.parse(localStorage.getItem("products"))
      let index = elementsCart.findIndex(e => e.id === id)
      elementsCart.splice(index, 1)
      localStorage.setItem("products", JSON.stringify(elementsCart))
      setUpdate(!update)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  }

  function onHandelChange(e) {
    if (e.target.value > stock) {
      Swal.fire({
        position: 'center',
        html: `<p>No hay suficiente stock de ${name} <br/>El maximo es ${stock}</p>`,
        showConfirmButton: false,
        icon: "error",
        timer: 3000,
        width: 400,
      })
      e.target.value = stock
    }
    if (e.target.value <= 0)
      e.target.value = 1

    let elementsCart = JSON.parse(localStorage.getItem("products"))
    let index = elementsCart.findIndex(e => e.id === id)
    let producto = elementsCart[index]
    producto.cant = e.target.value * 1
    localStorage.setItem("products", JSON.stringify(elementsCart))
    setUpdate(!update)
  }


  return (
    <>
      <div className="border border-blue-500/20 w-80 pb-2 rounded-lg bg-white">
        <div className="group relative">
          <div className="min-h-[20%] aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md  group-hover:opacity-75 lg:aspect-none lg:h-60 bg-white py-1 rounded-lg">
            <img
              src={image}
              alt="Phone_image"
              className="h-full w-full object-contain object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between px-2">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link to={`/product/${id}`}>
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{rom}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{price} C/u</p>
          </div>
        </div>
        <div className="flex flex-col items-center">

          <input className="bg-transparent text-blue-700 text-center font-semibold py-2 px-4 my-2 border border-slate-500 rounded w-20 justify-self-auto"
            type="number"
            onChange={(e) => onHandelChange(e)}
            defaultValue={product.cant} />

          <button className="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 my-2 border border-slate-500 hover:border-transparent rounded"
            onClick={() => deletedCarrito()} >
            Eliminar del carrito
          </button>

          <label className="inline-block" htmlFor="Stcok"> Disponibles: {stock}</label>
        </div>
      </div>
    </>
  );
};

export default CarritoCard;
