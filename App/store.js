import {createStore, combineReducers} from "redux"
import userReducer from "./reducers/userReducer"
import contactReducer from "./reducers/contactReducer"
const rootReducer = combineReducers({
    userRedux: userReducer,
    contactRedux: contactReducer
})

const configureStore = () => createStore(rootReducer)

export default configureStore
