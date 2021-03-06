import { http } from './config'

export default {

    findExpressionsByDictionaryId: (id) => {
        return http.get('v1/expression/expressionsByDictionaryId/' + id)
    },

    addExpression: (expressionToAdd) => {
        return http.post('v1/expression/expressions', expressionToAdd)
    },

    removeExpression: (expressionToRemove) => {
        return http.delete('v1/expression/expressions/' + expressionToRemove)
    },

    updateExpression: (expressionToUpdate) => {
        return http.put('v1/expression/expressions', expressionToUpdate)
    }

}