import { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";
import '../../components/bootstrap.min.css';
import { useHistory } from "react-router";

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
    <div className="forgotpassword-screen">
      <form
        onSubmit={forgotPasswordHandler}
        className="forgotpassword-screen__form"
      >
        <h3 className="forgotpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-text">
          <span className="forgotpassword-screen__subtext">
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
          </span>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /></div>
        <button type="submit" className="btn btn-primary">
          Send Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;