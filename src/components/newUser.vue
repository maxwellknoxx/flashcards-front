<template>
    <div id="app">
        <div class="centerForm">
            <form>
                <label> User Name: </label>
                {{  userInformation.userName }}
                <input type="text" required v-model="userInformation.userName">
                <label> Password: </label>
                {{ userInformation.password }}
                <input type="password" required v-model="userInformation.password">
            </form>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            userInformation: {
                userName: "",
                password: ""
            }
        }
    }
    
}
</script>

<style>
.centerForm {
  margin: auto;
  width: 50%;
  border: 3px solid pink;
  padding: 10px;
}
</style>


