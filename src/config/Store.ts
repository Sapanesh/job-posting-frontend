import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "../reducer/AuthReducer";

const reducers = combineReducers({
    userLogin: userLoginReducer,
})

const initialState = {}

const middleware = [thunk]

const store = legacy_createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;

export type RootState = ReturnType<typeof store.getState>