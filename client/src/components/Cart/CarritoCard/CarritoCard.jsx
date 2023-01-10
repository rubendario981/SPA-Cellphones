import React from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const CarritoCard = ({ name, image, rom, price, id, update, setUpdate, stock }) => {

  const product = JSON.parse(localStorage.getItem('products')).find(e => e.id === id)

  async function deletedCarrito() {
    let confirm = await Swal.fire({
      title: 'Estas seguro?',
      text: `Desear confirmar la eliminacion de ${name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
			cancelButtonText: "Cancelar"
    })
    if (confirm.isConfirmed) {
      let elementsCart = JSON.parse(localStorage.getItem("products"))
      let index = elementsCart.findIndex(e => e.id === id)
      elementsCart.splice(index, 1)
      localStorage.setItem("products", JSON.stringify(elementsCart))
      setUpdate(!update)
      Swal.fire({
				title: "Producto eliminado",
				text: "Haz eliminado correctamente el producto",
				icon: "success",
				timer: 3000
			})
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
          <div className="min-h-[20%] aspect-w-1 aspect-h-1 w-full overflow-hidden group-hover:opacity-75 lg:aspect-none lg:h-60 bg-white py-1 rounded-lg">
            <img
              src={image}
              alt="Phone_image"
              className="object-contain mx-auto lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between px-4">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link to={`/product/${id}`}>
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {name}
                </Link>
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-900">$ {price} C/u</p>
          </div>
        </div>
        <div className="flex flex-col items-center">

          <input type="number"
						className="bg-transparent text-blue-700 text-center font-semibold text-sm my-2 border border-slate-500 rounded w-20 justify-self-auto"
            onChange={(e) => onHandelChange(e)}
            defaultValue={product.cant} />

          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 my-2 rounded-md"
            onClick={() => deletedCarrito()} >
            Eliminar del carrito
          </button>

          <div className="inline-block">
						<h4 className="text-sm">Disponibles: {stock}</h4>
					</div>
        </div>
      </div>
    </>
  );
};

export default CarritoCard;
