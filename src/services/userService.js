import { http } from './config'

export default {

    login:(user) => {
        return http.post('user/login', user)
    },

    findAllDictionaryByUserId: (id) => {
        return http.get('userDictionary/findAllDictionaryByUserId/' + id)
    }

}