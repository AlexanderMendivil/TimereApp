import { auth } from '../model/firebase';


export const SignUp = (email, password) =>{
    return auth.createUserWithEmailAndPassword(email, password)
}