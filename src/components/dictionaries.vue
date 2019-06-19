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

  created() {
    this.checkLogin();
  },

  mounted() {
    this.findAllDictionaryByUserId(localStorage.getItem("id"));
  },

  methods: {
    checkLogin() {
      UserService.isLogged(localStorage.getItem("id")).then(response => {
        if (response.data.status) {
          this.$store.dispatch("login");
          this.$store.dispatch("setId", localStorage.getItem("id"));
        }
      }).catch(e => {
          localStorage.removeItem("id");
          this.$router.push("/login");
      });
    },

    findAllDictionaryByUserId() {
      UserService.findAllDictionaryByUserId(localStorage.getItem("id")).then(response => {
        this.dictionaries = response.data.listData;
      });
    },

    addDictionary() {
      this.dictionaryModel.idUser = localStorage.getItem("id");
      if (!this.dictionaryModel.id) {
        Service.addDictionary(this.dictionaryModel).then(response => {
          this.dictionaryModel = {};
          alert(response.data.message);
          this.findAllDictionaryByUserId();
        });
      } else {
        this.updateDictionary(this.dictionaryModel);
      }
    },

    removeDictionary(DictionaryToRemove) {
      if (confirm("Would you like to delete this Dictionary?")) {
        Service.removeDictionary(DictionaryToRemove).then(response => {
          alert(response.data.message);
          this.findAllDictionaryByUserId();
        });
      }
    },

    editDictionary(DictionaryToEdit) {
      this.dictionaryModel = DictionaryToEdit;
    },

    updateDictionary(DictionaryToUpdate) {
      Service.updateDictionary(DictionaryToUpdate).then(response => {
        this.dictionaryModel = {};
        alert(response.data.message);
        this.findAllDictionaryByUserId();
      });
    }
  }
};
</script>

<style>
</style>