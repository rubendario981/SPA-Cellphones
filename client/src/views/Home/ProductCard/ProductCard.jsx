import React from "react";
import { Link } from "react-router-dom";
import s from './ProductCard.module.css'


const ProductCard = ({ id, name, image, price, screen, internal_storage, ram, front_camera, rear_camera, cpu, battery, color, description, stock, oId, brandId }) => {

  const addCarrito = () => {
    // ya no hace falta, pq la propiedad products se crea siempre que se renderize el componente Products
    // const value = localStorage.getItem('products')
    // if (!value) {
    //   const arrayProd = []
    //   localStorage.setItem('products', JSON.stringify(arrayProd))
    // }

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
    let cantidad = productos.find(e => e.id === id).cant
    if (productos.map(p => p.id === id).length > 0) alert(`${name} agregado al carrito.\nUsted tiene ${cantidad} productos agregados al carrito.`)
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
