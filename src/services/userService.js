import { http } from './config'

export default {

    login:(user) => {
        return http.post('user/login', user)
    },

    findAllDictionaryByUserId: (id) => {
        return http.get('userDictionary/findAllDictionaryByUserId/' + id)
    },

    register: (userInformation) => {
        return http.post('user/save', userInformation)
    },

    updateUser: (userInformation) => {
        return http.post('user/update', userInformation)
    }

}