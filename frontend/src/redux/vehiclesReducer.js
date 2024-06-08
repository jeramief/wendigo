const LOAD_VEHICLES = "vehicles/loadVehicles";
// const ADD_VEHICLE = "vehicles/addVehicle";
// const DELETE_VEHILCE = "vehicles/deleteVehicle";
const CLEAR_VEHICLES = "vehicles/clearVehicles";

const loadVehicles = (vehicles) => ({
  type: LOAD_VEHICLES,
  vehicles,
});
// const addVehicle = (vehicle) => ({
//   type: ADD_VEHICLE,
//   vehicle,
// });
// const deleteVehicle = (vehicleId) => ({
//   type: DELETE_VEHILCE,
//   vehicleId,
// });
export const clearVehicles = () => ({
  type: CLEAR_VEHICLES,
});

export const thunkLoadVehiclesForSell = () => async (dispatch) => {
  const response = await fetch("/api/cars");

  if (response.ok) {
    const data = await response.json();
    const vehicles = dispatch(loadVehicles(data));
    console.log({ vehicles });
    return vehicles;
  } else {
    const errors = await response.json();
    console.log({ errors });
    return errors;
  }
};
export const thunkLoadVehiclesBySearch = (query) => async (dispatch) => {
  dispatch(clearVehicles());

  const response = await fetch(`/api/cars/search/${query}`);

  if (response.ok) {
    const data = await response.json();
    const vehicles = dispatch(loadVehicles(data));
    console.log({ vehicles });
    return vehicles;
  } else {
    const errors = await response.json();
    console.log({ errors });
    return errors;
  }
};
export const thunkLoadVehicleById = (vehicleId) => async (dispatch) => {
  const response = await fetch(`/api/cars/${vehicleId}`);

  if (response.ok) {
    const vehicle = await response.json();
    dispatch(loadVehicles([vehicle]));
  } else {
    const errors = await response.json();
    console.log(errors);
    return errors;
  }
};

const initialState = {};

const vehiclesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_VEHICLES: {
      const newState = { ...state };
      action.vehicles.forEach((vehicle) => {
        newState[vehicle.id] = vehicle;
      });
      return newState;
    }
    case CLEAR_VEHICLES: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default vehiclesReducer;
