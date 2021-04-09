<template>
  <v-container class="fill-height no-overflow pt-0" fluid>
    <v-row justify="center" align="center">
      <v-col class="text-center text-md-left" lg="2" md="3" cols="12">
        <h2 class="head">Neighbor to Neighbor</h2>
        <p class="subhead">Inventory</p>
        <v-btn color="white" @click="checkUser()"> Sign in with Google </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as firebase from "firebase/app";
import "firebase/auth";

@Component({})
export default class Login extends Vue {
  checkUser(): void {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push({ name: "hello" });
      } else {
        Login.signIn();
      }
    });
  }

  static signIn(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then().catch();
  }
}
</script>

<style lang="scss" scoped>
.no-overflow {
  overflow: hidden;
}
</style>
