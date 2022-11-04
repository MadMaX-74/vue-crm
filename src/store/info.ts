import firebase from "firebase/compat/app"

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state :any, info: any) {
            state.info = info
        },
        clearInfo(state: any){
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}: {dispatch: any, commit: any}) {
            try{
                const uid = await dispatch('getUid')
                const info = (await (firebase.database().ref(`/users/${uid}/info`).once('value'))).val()
                commit('setInfo', info )
            }catch(e) {
                console.warn(e);
                
            }
           
        }
    },
    getters: {
        info: (s :any) => s.info
    } 
}