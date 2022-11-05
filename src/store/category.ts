import firebase from 'firebase/compat/app';

interface  IStore{
    commit: any,
    dispatch: any
}
interface ICategory{
    title: string,
    limit: number
}
interface IDatabseCategory extends ICategory {
    id: string | null
}
interface IUpdateCategory extends ICategory {
    id: string
}

export default {
    actions: {
        async createCategory({commit, dispatch} :IStore, {title, limit} :ICategory) :Promise<IDatabseCategory>{
            try{
                const uid = await dispatch('getUid')
                const category  = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit})
                return {title, limit, id: category.key}
            } catch(e){
                commit('setError', e)
                throw e             
            }
        },
        async updateCategory({commit, dispatch} :IStore, {title, limit, id} :IUpdateCategory) :Promise<void>{
            try{
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
            } catch(e){
                commit('setError', e)
                throw e             
            }
        },
        async fetchCategory({commit, dispatch} :IStore){
            try{
                const uid = await dispatch('getUid')
                const categories  = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
                
                //First method to convet reject
                // const categ :any[] = []
                // Object.keys(categories).forEach(key => {
                //     categ.push({
                //         title: categories[key].title,
                //         limit: categories[key].limit,
                //         id: key                        
                //     })
                // }) 
                // return categ 
                
                //second method to convent reject
                return Object.keys(categories).map(key => ({...categories[key], id: key}))
            } catch(e){
                commit('setError', e)
                throw e             
            }
        },
    }
}