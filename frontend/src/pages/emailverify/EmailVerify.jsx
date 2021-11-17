import React from 'react';
import './EmailVerify.css';
import '../../components/bootstrap.min.css';

const EmailVerify = () =>
{

	return(
		<div>
			<div class="container">
				<div class="row">
					<div class="col"><h2>Welcome to the tasiest place online!</h2></div>
				</div>
				<div class="row">
				</div>
				<div class="row">
					<div class="col-3"></div>
					<div class="col-4"><p>Please check your inbox as we've sent you a verification email.<br/> Sorry, we know this can be annoying,
					we just need to make sure you're not a bot. After all, bots don't have tastebuds so who are they to write recipes!</p></div>
					<div class="col-3"></div>
				</div>
			</div>
		</div>
	);
};

export default EmailVerify;