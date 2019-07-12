<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="goTo(child.route)"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="goTo(item.route)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-0">
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
        ></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">N2N Inventory</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on">
            <v-avatar size="32px" tile>
              <img
                src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                alt="Vuetify"
              />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile
            v-for="(item, i) in profileItems"
            :key="i"
            @click="item.action"
          >
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import * as firebase from "firebase/app";
import "firebase/auth";

@Component
export default class Navigation extends Vue {
  dialog = false;
  drawer = null;
  profileItems = [
    { icon: "exit_to_app", text: "Sign Out", action: () => this.signOut() }
  ];
  items = [
    { icon: "home", text: "Home", route: "hello" },
    { icon: "view_list", text: "Inventory", route: "inventory" },
    // { icon: "check_circle", text: "Approval", route: "approval" },
    {
      icon: "keyboard_arrow_up",
      "icon-alt": "keyboard_arrow_down",
      text: "Approvals",
      model: false,
      children: [
        { icon: "check_circle", text: "Pending", route: "approval" },
        { icon: "cancel", text: "Rejected", route: "rejected" }
      ]
    },
    { icon: "settings", text: "Settings" },
    { icon: "chat_bubble", text: "Send feedback", route: "feedback" },
    { icon: "info", text: "About", route: "about" }
  ];
  @Prop({ default: "" })
  source!: string;

  goTo(route: string) {
    this.$router.push({ name: route });
  }

  signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signed out");
        this.$router.push({ path: "/" });
      });
  }
}
</script>
