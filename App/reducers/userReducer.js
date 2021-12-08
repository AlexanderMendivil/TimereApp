import { GET_USER } from "../actions/types";

const initialState = {
    userId: ""
}

const userReducer = (state = initialState, GET_USER) => {

    switch(action.type){
        case GET_USER:
            return {...state, 
            userId: state.userId
        }
        default:
            return state
    }
}

export default userReducer