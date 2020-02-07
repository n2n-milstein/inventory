<template>
  <v-container fluid>
    <v-layout justify-center align-center fill-height>
      <v-flex text-xs-center text-md-left lg2 md3 xs12>
        <h2 class="head">Neighbor to Neighbor</h2>
        <p class="subhead">Inventory</p>
        <v-btn @click="checkUser()" color="white">Sign in with Google</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as firebase from "firebase/app";
import "firebase/auth";

@Component({})
export default class Login extends Vue {
  checkUser() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push({ name: "hello" });
      } else {
        Login.signIn();
      }
    });
  }

  static signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase
      .auth()
      .getRedirectResult()
      .then(() => {
        console.log("redirecting...");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>

<style lang="scss" scoped></style>
