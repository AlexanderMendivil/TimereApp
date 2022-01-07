import { GET_USER } from "../actions/types";
import { USE_USER, GET_USER_IMAGE } from "../actions/types";

const initialState = {
    userId: "",
    user: {},
    userImage: null
}

const userReducer = (state = initialState, action) => {

    switch(action.type){
        case GET_USER:
            return {...state, 
            userId: action.data
        }
        case USE_USER:
            return {...state, 
            user: action.data
        }
        case GET_USER_IMAGE:
            return {...state, 
            userImage: action.data
        }
        
        default:
            return state
    }
}

export default userReducer