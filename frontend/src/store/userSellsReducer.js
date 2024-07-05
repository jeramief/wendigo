const LOAD_SELLS = "sells/loadSells";
const ADD_SELL = "sells/addSell";
const DELETE_SELL = "sells/deleteSell";
const CLEAR_SELLS = "sells/clearSells";

const loadSells = (sells) => ({
  type: LOAD_SELLS,
  sells,
});
const addSell = (sell) => ({
  type: ADD_SELL,
  sell,
});
const deleteSell = (sellId) => ({
  type: DELETE_SELL,
  sellId,
});
export const clearSell = () => ({
  type: CLEAR_SELLS,
});

export const thunkLoadUserSells = () => async (dispatch) => {
  const response = await fetch(`/api/user_sells`);

  if (response.ok) {
    const data = await response.json();
    return dispatch(loadSells(data));
  } else {
    const errors = await response.json();
    return errors;
  }
};
export const thunkAddSell = (sell) => async (dispatch) => {
  const response = await fetch(`/api/user_sell/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: sell.userId,
      vehicle_id: sell.vehicleId,
      offer_price: 0,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return dispatch(addSell(data));
  } else {
    const errors = await response.json();
    return errors;
  }
};
export const thunkEditSell = (sell) => async (dispatch) => {
  const response = await fetch(`/api/user_sell/${sell.id}/edit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: sell.userId,
      vehicle_id: sell.vehicleId,
      offer_price: sell.offerPrice,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return dispatch(addSell(data));
  } else {
    const errors = await response.json();
    return errors;
  }
};
export const thunkDeleteSell = (sellId) => async (dispatch) => {
  const response = await fetch(`/api/user_sell/${sellId}/delete`);

  if (response.ok) {
    return dispatch(deleteSell(sellId));
  } else {
    const errors = await response.json();
    return errors;
  }
};

const initialState = {};

const userSellReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SELLS: {
      const newState = { ...state };
      action.sells.forEach((sell) => {
        newState[sell.id] = sell;
      });
      return newState;
    }
    case ADD_SELL: {
      const newState = { ...state };
      newState[action.sell.id] = action.sell;
      return newState;
    }
    case DELETE_SELL: {
      const newState = { ...state };
      delete newState[action.sellId];

      return newState;
    }
    case CLEAR_SELLS: {
      return initialState;
    }
    default:
      return state;
  }
};

export default userSellReducer;
