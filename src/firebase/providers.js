import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() =>{
    try{
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        // console.log({credentials})
        const {displayName, email, photoURL, uid} = result.user;

        return{
            ok: true,
            displayName, email, photoURL, uid
        };
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
      
      return {
        ok: false,
        errorMessage

      }
    }
}

export const registerUserWithEMailPassword = async({email, password, displayName}) =>{
  try{

    console.log({email, password, displayName})

    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;
    //TODO: actualizar el displayname en firebase
    await updateProfile(resp.user, { displayName });
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }
  } catch( error ) {
    
    return{ ok: false, errorMessage: error.message }
  }
}

export const loginWithEmailPassword = async({email, password}) =>{
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    console.log(resp)
    const {displayName,uid,photoURL} = resp.user;
    return{
      ok: true,
      uid,
      displayName,
      photoURL,
      email

    }
  } catch (error) {
    return {
      ok: false, 
      errorMessage: error.message
    }
  }
}

export const logoutFireBase = async() =>{
  return await FirebaseAuth.signOut();
}


