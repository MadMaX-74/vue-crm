import firebase from 'firebase/compat/app';

export default {
    actions: {
        async login({ dispatch, commit } : {dispatch: any; commit: any}, { email, password } : {email: string; password: string}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                commit('setError', e)                
                throw e
            }
        },
        async register({dispatch, commit} : {dispatch:any; commit: any}, {email, password, name} : {email:string; password:string; name:string}){
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 100000,
                    name
                })
            } catch (e) {
                commit('setError', e)               
                throw e
            }
        },
        getUid(){
          const user = firebase.auth().currentUser 
           return user ? user.uid : null
        },
        async logout({commit}:{commit :any}){
            await firebase.auth().signOut()
            commit('clearInfo')
        }
    }
}

function commit(arg0: string, e: unknown) {
    throw new Error('Function not implemented.');
}
