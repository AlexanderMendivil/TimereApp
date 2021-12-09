import { GET_USER } from "../actions/types";
import { USE_USER } from "../actions/types";

const initialState = {
    userId: ""
}

const userReducer = (state = initialState, action) => {

    switch(action.type){
        case GET_USER:
            return {...state, 
            userId: action.data
        }
        case USE_USER:
            return{
                ...state, 
                userId: action.key
            }
        default:
            return state
    }
}

export default userReducer