const LOAD_VEHICLES = "vehicles/loadVehicles";
// const ADD_VEHICLE = "vehicles/addVehicle";
// const DELETE_VEHILCE = "vehicles/deleteVehicle";

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

export const thunkLoadVehiclesForSell = () => async (dispatch) => {
  const response = await fetch("/api/cars");

  if (response.ok) {
    const data = await response.json();
    return dispatch(loadVehicles(data));
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
    default: {
      return state;
    }
  }
};

export default vehiclesReducer;
