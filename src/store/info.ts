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
        async updateInfo({dispatch, commit, getters}: {dispatch: any, commit: any, getters: any}, toUpdate :any) {
            try{
                const uid = await dispatch('getUid')
                const updateData = {...getters.info, ...toUpdate}
                await firebase.database().ref(`/users/${uid}/info`).update(toUpdate)
                commit('setInfo', updateData)
            }catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchInfo({dispatch, commit}: {dispatch: any, commit: any}) {
            try{
                const uid = await dispatch('getUid')
                const info = (await (firebase.database().ref(`/users/${uid}/info`).once('value'))).val()
                commit('setInfo', info )
            }catch(e) {
                commit('setError', e)
                throw e
            }

        }
    },
    getters: {
        info: (s :any) => s.info
    }
}
