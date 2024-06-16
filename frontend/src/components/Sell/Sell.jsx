// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

import "./Sell.css";
// import { useModal } from "../../context/Modal";

const Sell = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { closeModal } = useModal();
  // currentUser = useSelector((state) => state.session.user);

  // const [VIN, setVIN] = useState('')

  return (
    <form className="sell-form-container">
      <label>
        VIN
        <input type="text" />
      </label>
    </form>
  );
};

export default Sell;
