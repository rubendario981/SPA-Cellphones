import React from 'react'

const CurrentCart = () => {
	const productos = localStorage.getItem("products")
	const elementsCart = JSON.parse(productos)

	const currencyFormat = (num) => num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

	let total = elementsCart.reduce((acc, curr) => acc + parseInt(curr.price), 0);

	return (
		<div className='mb-16'>
			<div className="flex mb-4">
				<h5 className="font-bold text-center">
					Carrito de compras del local storage
				</h5>
			</div>
			{elementsCart.map(el => {
				return (
					<div key={el.id} className="w-11/12 ml-3 mx-auto px-4 bg-white border rounded-lg shadow-md dark:border-gray-700 mb-3">
						<div className="flow-root">
							<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
								<li className="py-3 sm:py-4">
									<div className="flex items-center space-x-4">
										<div className="flex-shrink-0">
											<img className="w-12 h-20" src={el.image} alt={el.name} />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-gray-900 truncate">
												{el.name}
											</p>
											<p className="text-sm text-gray-500 truncate dark:text-gray-400">
												Precio unitario {el.price} x {el.cant} Unds
											</p>
										</div>
										<div className="flex flex-col items-center mb-4">
											<p className="text-sm font-semibold text-gray-900 truncate">
												Sub-total
											</p>
											$ {parseInt(el.price) * el.cant}
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				)
			})}
			Total = ${currencyFormat(total)}
		</div>
	)
}

export default CurrentCart