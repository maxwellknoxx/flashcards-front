import { http } from './config'

export default {

    markExpressionAsHit: (expressionToHit) => {
        return http.post('v1/dictionaryExpression/hit', expressionToHit)
    },

    markExpressionAsFail: (expressionToFail) => {
        return http.post('v1/dictionaryExpression/fail', expressionToFail)
    }

}