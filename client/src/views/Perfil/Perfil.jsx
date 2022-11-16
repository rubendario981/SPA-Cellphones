import React, { useState } from 'react';

const Perfil = () => {
	const token = localStorage.getItem('token')
	const [user, setUser] = useState()

	if(token){
		const payloadUser = window.atob(token.split('.')[1])
		setUser(JSON.parse(payloadUser))
	}
	
	return (
		<div className='mt-15 pt-15'>
			{ token && user
				? <p> usuario identificado con email {user.email}</p> :
				<p> usuario desde la base de datos con id {user.id} y rol { user.status } </p>
			}
			
		</div>
	)
}

export default Perfil