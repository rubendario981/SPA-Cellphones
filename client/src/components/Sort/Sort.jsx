import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { sortBiggerPrice, sortByBrand, sortByName, sortLowerPrice, sortReverseName } from '../../redux/actions';

const Sort = () => {
	const dispatch = useDispatch()
	const sortOptions = [
		{ name: "Nombre (A - Z)" },
		{ name: "Nombre (Z - A)" },
		{ name: "Precio mayor a menor" },
		{ name: "Precio menor a mayor" },
		{ name: "Marca (A - Z)" },
	];

	const [input, setInput] = useState("")

	const handleChanges = (e) => {
		setInput(e.target.value)
		switch (e.target.value) {
			case "Nombre (A - Z)":
				dispatch(sortByName())
				break

			case "Nombre (Z - A)":
				dispatch(sortReverseName())
				break

			case "Precio mayor a menor":
				dispatch(sortBiggerPrice())
				break

			case "Precio menor a mayor":
				dispatch(sortLowerPrice())
				break

			case "Marca (A - Z)":
				dispatch(sortByBrand())
				break

			default: break
		}
	}

	useEffect(() => {

	}, [dispatch])


	return (
		<div>
			<select
				className="shadow border border-gray-500 rounded w-full py-2 px-3 bg-white text-gray-400 text-xs focus:outline-none focus:shadow-outline"
				onChange={handleChanges}
				name="brandId"
				value={input}
				required
			>
				<option defaultValue value={''} >Ordenar</option>
				{sortOptions.map((el, index) =>
					(<option key={index} value={el.name} >{el.name}</option>)
				)}
			</select>
		</div>
	)
}

export default Sort