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
        <input type="text" required v-model="dictionaryEntity.dictionaryName" />

        <button class="waves-effect waves-light btn-small" v-if="!isEditing">
          Add dictionary
          <i class="material-icons left">check</i>
        </button>
        <button class="waves-effect waves-light btn-small" v-if="isEditing">
          Update dictionary
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
import Service from "../services/dictionaryService";
import UserService from "../services/userService";

export default {
  data() {
    return {
      dictionaryEntity: {
        id: "",
        dictionaryName: "",
        failWords: "",
        hitWords: "",
        user: {
          id: localStorage.getItem("id")
        }
      },
      dictionaryModel: {
        id: "",
        dictionaryName: ""
      },
      dictionaries: [],
      isEditing: false
    };
  },

  created() {
    this.checkLogin();
  },

  mounted() {
    this.findDictionariesByUserId(localStorage.getItem("id"));
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

    findDictionariesByUserId() {
      Service.findDictionariesByUserId(this.getLocalStorageId()).then(
        response => {
          if (response.data !== false) {
            this.dictionaries = response.data;
          }
        }
      );
    },

    addDictionary() {
     if (!this.isEditing) {
        this.dictionaryEntity.user.id = this.getLocalStorageId();
        Service.addDictionary(this.dictionaryEntity).then(response => {
          this.dictionaryEntity.dictionaryName = "";
          this.showAlert(
            "Dictionary " + response.data.dictionaryName + " has been added"
          );
          this.findDictionariesByUserId();
        });
      } else {
        this.updateDictionary(this.dictionaryEntity);
      }
    },

    removeDictionary(DictionaryToRemove) {
      if (confirm("Would you like to delete this Dictionary?")) {
        Service.removeDictionary(DictionaryToRemove.id).then(response => {
          this.validateRemoveDictionaryResponse(response);
          this.findDictionariesByUserId();
        });
      }
    },

    validateRemoveDictionaryResponse(response) {
      if (response.data === true) {
        this.showAlert("The dictionary has been removed");
      } else {
        this.showAlert("Please, try again later");
      }
    },

    editDictionary(DictionaryToEdit) {
      this.parseDictionaryEntity(DictionaryToEdit);
      this.isEditing = true;
    },

    parseDictionaryEntity(dictionaryModel) {
      this.dictionaryEntity.id = dictionaryModel.id;
      this.dictionaryEntity.dictionaryName = dictionaryModel.dictionaryName;
      this.dictionaryEntity.failWords = dictionaryModel.failWords;
      this.dictionaryEntity.hitWords = dictionaryModel.hitWords;
      this.dictionaryEntity.user.id = dictionaryModel.idUser;
    },

    updateDictionary(dictionaryEntity) {
      Service.updateDictionary(dictionaryEntity).then(response => {
        this.validateUpdateDictionaryResponse(response);
      });
    },

    validateUpdateDictionaryResponse(response) {
      if (response.data) {
        this.isEditing = false;
        this.cleanField();
        this.showAlert("Dictionary has been updated!");
        this.findDictionariesByUserId();
      } else {
        this.showAlert("Please, try it again later");
      }
    },

    cleanField() {
      this.dictionaryEntity.id = "";
      this.dictionaryEntity.dictionaryName = "";
      this.dictionaryEntity.failWords = "";
      this.dictionaryEntity.hitWords = "";
    },

    showAlert(msg) {
      alert(msg);
    }
  }
};
</script>