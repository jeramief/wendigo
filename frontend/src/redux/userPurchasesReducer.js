const LOAD_PURCHASES = "purchases/loadPurchases";
const ADD_PURCHASE = "purchases/addPurchase";
const DELETE_PURCHASE = "purchase/deletePurchase";
const CLEAR_PURCHASES = "purchases/clearPurchases";

const loadPurchases = (purchases) => ({
  type: LOAD_PURCHASES,
  purchases,
});
const addPurchase = (purchase) => ({
  type: ADD_PURCHASE,
  purchase,
});
const deletePurchase = (purchaseId) => ({
  type: DELETE_PURCHASE,
  purchaseId,
});
export const clearPurchases = () => ({
  type: CLEAR_PURCHASES,
});

export const thunkLoadUserPurchases = () => async (dispatch) => {
  const response = await fetch(`/api/user_purchases`);

  if (response.ok) {
    const data = await response.json();
    return dispatch(loadPurchases(data));
  } else {
    const errors = await response.json();
    console.log({ errors });
    return;
  }
};
export const thunkAddPurchase = (purchase) => async (dispatch) => {
  const response = await fetch(`/api/user_purchases/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: purchase.userId,
      vehicle_id: purchase.vehicleId,
      first_name: purchase.firstName,
      last_name: purchase.lastName,
      delivery_address: purchase.deliveryAddress,
      finalized: purchase.finalized,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return dispatch(addPurchase(data));
  } else {
    const errors = await response.json();
    console.log({ errors });
    return;
  }
};
export const thunkEditPurchase = (purchase) => async (dispatch) => {
  const response = await fetch(`/api/user_purchases/${purchase.id}/edit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: purchase.userId,
      vehicle_id: purchase.vehicleId,
      first_name: purchase.firstName,
      last_name: purchase.lastName,
      delivery_address: purchase.deliveryAddress,
      finalized: purchase.finalized,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return dispatch(addPurchase(data));
  } else {
    const errors = await response.json();
    console.log({ errors });
    return;
  }
};
export const thunkDeletePurchase = (purchaseId) => async (dispatch) => {
  const response = await fetch(`/api/user_purchases/${purchaseId}/delete`);

  if (response.ok) {
    return dispatch(deletePurchase(purchaseId));
  } else {
    const errors = await response.json();
    console.log({ errors });
    return errors;
  }
};

const initialState = {};

const userPurchasesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PURCHASES: {
      const newState = { ...state };
      action.purchases.forEach((purchase) => {
        newState[purchase.id] = purchase;
      });
      return newState;
    }
    case ADD_PURCHASE: {
      const newState = { ...state };
      newState[action.purchase.id] = action.purchase;
      return newState;
    }
    case DELETE_PURCHASE: {
      const newState = { ...state };
      delete newState[action.purchaseId];

      return newState;
    }
    case CLEAR_PURCHASES: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default userPurchasesReducer;
