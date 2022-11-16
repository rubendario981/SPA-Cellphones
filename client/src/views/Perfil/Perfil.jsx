import React from 'react'

const Perfil = () => {
	const token = localStorage.getItem('token')

	const payloadUser = window.atob(token.split('.')[1])
	const user = JSON.parse(payloadUser)

	return (
		<div className='mt-15 pt-15'>
			{ token && user.email
				? <p> usuario identificado con email {user.email}</p> :
				<p> usuario desde la base de datos con id {user.id} </p>
			}
		</div>
	)
}

export default Perfil