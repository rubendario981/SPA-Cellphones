import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carrousel from "../Carrousel/Carrousel";
import SearchBar from '../Home/SearchBar/SearchBar';
import Paginator from "../Paginator/Paginator"
import { filterProducts, listStorage } from "../../redux/actions";
import { useRef } from 'react';
import Products from '../Products/Products';
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import Sort from '../Sort/Sort';

const Home = () => {
	const products = useSelector((state) => state.showProducts);
	const almacenamiento = useSelector((state) => state.listStorage);
	const marcas = useSelector((state) => state.brands);
	const checkbox = useRef()
	const dispatch = useDispatch()

	const [showBrandsOptions, setShowBrandsOptions] = useState(false)
	const [showStorageOptions, setShowStorageOptions] = useState(false)

	// Information for paginator component
	const [currentPage, setCurrentPage] = useState(1);
	const postPerPage = 8
	const lastPostIndex = currentPage * postPerPage;
	const firstPostIndex = lastPostIndex - postPerPage;
	const currentPost = products.slice(firstPostIndex, lastPostIndex);

	useEffect(() => {
		dispatch(listStorage())
	}, [products, dispatch]);

	const brands = []
	function handleMarca(e) {
		const index = brands.findIndex(brand => brand === e.target.value)
		!brands.includes(e.target.value) ? brands.push(e.target.value) : brands.splice(index, 1)
		console.log("seleccionado", e.target.value);
		dispatch(filterProducts(brands))
	}

	const storage = []
	function handleStorage(e) {
		const index = storage.findIndex(stg => stg === e.target.value)
		!storage.includes(e.target.value) ? storage.push(e.target.value) : storage.splice(index, 1)
		console.log("Obteniendo almacenamiento ", storage);
	}

	!localStorage.getItem("products") && localStorage.setItem("products", "[]")

	return (
		<div className="flex flex-col justify-between">
			<Carrousel />

			<div className='flex justify-between'>
				<div className='w-2/12 mt-3 pt-2 border border-r-2 border-r-blue-300'>
					<SearchBar />
					<div className="space-y-2">
						<div className='flex flex-row w-full justify-between mt-3 cursor-pointer'
							onClick={() => setShowBrandsOptions(!showBrandsOptions)}
						>
							<p className='ml-1'>Marcas</p>
							<IoRemoveOutline className={!showBrandsOptions ? "hidden" : "mt-1 mr-2"} />
							<IoAddOutline className={showBrandsOptions ? "hidden" : "mt-1 mr-2"} />
						</div>
						{marcas.map((e, index) => (
							<div key={index} className={showBrandsOptions ? "flex items-center ml-3" : "hidden"}>
								<input
									id={e.id}
									className="h-4 w-4 rounded border-gray-300"
									name="brands"
									value={e.name}
									onChange={handleMarca}
									type="checkbox"
									ref={checkbox}
								/>
								<label className="ml-3 text-sm text-gray-600">
									{e.name}
								</label>
							</div>
						))}
					</div>
					<div className="space-y-2">
						<div className='flex flex-row w-full justify-between mt-3 cursor-pointer'
							onClick={() => setShowStorageOptions(!showStorageOptions)}
						>
							<p className='ml-1'>Almacenamiento</p>
							<IoRemoveOutline className={!showStorageOptions ? "hidden" : "mt-1 mr-2"} />
							<IoAddOutline className={showStorageOptions ? "hidden" : "mt-1 mr-2"} />
						</div>
						{almacenamiento.map((e, i) => (
							<div key={i} className={showStorageOptions ? "flex items-center ml-3" : "hidden"}>
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
				</div>
				<div className='w-10/12'>
					<div className='flex flex-row justify-between my-3'>
						<h1 className="text-2xl ml-10 font-bold text-gray-900">
							Nuestros productos
						</h1>
						<div className='mr-10'>
							<Sort />
						</div>
					</div>
					<Paginator
						totalPosts={products.length}
						postPerPage={postPerPage}
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
					/>
					<Products data={currentPost} />
					<Paginator
						totalPosts={products.length}
						postPerPage={postPerPage}
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home