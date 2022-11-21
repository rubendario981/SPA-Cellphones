import React from "react";
import { Link } from "react-router-dom";
import s from './ProductCard.module.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const ProductCard = ({ id, name, image, price, screen, internal_storage, ram, front_camera, rear_camera, cpu, battery, color, description, stock, oId, brandId }) => {

  const addCarrito = () => {
    const productos = JSON.parse(localStorage.getItem('products'))
    const producto = { id, name, image, price, screen, internal_storage, ram, front_camera, rear_camera, cpu, battery, color, description, stock, oId, brandId }
    const index = productos.findIndex(p => p.id === id)

    if (index < 0) {
      producto.cant = 1
      productos.push(producto)
      localStorage.setItem('products', JSON.stringify(productos))
    } else {
      let producto = productos.splice(index, 1)[0]
      producto.cant = ++producto.cant
      productos.push(producto)
      localStorage.setItem('products', JSON.stringify(productos))
    }

    Swal.fire({
      position: 'top-end',
      html: `<p>Producto agregado al carrito.</p>`,
      showConfirmButton: false,
      timer: 1000,
      width: 300,
    })
  }


  return (
    <>
      <div id={id}>
        <button className={s.buttonCarrito} onClick={() => addCarrito()} > 🛒 </button>
        <div className="group relative">
          <div className="min-h-[20%] aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md  group-hover:opacity-75 lg:aspect-none lg:h-60">
            <img
              src={image}
              alt="Phone_image"
              className="h-full w-full object-contain object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link to={`/product/${id}`}>
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{internal_storage}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
