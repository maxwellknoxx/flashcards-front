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

    updatePassword: (userInformation) => {
        return http.post('user/updatePassword', userInformation)
    },

    getUser: (userInformation) => {
        return http.post('user/getUser', userInformation)
    },

    getUserByEmail: (userInformation) => {
        return http.post('user/getUserByEmail', userInformation)
    }

}