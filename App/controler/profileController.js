import { db, state_changed, auth } from '../model/firebase';

export const getActualUser = async (id) =>{
    return await db.collection("Users").doc(id).get()
    // return await db.collection("Users").get();

}

export const updateUser = async (id, user, email) =>{
    updateEmail = auth.currentUser
    updateEmail.updateEmail(email).then().catch((err)=>console.log(err))
    return await db.collection("Users").doc(id).update(user)
}

