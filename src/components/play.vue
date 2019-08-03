<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Playing {{ this.dictionaryModel.dictionaryName }}</a>
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
        dictionary: {
          id: this.$route.params.data
        },
        hits: "",
        fails: ""
      },
      expressions: []
    };
  },

  created() {
    this.checkLogin();
  },

  mounted() {
    this.findDictionaryById();
    this.findExpressionsByDictionaryId();
  },

  methods: {
    checkLogin() {
      UserService.isLogged(localStorage.getItem("id"))
        .then(response => {
          if (response.data.status) {
            this.$store.dispatch("login");
            this.$store.dispatch("setId", localStorage.getItem("id"));
          }
        })
        .catch(e => {
          localStorage.removeItem("id");
          localStorage.removeItem("dictionaryId");
          this.$router.push("/login");
        });
    },

    findExpressionsByDictionaryId() {
      ExpressionService.findExpressionsByDictionaryId(this.idDictionary).then(
        response => {
          this.expressions = response.data;
        }
      );
    },

    findDictionaryById() {
      DictionaryService.findDictionaryById(this.idDictionary).then(response => {
        this.dictionaryModel = response.data;
      });
    },

    setExpressions() {
      this.expressions = this.currentExpressions;
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
