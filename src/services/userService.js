import { http } from './config'

export default {

    login:(user) => {
        return http.post('v1/user/login', user)
    },

    logout:(id) => {
        return http.get('v1/user/logout/' + id)
    },

    register: (userInformation) => {
        return http.post('v1/user/users', userInformation)
    },

    updatePassword: (userInformation) => {
        return http.put('v1/user/users', userInformation)
    },

    getUser: (userInformation) => {
        return http.post('v1/user/getUser', userInformation)
    },

    isLogged: (id) => {
        return http.get('v1/user/isLogged/' + id)
    },

    getUserById: (id) => {
        return http.get('v1/user/users/' + id)
    },

    validations: (userInformation) => {
        return http.post('v1/user/validations', userInformation)
    }

}