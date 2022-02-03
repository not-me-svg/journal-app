import Swal from 'sweetalert2'
import { types } from "../types/types";
import { startLoading, finishLoading } from "./ui";
import { noteLogout } from './notes';
import { 
    auth,
    createUserWithEmailAndPassword,
    googleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "../firebase/firebase-config";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch( startLoading() );

        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch( login(user.uid, user.displayName) );

                dispatch( finishLoading() );
            }).catch(err => {
                console.log(err)
                dispatch( finishLoading() );
                Swal.fire('Error', err.message, 'error');
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch( login(user.uid, user.displayName) )
            }).catch(err => {
                console.log(err)
            })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await updateProfile(user, { displayName: name })

                dispatch( login(user.uid, user.displayName) )
            }).catch(err => {
                console.log(err)
                Swal.fire('Error', err.message, 'error');
            })
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogOut = () => {
    return async (dispatch) => {
        await signOut(auth);

        dispatch(logout());
        dispatch(noteLogout());
    }
}

export const logout = () => ({
    type: types.logout
})