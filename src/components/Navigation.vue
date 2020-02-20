<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      :clipped="$vuetify.breakpoint.lgAndUp"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>

          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              @click="goTo(child.route)"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" @click="goTo(item.route)">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="blue"
      app
      dark
      fixed
      :clipped-left="$vuetify.breakpoint.lgAndUp"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer />
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
          <v-list-item
            v-for="(item, i) in profileItems"
            :key="i"
            @click="item.action"
          >
            <v-icon class="mr-2">
              {{ item.icon }}
            </v-icon>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
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
    { icon: "exit_to_app", text: "Sign Out", action: () => this.signOut() },
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
        { icon: "cancel", text: "Rejected", route: "rejected" },
      ],
    },
    { icon: "settings", text: "Settings" },
    { icon: "chat_bubble", text: "Send feedback", route: "feedback" },
    { icon: "info", text: "About", route: "about" },
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
        this.$router.push({ path: "/" });
      });
  }
}
</script>
