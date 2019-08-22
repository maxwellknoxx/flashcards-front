<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <router-link :to=" '/play/' + this.idDictionary  ">
          <a href="#" class="brand-logo center">Play {{ this.dictionaryModel.dictionaryName }}</a>
        </router-link>
      </div>
    </nav>
    <BR />
    <div class="container">
      <form @submit.prevent="addExpression">
        <label>Expression</label>
        <input type="text" required v-model="expressionModel.expression" />

        <label>Meaning</label>
        <input type="text" required v-model="expressionModel.meaning" />

        <button class="waves-effect waves-light btn-small" v-if="!isEditing">
          Add expression
          <i class="material-icons left">check</i>
        </button>
        <button class="waves-effect waves-light btn-small" v-if="isEditing">
          Update expression
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
import Service from "../services/expressionService";
import DictionaryService from "../services/dictionaryService";
import UserService from "../services/userService";

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
        dictionary: {
          id: this.$route.params.data
        },
        hits: "",
        fails: ""
      },
      expressions: [],
      isEditing: false
    };
  },

  created() {
    this.checkLogin();
  },

  mounted() {
    localStorage.setItem("dictionaryId", this.idDictionary);
    this.findDictionaryById();
    this.findExpressionsByDictionaryId();
  },

  methods: {
    checkLogin() {
      if (this.checkLocalStorage() === true) {
        UserService.isLogged(localStorage.getItem("id"))
          .then(response => {
            this.validateCheckedLogin(response);
          })
          .catch(e => {
            this.removeLocalStorage();
          });
      }
    },

    validateCheckedLogin(response) {
      if (response.data === true) {
        this.setLocalStorage();
      } else {
        this.removeLocalStorage();
      }
    },

    setLocalStorage() {
      this.$store.dispatch("login");
      this.$store.dispatch("setId", this.getLocalStorageId());
    },

    removeLocalStorage() {
      localStorage.removeItem("id");
      localStorage.removeItem("dictionaryId");
      this.$router.push("/login");
    },

    checkLocalStorage() {
      if (this.getLocalStorageId()) {
        return true;
      }
      return false;
    },

    getLocalStorageId() {
      return localStorage.getItem("id");
    },

    getLocalStorageDictionaryId() {
      return localStorage.getItem("dictionaryId");
    },

    findExpressionsByDictionaryId() {
      Service.findExpressionsByDictionaryId(
        this.getLocalStorageDictionaryId()
      ).then(response => {
        if (response.data !== false) {
          this.expressions = response.data;
        }
      });
    },

    findDictionaryById() {
      DictionaryService.findDictionaryById(
        this.getLocalStorageDictionaryId()
      ).then(response => {
        if (response.data !== false) {
          this.dictionaryModel = response.data;
        }
      });
    },

    addExpression() {
      if (this.isEditing !== true) {
        this.expressionModel.dictionary.id = this.getLocalStorageDictionaryId();
        Service.addExpression(this.expressionModel).then(response => {
          this.showAlert(
            "Expression " + this.expressionModel.expression + " has been added"
          );
          this.cleanFields();
          this.findExpressionsByDictionaryId();
        });
      } else {
        this.updateExpression(this.expressionModel);
        this.isEditing = false;
      }
    },

    updateExpression(expressionToUpdate) {
      Service.updateExpression(expressionToUpdate).then(response => {
        this.cleanFields();
        this.showAlert(
          "Expression " + expressionToUpdate.expression + " has been updated"
        );
        this.findExpressionsByDictionaryId();
      });
    },

    removeExpression(expressionToRemove) {
      if (confirm("Would you like to delete this expression?")) {
        Service.removeExpression(expressionToRemove.id).then(response => {
          this.validateRemoveExpressionResponse(response);
          this.findExpressionsByDictionaryId();
        });
      }
    },

    validateRemoveExpressionResponse(response) {
      if (response.data === true) {
        this.showAlert("The expression has been removed");
      } else {
        this.showAlert("Please, try again later");
      }
    },

    editExpression(expressionToEdit) {
      this.expressionModel.id = expressionToEdit.id;
      this.expressionModel.expression = expressionToEdit.expression;
      this.expressionModel.meaning = expressionToEdit.meaning;
      this.expressionModel.dictionary = {
        id: expressionToEdit.dictionaryId
      };
      this.expressionModel.hits = expressionToEdit.hits;
      this.expressionModel.fails = expressionToEdit.fails;
      this.isEditing = true;
    },

    cleanFields() {
      this.expressionModel.id = "";
      this.expressionModel.expression = "";
      this.expressionModel.meaning = "";
    },

    showAlert(msg) {
      alert(msg);
    }
  }
};
</script>