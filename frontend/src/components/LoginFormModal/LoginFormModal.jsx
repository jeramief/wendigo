import { useState } from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { thunkLogin } from "../../store/session";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };
  const demoLogin = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="login-form-modal-container">
      <h1>Log In</h1>
      <form className="login-form-modal-form" onSubmit={handleSubmit}>
        <label className="login-form-modal-inputs">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="errors">{errors.email}</p>}
        </label>
        <label className="login-form-modal-inputs">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="errors">{errors.password}</p>}
        </label>
        <button className="profile-buttons login-button" type="submit">
          Log In
        </button>
      </form>
      <form onSubmit={demoLogin}>
        <button className="profile-buttons" type="submit">
          Log In As Demo
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
