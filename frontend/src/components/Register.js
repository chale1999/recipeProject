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
				<label>Last Name</label>
				<input type="text" placeholder="Last Name" required/>
				<label>Email</label>
				<input type="text" placeholder="Email" required/>
				<label>Password</label>
				<input type="password" placeholder="Password" required/>
				<label>Password Confirm</label>
				<input type="password" placeholder="Confirm Password" required/>
				<input type="submit" value="Create Account" onSubmit={doRegister}/>
			</form>
		</div>
	);
};

export default Register;