import { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";
import '../../components/bootstrap.min.css';
import { useHistory } from "react-router";
import foodBGImg from '../../components/imgs/food-white.jpg';
import {Link} from 'react-router-dom';

const ForgotPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
    }
  };

  return (
    <div className="forgotpassword-screen" style={{backgroundImage:`url(${foodBGImg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh'}}>
        <div id="resetBackground">
            <form
            onSubmit={forgotPasswordHandler}
            className="forgotpassword-screen__form"
          >
            <h3 className="forgotpassword-screen__title">Forgot Password</h3>
            {error && <span className="error-message">{error}</span>}
            {success && <span className="success-message">{success}</span>}
            <div className="form-text">
              <span className="forgotpassword-screen__subtext">
                Please enter the email address you registered your account with. We
                will send you an email with instructions on how to reset your password.
              </span>
            </div>
            <div id="resetPassForm">
              <label htmlFor="email" style={{display:'none'}}>Email:</label>
              <input
                type="email"
                required
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /></div>
            <button type="submit" id="resetButton">
              Reset Password
            </button>
          </form>
        </div>
        <div id="backToLogin">
            <span><button id="backToLoginButton"><Link to="/">Back to Login</Link></button></span>
            <span style={{fontWeight:'bold', fontSize:'20px'}}>- OR -</span>
            <span><button id="backToLoginButton"><Link to="/register">Create a New Account</Link></button></span>
        </div>
    </div>
  );
};

export default ForgotPassword;