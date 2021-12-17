import {db} from '../model/firebase';

export const getContacts = async (id) => {
    return await db.collection("Contacts").where("id", "==", id).get()
}

export const createContacts = async (contact) => {
    await db.collection("Contacts").add(contact)
}

export const uploadContact = async (id, contact) => {
    return await db.collection("Contacts").where("id", "==", id).update(contact)
}