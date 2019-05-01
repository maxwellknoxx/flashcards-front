<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">{{ this.dictionaryModel.dictionaryName }}</a>
      </div>
    </nav>

    <div class="container">
      <form @submit.prevent="addExpression">
        <label>Expression</label>
        <input type="text" required v-model="expressionModel.expression">

        <label>Meaning</label>
        <input type="text" required v-model="expressionModel.meaning">

        <button class="waves-effect waves-light btn-small">
          Add expression
          <i class="material-icons left">check</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Expression</th>
            <th>Meaning</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="existingExpression in expressions" :key="existingExpression.id">
            <td>{{ existingExpression.expression }}</td>
            <td>{{ existingExpression.meaning }}</td>
            <td>
              <button
                @click="editExpression(existingExpression)"
                class="waves-effect btn-small blue darken-1"
              >
                <i class="material-icons">create</i>
              </button>
              <button
                @click="removeExpression(existingExpression)"
                class="waves-effect btn-small red darken-1"
              >
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Service from "../services/dictionaryExpressionService";

export default {
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
        dictionaryIdentityKey: this.$route.params.data,
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
      Service.findExpressionsByDictionaryId(this.idDictionary).then(response => {
        this.expressions = response.data.listData;
        console.log(this.expressions)
      });
    },

    findDictionaryById() {
      Service.findDictionaryById(this.idDictionary).then(response => {
        this.dictionaryModel = response.data.data;
      });
    },

    addExpression() {
      if (!this.expressionModel.id) {
        Service.addExpression(this.expressionModel)
          .then(response => {
            this.expressionModel = {};
            alert(response.data.message);
            this.findExpressionsByDictionaryId();
          })
          .catch(e => {
            console.log(e.response);
          });
      } else {
        Service.updateExpression(this.expressionModel).then(response => {
          this.expressionModel = {};
          alert(response.data.message);
          this.findExpressionsByDictionaryId();
        });
      }
    },

    removeExpression(expressionToRemove) {
      if (confirm("Would you like to delete this expression?")) {
        Service.removeExpression(expressionToRemove).then(response => {
          this.expressionModel = {};
          this.findExpressionsByDictionaryId();
        });
      }
    },

    editExpression(expressionToEdit) {
      this.expressionModel = expressionToEdit;
    },

    updateExpression(expressionToUpdate) {
      Service.updateExpression(expressionToUpdate).then(response => {
        this.expressionModel = {};
        alert(response.data.message);
        this.findExpressionsByDictionaryId();
      });
    }
  }
};
</script>

<style>
</style>