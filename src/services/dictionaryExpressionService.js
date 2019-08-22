import { http } from './config'

export default {

    markExpressionAsHit: (expressionToHit) => {
        return http.post('v1/dictionaryExpression/hits', expressionToHit)
    },

    markExpressionAsFail: (expressionToFail) => {
        return http.post('v1/dictionaryExpression/fails', expressionToFail)
    }

}