import { http } from './config'

export default {

    findByDictionaryName: (dictionaryToFind) => {
        return http.get('v1/dictionary/findByDictionaryName', dictionaryToFind)
    }, 

    addDictionary: (dictionaryToAdd) => {
        return http.post('v1/dictionary/dictionaries', dictionaryToAdd)
    },

    updateDictionary: (dictionaryModel) => {
        return http.put('v1/dictionary/dictionaries', dictionaryModel)
    },

    removeDictionary: (dictionaryToRemove) => {
        return http.delete('v1/dictionary/dictionaries/' + dictionaryToRemove)
    },

    totalHitFail: () => {
        return http.get('v1/dictionary/totals')
    },

    findDictionaryById: (id) => {
        return http.get('v1/dictionary/dictionaries/' + id)
    },

    findAllDictionaryByUserId: (id) => {
        return http.get('v1/dictionary/dictionariesByUserId/' + id)
    }
    

}