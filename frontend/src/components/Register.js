import React from 'react';
import './styling.css';

function Register()
{
	const doRegister = async event =>
	{
		event.preventDefault();        
        alert('Registered!');   
	}

	return(
		<div id="registerDiv">
			<form onSubmit={doRegister}>
				<input type="text" placeholder="First Name" required/>
				<input type="text" placeholder="Last Name" required/>
				<input type="text" placeholder="Email" required/>
				<input type="password" placeholder="Password" required/>
				<input type="password" placeholder="Confirm Password" required/>
				<input type="submit" value="Create Account" onSubmit={doRegister}/>
			</form>
		</div>
	);
};

export default Register;