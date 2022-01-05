import { GET_CONTACTS, DELETE_CONTACT, GET_CONTACTS_PHONE_NUMBERS, DELETE_CONTACTS_PHONE_NUMBERS } from "../actions/types";
import { v4 as uuidv4 } from "uuid"

const initialState = {
    contactsList: [],
    contactsPhone: null,
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

        case GET_CONTACTS_PHONE_NUMBERS:
            return{...state, 
                    contactsPhone: action.data 
            };

        case DELETE_CONTACTS_PHONE_NUMBERS:
            return{...state.contactsPhone, 
                    contactsPhone: state.contactsPhone.filter((item)=>
                    item.key != key
                )
            }
        default:
            return state
    }
}

export default contactReducer