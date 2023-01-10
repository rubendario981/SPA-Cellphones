import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ title, comment, score, date, user }) => {
	const [nameUser, setNameUser] = useState('')
	
	const stars = [];
	for (let i = 0; i < 5; i++) {
		i < score ? stars.push(<AiFillStar className='text-yellow-400 text-xl' />) : stars.push(<AiOutlineStar className='text-yellow-400 text-xl' />)
	}

	const dateComment = new Date(date)
	const URL = process.env.REACT_APP_URL || "http://localhost:3001";

	useEffect(() => {
		const getNameUser = async () => {
			try {
				const response = await axios.get(`${URL}/user/name-user?id=${user}`)
				setNameUser(response.data.name)
			} catch (error) {
				setNameUser('Usuario')
				console.log("Error component rating name user", error)
			}
		}
		getNameUser()
	}, [])

	return (
		<div className='px-2 py-1 border border-gray-200 rounded-lg my-2'>
			<article className="px-8 py-6">
				<div className="flex items-center mb-1">
					{stars.map((e, i) => <span key={i}>{e}</span>)}
					<h3 className="ml-2 text-sm font-semibold text-gray-800">{title}</h3>
				</div>
				<div className="mb-3 text-sm text-gray-500 dark:text-gray-600">
					<p>Autor: <span>{nameUser || "Por definir"}</span> </p>
					<small>{dateComment.toLocaleDateString()}</small>
				</div>
				<p className="mb-2 font-light text-gray-500">{comment}</p>
			</article>
		</div>
	)
}

export default Rating