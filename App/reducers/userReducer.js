import { GET_USER } from "../actions/types";

const initialState = {
    userId: ""
}

const userReducer = (state = initialState, action) => {

    switch(action.type){
        case GET_USER:
            return {...state, 
            userId: action.data
        }
        
        default:
            return state
    }
}

export default userReducer