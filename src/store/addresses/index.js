import {
  REQUEST_ACTION,
  GET_ADDRESS_SUCCESS,
  CREATE_ADDRESS_SUCCESS,
  EDIT_ADDRESS_SUCCESS,
  DELETE_ADDRESS_SUCCESS,
 } from './actionTypes';
import axios from 'utils/http';

export const requestAction = () => ({
  type: REQUEST_ACTION,
});

export const getAddress = payload => ({
  type: GET_ADDRESS_SUCCESS,
  payload,
});

export const createAddress = payload => ({
  type: CREATE_ADDRESS_SUCCESS,
  payload,
});

export const editAddress = payload => ({
  type: EDIT_ADDRESS_SUCCESS,
  payload,
});

export const deleteAddress = payload => ({
  type: DELETE_ADDRESS_SUCCESS,
  payload,
});

export const getAddressAction = id => async dispatch => {
  dispatch(requestAction());
  try {
    const { data } = await axios.get(`/addresses?user=${id}`);
    dispatch(getAddress(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const createAddressAction = payload => async dispatch => {
  dispatch(requestAction());
  try {
    const { data } = await axios.post('/addresses', payload);
    dispatch(createAddress(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const editAddressAction = payload => async dispatch => {
  dispatch(requestAction());
  try {
    const data = await axios.patch('/addresses', payload);
    dispatch(editAddress(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAddressAction = () => async dispatch => {
  dispatch(requestAction());
  try {
    const data = await axios.delete('/addresses');
    dispatch(deleteAddress(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const initialState = {
  data: [],
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_ACTION:
      return {
        ...state,
        isLoading: true
      };
    case GET_ADDRESS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    case CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    case EDIT_ADDRESS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
      default:
        return state
  }
};

export default reducer;
