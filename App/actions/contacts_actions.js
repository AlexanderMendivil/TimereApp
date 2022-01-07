import {GET_CONTACTS, GET_CONTACTS_PHONE_NUMBERS, DELETE_CONTACTS_PHONE_NUMBERS, GET_CONTACT_ID} from "./types"

export const getContacts = (name, telefono) =>(
    {
        type: GET_CONTACTS,
        name: name,
        telefono: telefono
    }
)
export const getContactsId = (id) =>(
    {
        type: GET_CONTACT_ID,
        data: id
    }
)

export const getContactsPhoneNumbers = (phoneNumbers) => (

    {
        type: GET_CONTACTS_PHONE_NUMBERS,
        data: phoneNumbers
    }
    )
export const deleteContactsPhoneNumbers = (key) => (

    {
        type: DELETE_CONTACTS_PHONE_NUMBERS,
        key: key
    }
    )
