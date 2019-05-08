<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Dictionaries</a>
      </div>
    </nav>

    <div class="container">
      <form @submit.prevent="addDictionary">
        <label>Dictionary's name</label>
        <input type="text" required v-model="dictionaryModel.dictionaryName">

        <button class="waves-effect waves-light btn-small">
          Add dictionary
          <i class="material-icons left">check</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Dictionary's name</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="existingDictionary in dictionaries" :key="existingDictionary.id">
            <td>
              <router-link
                :to=" '/expressions/' + existingDictionary.id "
              >{{ existingDictionary.dictionaryName }}</router-link>
            </td>
            <td>
              <div></div>
              <button
                @click="editDictionary(existingDictionary)"
                class="waves-effect btn-small blue darken-1"
              >
                <i class="material-icons">create</i>
              </button>
              <button
                @click="removeDictionary(existingDictionary)"
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
import UserService from "../services/userService";

export default {
  data() {
    return {
      userId: this.$route.params.data,
      dictionaryModel: {
        id: "",
        dictionaryName: "",
        failWords: "",
        hitWords: "",
        idUser: ""
      },
      dictionaries: []
    };
  },

  mounted() {
    this.findAllDictionaryByUserId();
  },

  methods: {

    findAllDictionaryByUserId() {
      UserService.findAllDictionaryByUserId(this.userId).then(response => {
        this.dictionaries = response.data.listData;
      })
    },

    addDictionary() {
      this.dictionaryModel.idUser = this.userId;
      if (!this.dictionaryModel.id) {
        Service.addDictionary(this.dictionaryModel)
          .then(response => {
            this.dictionaryModel = {};
            alert(response.data.message);
            this.findAllDictionaries();
          })
          .catch(e => {
            console.log(e.response);
          });
      } else {
        this.updateDictionary(this.dictionaryModel);
      }
    },

    removeDictionary(DictionaryToRemove) {
      if (confirm("Would you like to delete this Dictionary?")) {
        Service.removeDictionary(DictionaryToRemove);
          this.dictionaryModel = {};
          this.findAllDictionaries();
      }
    },

    editDictionary(DictionaryToEdit) {
      this.dictionaryModel = DictionaryToEdit;
    },

    updateDictionary(DictionaryToUpdate) {
      Service.updateDictionary(DictionaryToUpdate).then(response => {
        this.dictionaryModel = {};
        alert(response.data.message);
        this.findAllDictionaries();
      });
    }
  }
};
</script>

<style>
</style>