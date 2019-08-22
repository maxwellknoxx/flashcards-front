<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <router-link to="/home">
          <a href="#" class="brand-logo center">Home</a>
        </router-link>
      </div>
    </nav>

    <hooper style="height: 400px" :itemsToShow="1" :centerMode="true" :infiniteScroll="true">
      <slide v-for="existingExpression in expressions" :key="existingExpression.id">
        <div id="card" class="VueCarousel-slide">
          <vue-flashcard :front="existingExpression.expression" :back="existingExpression.meaning"></vue-flashcard>
          <div id="buttons">
            <button
              @click="markExpressionAsHit(existingExpression)"
              class="waves-effect btn-small blue darken-1"
            >Hit</button>
            <span class="marks">{{ existingExpression.hits }}</span>

            <button
              @click="markExpressionAsFail(existingExpression)"
              class="waves-effect btn-small red darken-1"
            >Fail</button>
            <span class="marks">{{ existingExpression.fails }}</span>
          </div>
        </div>
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
    </hooper>
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">You are practicing English/Portuguese</a>
      </div>
    </nav>
  </div>
</template>

<script>
import Service from "../services/dictionaryExpressionService";
import ExpressionService from "../services/expressionService";
import DictionaryService from "../services/dictionaryService";
import UserService from "../services/userService";
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
      dictionaryId: "121",
      expressionModel: {
        id: "",
        expression: "",
        meaning: "",
        dictionary: {
          id: "121"
        },
        hits: "",
        fails: ""
      },
      expressions: []
    };
  },

  mounted() {
    this.findExpressionsByDictionaryId();
  },

  methods: {
    findExpressionsByDictionaryId() {
      ExpressionService.findExpressionsByDictionaryId(this.dictionaryId).then(
        response => {
          if (response.data !== false) {
            this.expressions = response.data;
          }
        }
      );
    },

    markExpressionAsHit(expressionToHit) {
      this.prepareExpression(expressionToHit);
      Service.markExpressionAsHit(this.expressionModel).then(response => {
        alert(response.data);
      });
    },

    markExpressionAsFail(expressionToFail) {
      this.prepareExpression(expressionToFail);
      Service.markExpressionAsFail(this.expressionModel).then(response => {
        alert(response.data);
      });
    },

    prepareExpression(expressionToPrepare) {
      this.expressionModel.id = expressionToPrepare.id;
      this.expressionModel.expression = expressionToPrepare.expression;
      this.expressionModel.meaning = expressionToPrepare.meaning;
      this.expressionModel.dictionary = {
        id: expressionToPrepare.dictionaryId
      };
      this.expressionModel.hits = expressionToPrepare.hits;
      this.expressionModel.fails = expressionToPrepare.fails;
    }
  }
};
</script>

<style>
.VueCarousel-slide {
  position: relative;
  background: white;
  color: #fff;
  font-family: Arial;
  font-size: 24px;
  text-align: center;
  min-height: 100px;
}

.marks {
  color: black;
  margin-left: 3px;
  margin-right: 3px;
}
</style>
