import { db } from '../model/firebase';

export const getActualUser = async (id) =>{
    return await db.collection("Users").doc(id).get()
    // return await db.collection("Users").get();

}