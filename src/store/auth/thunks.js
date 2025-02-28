import { loginWithEmailPassword, logoutFireBase, registerUserWithEMailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication = (email, password) => {
    return async (dispatch) =>{
        dispatch(checkingCredentials());
        
    }
}

export const startGoogleSignIn = () =>{
    return async (dispatch) =>{
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        console.log({result})
        
        if( !result.ok) return dispatch( logout(result.errorMessage));

        dispatch( login(result) )
    }
}



export const starCreatingUserWithEmailPassword  = ({email, password, displayName}) =>{
    return async (dispatch) =>{
        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage} = await registerUserWithEMailPassword({email, password, displayName});

        if( !ok ) return dispatch(logout({errorMessage}));

        dispatch( login({uid, displayName, email, photoURL}));
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async (dispatch) =>{
        dispatch(checkingCredentials());
        const { ok, displayName,  photoURL, uid, errorMessage} = await loginWithEmailPassword({email, password});
        if( !ok ) return dispatch( logout({errorMessage}) );
        dispatch( login({email, password}))
    }
}

export const startLogout = () => {
    return async(dispatch) =>{
       await logoutFireBase();
       dispatch( clearNotesLogout())
       dispatch(logout({}));
    }
}