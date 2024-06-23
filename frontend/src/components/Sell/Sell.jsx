import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/Modal";
import listOfCars from "../../utils/listOfCars";
import "./Sell.css";

const Sell = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const currentUser = useSelector((state) => state.session.user);

  const makes = Object.keys(listOfCars);

  const [VIN, setVIN] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [transmission, setTransmission] = useState("");
  const [color, setColor] = useState("");

  return (
    <form className="sell-form-container">
      <label>
        VIN
        <input
          type="text"
          value={VIN}
          placeholder="Enter VIN"
          onChange={(e) => setVIN(e.target.value)}
          required
        />
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
          // disabled
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
          type="number"
          value={mileage}
          placeholder="Enter mileage"
          onChange={(e) => setMileage(e.target.value)}
          required
        />
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
    </form>
  );
};

export default Sell;
