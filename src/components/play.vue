<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Playing {{ this.dictionaryModel.dictionaryName }}</a>
      </div>
    </nav>

    <hooper style="height: 400px" :itemsToShow="1" :centerMode="true">
      <slide v-for="existingExpression in expressions" :key="existingExpression.id">
        <div id="card" class="VueCarousel-slide">
          <vue-flashcard :front="existingExpression.expression" :back="existingExpression.meaning"></vue-flashcard>
          <div id="buttons">
            <button
              @click="markExpressionAsHit(existingExpression)"
              class="waves-effect btn-small blue darken-1"
            >Hit</button>
            {{ existingExpression.hits }}
            <button
              @click="markExpressionAsFail(existingExpression)"
              class="waves-effect btn-small red darken-1"
            >Fail</button>
            {{ existingExpression.fails }}
          </div>
        </div>
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
    </hooper>
  </div>
</template>

<script>
import Service from "../services/dictionaryExpressionService";
import vueFlashcard from "vue-flashcard";
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";

export default {
  components: {
    vueFlashcard,
    Hooper,
    Slide,
    HooperNavigation
  },

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
.VueCarousel-slide {
  position: relative;
  background: #42b983;
  color: #fff;
  font-family: Arial;
  font-size: 24px;
  text-align: center;
  min-height: 100px;
}

.label {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>