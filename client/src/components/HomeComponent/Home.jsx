import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../Home/ProductCard/ProductCard';
import NavBar from "../Home/NavBar/NavBar";
import Order from "../Home/Order/Order";
import Carrousel from "../Carrousel/Carrousel";
import SearchBar from '../Home/SearchBar/SearchBar';
import { filterBrandsCellphones, filterByBrandAndStorage, filterStorageCellphones, getProducts, listStorage } from "../../redux/actions";
import { Disclosure } from "@headlessui/react";
import { FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useRef } from 'react';

const Home = () => {
	const products = useSelector((state) => state.showProducts);
	const almacenamiento = useSelector((state) => state.listStorage);
	const marcas = useSelector((state) => state.brands);
	const [currentPage, setCurrentPage] = useState(0);
	const [listCellphone, setListCellphone] = useState([])
	const checkbox = useRef()
	// const [dataModal, setDataModal] = useState({ show: false, title: '', message: '' });
	const dispatch = useDispatch()


	const firstPage = () => {
		setCurrentPage(0);
	};

	const nextPage = () => {
		if (products.length <= currentPage + 8) {
			setCurrentPage(currentPage);
		} else setCurrentPage(currentPage + 8);
	};

	const previousPage = () => {
		if (currentPage < 8) {
			setCurrentPage(0);
		} else setCurrentPage(currentPage - 8);
	};

	const selectPage = (event) => {
		setCurrentPage(parseInt(event.target.value));
	};

	useEffect(() => {
		firstPage();
		setListCellphone(products)
		dispatch(listStorage())

	}, [products]);

	const brands = []
	function handleMarca(e) {
		const index = brands.findIndex(brand => brand === e.target.value)
		!brands.includes(e.target.value) ? brands.push(e.target.value) : brands.splice(index, 1)
		console.log(brands, 'Obteniendo marcas');
	}

	const storage = []
	function handleStorage(e) {
		const index = storage.findIndex(stg => stg === e.target.value)
		!storage.includes(e.target.value) ? storage.push(e.target.value) : storage.splice(index, 1)
		console.log("Obteniendo almacenamiento ", storage);
	}

	const applyFilters = () => {
		const checksBrands = document.getElementsByName("brands")
		const checksstorage = document.getElementsByName("storage")
		for (const check of checksBrands) {
			check.checked = false
		}
		for (const check of checksstorage) {
			check.checked = false
		}
		if(brands.length > 0 && storage.length > 0){
			dispatch(filterByBrandAndStorage(brands, storage))
		} else if (brands.length > 0) {
			dispatch(filterBrandsCellphones(brands))
		} else if(storage.length > 0) {
			dispatch(filterStorageCellphones(storage))
		}
	}

	const showProducts = products.slice(currentPage, currentPage + 8);

	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

	!localStorage.getItem("products") && localStorage.setItem("products", "[]")

	return (
		<div className="bg-white">
			<Carrousel />
			<div>
				<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900">
							Nuestros productos
						</h1>

						<div className="flex items-center">
							<Order />
							<button
								type="button"
								className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className="sr-only">Filters</span>
								<FunnelIcon className="h-5 w-5" aria-hidden="true" />
							</button>
						</div>
					</div>

					<section aria-labelledby="products-heading" className="pt-6 pb-24">
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>

						<div className="flex flex-row gap-x-8 gap-y-10">
							<div className="hidden lg:block basis-1/4">
								<h3 className="sr-only">Categories</h3>
								<SearchBar />
								<Disclosure as="div" className="border-b border-gray-200 py-6">
									{({ open }) => (
										<>
											<h3 className="-my-3 flow-root">
												<Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
													<span className="font-medium text-gray-900">Marcas</span>
													<span className="ml-6 flex items-center">
														{open ? (
															<MinusIcon className="h-5 w-5" aria-hidden="true" />
														) : (
															<PlusIcon className="h-5 w-5" aria-hidden="true" />
														)}
													</span>
												</Disclosure.Button>
											</h3>

											<Disclosure.Panel className="pt-6">
												<div className="space-y-4">
													{marcas.map((option, optionIdx) => (
														<div key={optionIdx} className="flex items-center">
															<input
																id={option.id}
																className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
																name="brands"
																value={option.name}
																onChange={handleMarca}
																type="checkbox"
																ref={checkbox}
															/>
															<label className="ml-3 text-sm text-gray-600">
																{option.name}
															</label>
														</div>
													))}
												</div>
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
								<Disclosure as="div" className="border-b border-gray-200 py-6">
									{({ open }) => (
										<>
											<h3 className="-my-3 flow-root">
												<Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
													<span className="font-medium text-gray-900">
														Almacenamiento
													</span>
													<span className="ml-6 flex items-center">
														{open ? (
															<MinusIcon className="h-5 w-5" aria-hidden="true" />
														) : (
															<PlusIcon className="h-5 w-5" aria-hidden="true" />
														)}
													</span>
												</Disclosure.Button>
											</h3>

											<Disclosure.Panel className="pt-6">
												<div className="space-y-4">
													{almacenamiento.map((e, i) => (
														<div key={i} className="flex items-center">
															<input
																id={i}
																name="storage"
																value={e}
																type="checkbox"
																// checked={e === storage ? true : false}
																className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
																onChange={handleStorage}
															/>
															<label className="ml-3 text-sm text-gray-600">
																{e} Gb
															</label>
														</div>
													))}
												</div>
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
								<button onClick={applyFilters}>Aplicar filtros</button>
							</div>

							<div className="bg-white">
								<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
									{listCellphone.map((product) => {
										return (
											<ProductCard
												id={product.id}
												key={product.id}
												name={product.name}
												image={product.image}
												price={product.price}
												screen={product.screen}
												internal_storage={product.internal_storage}
												ram={product.ram}
												front_camera={product.front_camera}
												rear_camera={product.rear_camera}
												cpu={product.cpu}
												battery={product.battery}
												color={product.color}
												description={product.description}
												stock={product.stock}
												oId={product.oId}
												brandId={product.brandId}
												brand={product.brand.name}
											// setDataModal={setDataModal}
											/>
										);
									})}
								</div>
								<NavBar
									length={Math.ceil(products.length / 8)}
									set={selectPage}
									prev={previousPage}
									next={nextPage}
								/>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div >
	);
}

export default Home