const LOAD_PURCHASES = "purchases/loadPurchases";

const loadPurchases = (purchases) => ({
  type: LOAD_PURCHASES,
  purchases,
});

export const thunkLoadUserPurchases = () => async (dispatch) => {
  const response = await fetch("/api/user_purchases");

  if (response.ok) {
    const data = await response.json();
    return dispatch(loadPurchases(data));
  } else {
    const errors = await response.json();
    console.log({ errors });
    return;
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
    default: {
      return state;
    }
  }
};

export default userPurchasesReducer;
