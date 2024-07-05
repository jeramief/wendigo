import { useState } from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../store/session";
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
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };
  // const demoLogin = async (e) => {
  //   e.preventDefault();

  //   const serverResponse = await dispatch(
  //     thunkLogin({
  //       email: "demo@aa.io",
  //       password: "password",
  //     })
  //   );

  //   if (serverResponse) {
  //     setErrors(serverResponse);
  //   } else {
  //     closeModal();
  //   }
  // };

  return (
    <div className="signup-form-modal-container">
      <h1>Sign Up</h1>
      {errors.server && <p className="errors">{errors.server}</p>}
      <form className="signup-form-modal-form" onSubmit={handleSubmit}>
        <label className="signup-form-modal-inputs">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="errors">{errors.email}</p>}
        </label>
        <label className="signup-form-modal-inputs">
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && <p className="errors">{errors.firstName}</p>}
        </label>
        <label className="signup-form-modal-inputs">
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && <p className="errors">{errors.lastName}</p>}
        </label>
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
          {errors.lastName && <p className="errors">{errors.lastName}</p>}
        </label>
        <label className="signup-form-modal-inputs">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="errors">{errors.password}</p>}
        </label>
        <label className="signup-form-modal-inputs">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && (
            <p className="errors">{errors.confirmPassword}</p>
          )}
        </label>
        <button className="profile-buttons signup-button" type="submit">
          Sign Up
        </button>
      </form>
      {/* <form onSubmit={demoLogin}>
        <button className="profile-buttons" type="submit">
          Log In As Demo
        </button>
      </form> */}
    </div>
  );
}

export default SignupFormModal;
