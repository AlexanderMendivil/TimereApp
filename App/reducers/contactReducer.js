import { GET_CONTACTS } from "../actions/types";
import { DELETE_CONTACT } from "../actions/types";
import { v4 as uuidv4 } from "uuid"

const initialState = {
    contactsList: []
}

const contactReducer = (state = initialState, action) => {

    switch(action.type){
        case GET_CONTACTS:
            return {...state, 
            contactsList: state.contactsList.concat({
                key:uuidv4(),
                name:action.name,
                telefono:action.telefono
            })
        }
        case DELETE_CONTACT:
            return {
                ...state,
                contactList: state.contactsList.filter((item) =>
                  item.key !== action.key)
              };
        default:
            return state
    }
}

export default contactReducer