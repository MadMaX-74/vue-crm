import firebase from 'firebase/compat/app';

interface  IStore{
    commit: any,
    dispatch: any
}

export default {
    actions: {
        async createRecord({dispatch, commit} :IStore, record :any) {
            try {
                const uid = await dispatch('getUid')
                return await firebase.database().ref(`/users/${uid}/records`).push(record)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}
