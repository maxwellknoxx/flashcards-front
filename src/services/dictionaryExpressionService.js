import { http } from './config'

export default {

    findAllExpressions:() => {
        return http.get('expression/findAll')
    },

    addExpression:(expressionToAdd) => {
        return http.post('expression/addExpression', expressionToAdd)
    },

    removeExpression:(expressionToRemove) => {
        return http.post('expression/remove', expressionToRemove)
    },

    updateExpression:(expressionToUpdate) => {
        return http.put('expression/update', expressionToUpdate)
    },

    markExpressionAsHit:(expressionToHit) => {
        return http.post('expression/hit', expressionToHit)
    },

    markExpressionAsFail:(expressionToFail) => {
        return http.post('expression/fail', expressionToFail)
    },

    findAllDictionaries: () => {
        return http.get('dictionary/findAll')
    },

    findByDictionaryName: (dictionaryToFind) => {
        return http.get('dictionary/findByDicionaryName', dictionaryToFind)
    }, 

    addDictionary: (dictionaryToAdd) => {
        return http.post('dictionary/addDictionary', dictionaryToAdd)
    },

    updateDictionary: (dictionaryToUpdate) => {
        return http.put('dictionary/update', dictionaryToUpdate)
    },

    removeDictionary: (dictionaryToRemove) => {
        return http.post('dictionary/remove', dictionaryToRemove)
    },

    totalHitFail: () => {
        return http.get('dictionary/totalHitFail')
    },

    findExpressionsByDictionaryId: (id) => {
        return http.get('expression/findExpressionsByDictionaryId/' + id)
    },

    findDictionaryById: (id) => {
        return http.get('dictionary/findDictionaryById/' + id)
    }
    

}