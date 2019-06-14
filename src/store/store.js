import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        id: "", // id user
        isLogged: false
    },

    getters: {
        // Check if user is logged
        happyStaff: state => {
            return state.isLogged
        }
    },

    mutations: {

        login(state) {
            state.isLogged = true
        },

        logout(state) {
            state.isLogged = false
        },

        setId(state, value) {
            state.id = value
        }

    },

    actions: {

        login(context) {
            context.commit('login')
        },

        logout(context) {
            context.commit('logout')
        },

        setId(context, value) {
            context.commit('setId', value)
        }

    }
});