import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkLogin, thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        first_name: firstName,
        last_name: lastName,
        state,
        password,
      })
    );

    if (serverResponse) {
      console.log(serverResponse);
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
    <div className="signup-form-modal-container">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="signup-form-modal-form" onSubmit={handleSubmit}>
        <label className="signup-form-modal-inputs">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label className="signup-form-modal-inputs">
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label className="signup-form-modal-inputs">
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label className="signup-form-modal-inputs">
          State
          <select
            id="userState"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          >
            <option value={""} disabled>
              Select a State
            </option>
            {[
              "AK",
              "AL",
              "AR",
              "AS",
              "AZ",
              "CA",
              "CO",
              "CT",
              "DC",
              "DE",
              "FL",
              "GA",
              "GU",
              "HI",
              "IA",
              "ID",
              "IL",
              "IN",
              "KS",
              "KY",
              "LA",
              "MA",
              "MD",
              "ME",
              "MI",
              "MN",
              "MO",
              "MP",
              "MS",
              "MT",
              "NC",
              "ND",
              "NE",
              "NH",
              "NJ",
              "NM",
              "NV",
              "NY",
              "OH",
              "OK",
              "OR",
              "PA",
              "PR",
              "RI",
              "SC",
              "SD",
              "TN",
              "TX",
              "UM",
              "UT",
              "VA",
              "VI",
              "VT",
              "WA",
              "WI",
              "WV",
              "WY",
            ].map((state) => (
              <option value={state} key={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label className="signup-form-modal-inputs">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label className="signup-form-modal-inputs">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button className="profile-buttons signup-button" type="submit">
          Sign Up
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

export default SignupFormModal;
