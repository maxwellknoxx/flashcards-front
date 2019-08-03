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
    this.findAllDictionaryByUserId(localStorage.getItem("id"));
  },

  methods: {
    checkLogin() {
      UserService.isLogged(localStorage.getItem("id"))
        .then(response => {
          if (response.data) {
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

    findAllDictionaryByUserId() {
      Service.findAllDictionaryByUserId(localStorage.getItem("id")).then(
        response => {
          this.dictionaries = response.data;
        }
      );
    },

    addDictionary() {
      if (!this.isEditing) {
        Service.addDictionary(this.dictionaryEntity).then(response => {
          this.dictionaryEntity = {};
          alert("Dictionary " + response.data.dictionaryName + " has been added");
          this.findAllDictionaryByUserId();
        });
      } else {
        this.dictionaryModel.id = this.dictionaryEntity.id;
        this.dictionaryModel.dictionaryName = this.dictionaryEntity.dictionaryName;
        this.updateDictionary(this.dictionaryModel);
      }
    },

    removeDictionary(DictionaryToRemove) {
      if (confirm("Would you like to delete this Dictionary?")) {
        Service.removeDictionary(DictionaryToRemove.id).then(response => {
          alert(response.data);
          this.findAllDictionaryByUserId();
        });
      }
    },

    editDictionary(DictionaryToEdit) {
      this.dictionaryEntity = DictionaryToEdit;
      this.isEditing = true;
    },

    updateDictionary(dictionaryModel) {
      Service.updateDictionary(dictionaryModel).then(response => {
        if (response.data) {
          this.isEditing = false;
          this.dictionaryEntity = {};
          alert("Dictionary has been updated!");
          this.findAllDictionaryByUserId();
        } else {
          alert("Please, try it again");
        }
      });
    }
  }
};
</script>

<style>
</style>