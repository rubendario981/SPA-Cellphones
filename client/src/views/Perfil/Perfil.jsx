import React from 'react'

const Perfil = () => {
	const token = localStorage.getItem('token')

	const payloadUser = window.atob(token.split('.')[1])
	const user = JSON.parse(payloadUser) 
	return (
		<div>
			{ user.id }
		</div>
	)
}

export default Perfil