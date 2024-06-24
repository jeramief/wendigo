import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { thunkAddSell } from "../../store/userSellsReducer";
import listOfCars from "../../utils/listOfCars";
import "./Sell.css";

const Sell = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  const makes = Object.keys(listOfCars);

  const [VIN, setVIN] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [transmission, setTransmission] = useState("");
  const [color, setColor] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const errorsObject = {};

    if (VIN.length !== 17) {
      errorsObject.VIN = "VIN must be 17 characters";
    }
    if (!parseInt(mileage)) {
      errorsObject.mileage = "Mileage must be a number";
    }
    if (mileage < 0 || mileage > 150000) {
      errorsObject.mileage =
        "Mileage must be greater than 0 and less than 150,000";
    }

    setErrors(errorsObject);
  }, [VIN, mileage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (Object.values(errors).length) return;

    const addSell = {
      userId: currentUser.id,
      vehicleId: newVehicle.id,
      offerPrice: 0,
    };

    dispatch(thunkAddSell(addSell));

    navigate("/garage");
  };

  return (
    <form className="sell-form-container" onSubmit={handleSubmit}>
      <label>
        VIN
        <input
          type="text"
          value={VIN}
          placeholder="Enter VIN"
          onChange={(e) => setVIN(e.target.value)}
          required
        />
        {submitted && errors.VIN && <p className="errors">{errors.VIN}</p>}
      </label>
      <label>
        MAKE
        <select value={make} onChange={(e) => setMake(e.target.value)} required>
          <option value="" disabled>
            Select a Model
          </option>
          {makes.map((make, index) => (
            <option value={make} key={index}>
              {make}
            </option>
          ))}
        </select>
      </label>
      <label>
        MODEL
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a Model
          </option>
          {make &&
            listOfCars[make].map((model, index) => (
              <option value={model} key={index}>
                {model}
              </option>
            ))}
        </select>
      </label>
      <label>
        YEAR
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="" disabled>
            Select a Year
          </option>
          {Array.from(Array(20), (_, i) => i + 2006).map((selectYear) => (
            <option value={selectYear} key={selectYear}>
              {selectYear}
            </option>
          ))}
        </select>
      </label>
      <label>
        MILEAGE
        <input
          type="text"
          inputMode="numeric"
          value={mileage}
          placeholder="Enter mileage"
          onChange={(e) => setMileage(e.target.value)}
          maxLength={6}
          required
        />
        {submitted && errors.mileage && (
          <p className="errors">{errors.mileage}</p>
        )}
      </label>
      <label>
        TRANSMISSION
        <select
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
        >
          <option value="" disabled>
            Select Transmission
          </option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
      </label>
      <label>
        COLOR
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="" disabled>
            Select a Color
          </option>
          <option value="Black">Black</option>
          <option value="Gray">Gray</option>
          <option value="Silver">Silver</option>
          <option value="White">White</option>
          <option value="Blue">Blue</option>
          <option value="Purple">Purple</option>
          <option value="Pink">Pink</option>
          <option value="Red">Red</option>
          <option value="Maroon">Maroon</option>
          <option value="Brown">Brown</option>
          <option value="Beige">Beige</option>
          <option value="Gold">Gold</option>
          <option value="Orange">Orange</option>
          <option value="Yellow">Yellow</option>
          <option value="Green">Green</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <button className="sell-form-button">Get Offer</button>
    </form>
  );
};

export default Sell;
