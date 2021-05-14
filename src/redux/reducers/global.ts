import { SET_USER_INFO } from '../types'

interface AppState {
  token: string,
  user: string,
  uid: number,
  admin_state: number
}

interface actionObj {
  type: string,
  [propName: string]: any;
}

const globalState: AppState = {
  token: "",
  user: "",
  uid: 0,
  admin_state: 1
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = globalState, action: actionObj = {type: ""})=>{
  switch(action.type) {
    case `${SET_USER_INFO}`: 
      const { payload } = action || {};
      const newState = Object.assign({}, state, payload);
      state = newState;
      return { ...state };
    default:
      return {...state}
  }
}
