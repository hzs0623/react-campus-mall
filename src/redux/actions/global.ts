import { Dispatch } from "redux";
import { SET_USER_INFO } from '../types';

const setUser = (payload: string | object) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: SET_USER_INFO, payload });
  };
};

export { setUser };
