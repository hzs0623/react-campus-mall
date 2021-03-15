import { createStore } from "redux"

// 引入多个reducers函数，并用 combineReducers 进行合并
import reducers from './reducers';

const store = createStore(reducers);

export default store;