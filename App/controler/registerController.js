import { auth, db } from '../model/firebase';

export const SignUp = (email, password) =>{
    return auth.createUserWithEmailAndPassword(email, password)
}

export const createUser = async (id, user) =>{
    await db.collection("Users").doc(id).set(user)
    
}