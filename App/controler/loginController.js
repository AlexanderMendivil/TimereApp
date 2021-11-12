import { auth } from '../model/firebase';

export const logIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
    
}