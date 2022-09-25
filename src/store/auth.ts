import firebase from 'firebase/compat/app';

export default {
    actions: {
        async login({ dispatch, commit } : {dispatch: any; commit: any}, { email, password } : {email: string; password: string}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                throw e
            }
        }
    }
}