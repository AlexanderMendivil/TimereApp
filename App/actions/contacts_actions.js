import {GET_CONTACTS} from "./types"

export const getContacts = (name, telefono) =>(
    {
        type: GET_CONTACTS,
        name: name,
        telefono: telefono
    }
)
