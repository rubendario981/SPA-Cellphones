import React from "react";
import { Link } from "react-router-dom";
import s from './ProductCard.module.css'


const ProductCard = ({ id, name, image, price, screen, internal_storage, ram, front_camera, rear_camera, cpu, battery, color, description, stock, oId, brandId, setDataModal }) => {


  // Codigo viejo
  let producto = Object.entries(localStorage).map(e => JSON.parse(e[1]).hasOwnProperty("battery") && JSON.parse(e[1])).filter(e => typeof e === "object").find(e => e.id === e)

  function addCarrito(producto) {
    if (producto) {
      producto.cant++
      localStorage.setItem(id, JSON.stringify(producto))
    } else {
      let cant = 1
      localStorage.setItem(id, JSON.stringify({ id, name, image, price, screen, internal_storage, ram, front_camera, rear_camera, cpu, battery, color, description, stock, oId, brandId, cant }))
    }
    setDataModal({
      show: true,
      title: 'Producto agregado al carrito con exito.',
      message: `Producto ${name} agregado al carrito con exito.`
    })
  }


  return (
    <>
      <div id={id}>
        <button className={s.buttonCarrito} onClick={() => addCarrito(producto)} > 🛒 </button>
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
              {/* <p className="mt-1 text-sm text-gray-500">{rom}</p> */}
            </div>
            <p className="text-sm font-medium text-gray-900">{price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
