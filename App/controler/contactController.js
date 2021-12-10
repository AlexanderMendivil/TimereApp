import {db} from '../model/firebase';

export const getContacts = async (id) =>{
    return await db.collection("Contacts").where("userId", "==", id).get()
}