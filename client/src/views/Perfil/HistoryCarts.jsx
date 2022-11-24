import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const HistoryCarts = () => {
  const historyCart = useSelector(state => state.historyCarts)
  const currencyFormat = (num) => num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

  return (
    <div>
      <h3 className='text-center font-bold mb-4 text-xl'>Historial de tus compras </h3>

      <div className='mb-16'>
        {historyCart.length === 0
          ? <div className="flex flex-col">
            <h3 className='mr-3 font-bold'>No tienes compras registradas</h3>
            <img src="https://img.freepik.com/vector-premium/pequenos-personajes-enorme-historial-transacciones-receta-pago-comprador-hombre-tarjeta-credito-pago-linea-mujer-vidrio-pago-efectivo-compras-tienda-ilustracion-vector-gente-dibujos-animados_87771-11353.jpg" alt="Sin historial de compras" />
            <Link to={'/'}
              className="bg-blue-500 text-center w-1/2 mx-auto mt-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Ir a la pagina de inicio
            </Link>
          </div>
          : historyCart.map((cart, index) => {
            let total = 0
            return (
              <div key={index}>
                <div className="flex">
                  <p className='mr-3 font-bold'>{index + 1} -</p>
                  <p className='font-semibold mr-3'> Estado del pedido:</p>
                  <p>{cart.status}</p>

                </div>
                <div className="overflow-x-auto relative">
                  <table className="w-11/12 text-sm text-left">
                    <thead className="text-xs uppercase border-b border-t dark:border-gray-700 bg-blue-300">
                      <tr>
                        <th scope="col" className="py-3 px-2">
                          No
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Producto
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Cantidad
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Valor
                        </th>
                        <th scope="col" className="py-3 px-6">
                          SubTotal
                        </th>
                      </tr>
                    </thead>
                    {cart.cellphones.map((cell, index) => {
                      total += (cell.detailCart.cantidad * cell.detailCart.valor_unitario)

                      return (
                        <tbody key={index}>
                          <tr className="bg-white border-b dark:border-gray-700">
                            <th scope="row" className="py-4 px-2 text-gray-900">
                              {index + 1}
                            </th>
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                              {cell.name}
                            </th>
                            <td className="py-4 px-6">
                              {cell.detailCart.cantidad}
                            </td>
                            <td className="py-4 px-6">
                              {cell.detailCart.valor_unitario}
                            </td>
                            <td className="py-4 px-6 text-right">
                              {currencyFormat(cell.detailCart.cantidad * cell.detailCart.valor_unitario)}
                            </td>
                          </tr>
                        </tbody>
                      )
                    })}
                    <tfoot>
                      <tr className="font-semibold text-gray-900 border-b border-gray-700 bg-blue-300">
                        <th scope="row" colSpan={4} className="py-3 px-6 text-base">Total</th>
                        <td className="py-3 px-6 font-bold">$ {currencyFormat(total)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default HistoryCarts