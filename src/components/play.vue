<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Playing {{ this.dictionaryModel.dictionaryName }}</a>
      </div>
    </nav>

    <table>
      <tbody>
        <tr v-for="existingExpression in expressions" :key="existingExpression.id">
          <vue-flashcard :front="existingExpression.expression" :back="existingExpression.meaning"></vue-flashcard>
          <div>
            <button @click="markExpressionAsHit(existingExpression)" class="waves-effect btn-small blue darken-1">Hit</button> 
            <div>
            {{ existingExpression.hits }}
            </div>
            <br/>
            
            <button @click="markExpressionAsFail(existingExpression)" class="waves-effect btn-small red darken-1">Fail</button>
            <div>
             {{ existingExpression.fails }}
            </div>
          </div>
          <hr>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Service from "../services/dictionaryExpressionService";
import vueFlashcard from "vue-flashcard";

export default {
  components: { vueFlashcard },

  data() {
    return {
      idDictionary: this.$route.params.data,
      dictionaryModel: {
        id: this.idDictionary,
        dictionaryName: "",
        failWords: "",
        hitWords: ""
      },
      expressionModel: {
        id: "",
        expression: "",
        meaning: "",
        dictionaryIdentityKey: "",
        hits: "",
        fails: ""
      },
      expressions: []
    };
  },

  created() {
    this.findExpressionsByDictionaryId();
    this.findDictionaryById();
  },

  methods: {
    findExpressionsByDictionaryId() {
      Service.findExpressionsByDictionaryId(this.idDictionary).then(
        response => {
          this.expressions = response.data.listData;
        }
      );
    },

    findDictionaryById() {
      Service.findDictionaryById(this.idDictionary).then(response => {
        this.dictionaryModel = response.data.data;
      });
    },

    markExpressionAsHit(expressionToHit) {
      Service.markExpressionAsHit(expressionToHit);
        window.location.reload();
    },

    markExpressionAsFail(expressionToFail) {
      Service.markExpressionAsFail(expressionToFail);
        window.location.reload();
    }
  }
};
</script>

<style>
</style>
