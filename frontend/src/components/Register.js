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
				<label>First Name</label>
				<input type="text" placeholder="First Name" required/>
				<input type="text" placeholder="Last Name" required/>
				<input type="text" placeholder="Email" required/>
				<input type="password" placeholder="Password" required/>
				<input type="submit" value="Create Account"/>
			</form>
		</div>
	);
};

export default Register;