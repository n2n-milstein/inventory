<template>
  <v-layout justify-start align-start>
    <v-flex lg8 md9 xs12>
      <v-card
        light
        color="white"
        class="mb-4 py-3 px-4"
        v-for="(request, i) in pending"
        :key="i"
      >
        <v-layout wrap>
          <v-flex xs12 class="mb-1">
            <h4 class="date">
              {{ request.timing.dateOffered.toLocaleDateString() }}
            </h4>
          </v-flex>
          <v-flex xs6>
            <h2 class="f-class">{{ request.physical.class }}</h2>
            <h3 class="f-desc">
              {{ request.physical.material.toLowerCase() }}
              {{ request.physical.class.toLowerCase() }}
              {{ request.physical.set ? ", set" : "" }}
            </h3>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-flex v-on="on">
                  <v-icon
                    class="f-rating"
                    v-for="(i, index) in getRating(request)"
                    :key="index"
                    >star</v-icon
                  >
                  <!-- TODO: create way to handle half-stars -->
                  <v-icon
                    class="f-rating"
                    v-for="(i, index) in 5 - getRating(request)"
                    :key="index"
                    >star_border</v-icon
                  >
                </v-flex>
              </template>
              <span>Rating</span>
            </v-tooltip>
            <p hidden>{{ getRating(request) }}</p>
          </v-flex>
          <v-flex xs6>
            <p class="d-info">{{ request.donor.name }}</p>
            <p class="d-info">{{ request.donor.phone }}</p>
            <p class="d-info">{{ request.donor.email }}</p>
            <p class="d-info">{{ request.donor.address }}</p>
          </v-flex>
          <v-flex xs12 class="text-xs-center mt-2">
          <v-btn icon v-on:click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
          </v-btn>


          <v-slide-y-transition>
            <div class="text-xs-left">
            <v-card-text v-show="show">
              <v-text class="title">Images</v-text>
              <v-img height="150" width="150" src="https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg"></v-img>
              <p></p>
              <v-text class="title">Notes</v-text>
              <v-textarea outline readonly
                      name="input-7-4"
                      value="Default text"
              ></v-textarea>

            </v-card-text>
            </div>
          </v-slide-y-transition>
            <v-layout align-end justify-end>
              <v-flex xs4>
                <v-card-actions>
                  <v-btn flat color="green">Approve</v-btn>
                  <v-btn flat color="red">Reject</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-flex>
          </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { FClass, Material, Status, Furniture } from "@/data/Furniture";

@Component
export default class Approval extends Vue {
  show: boolean = false;
  pending: Furniture[] = [
    {
      donor: {
        name: "John Smith",
        phone: "(123) 124-2145",
        email: "js14@gmail.com",
        address: "124 Cornell St Ithaca, NY 14853",
        zone: "Cornell"
      },
      physical: {
        class: FClass.Chair,
        size: 5,
        material: Material.Wood,
        set: false,
        hasFrame: false,
        hasBoxSpring: false,
        numChairs: 0,
        heavy: false
      },
      timing: {
        urgent: false,
        pickupBy: new Date(2019, 6, 21),
        dateOffered: new Date(2019, 6, 1)
      },
      attributes: {
        originalOwner: true,
        smokeFree: true,
        petFree: false,
        donateToFriend: true,
        age: 2
      },
      status: Status.OnTruck,
      images: [{ url: "no" }],
      comments: "hi"
    },
    {
      donor: {
        name: "John Smith",
        phone: "(123) 124-2145",
        email: "js14@gmail.com",
        address: "124 Cornell St Ithaca, NY 14853",
        zone: "Cornell"
      },
      physical: {
        class: FClass.Chair,
        size: 5,
        material: Material.Wood,
        set: false,
        hasFrame: false,
        hasBoxSpring: false,
        numChairs: 0,
        heavy: false
      },
      timing: {
        urgent: false,
        pickupBy: new Date(2019, 6, 21),
        dateOffered: new Date(2019, 6, 1)
      },
      attributes: {
        originalOwner: true,
        smokeFree: true,
        petFree: false,
        donateToFriend: true,
        age: 2
      },
      status: Status.OnTruck,
      images: [{ url: "no" }],
      comments: "hi"
    }
  ];

  getRating(furn: Furniture) {
    const attributes = furn.attributes;
    let rating = 0;

    for (let attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        let value = attributes[attr];
        if (typeof value === "number") {
          if (value <= 3) rating += 1;
          // TODO: implement way to show handle half stars
          // else if (value <= 5) rating += 0.5;
        } else if (value) {
          rating += 1;
        }
      }
    }
    return rating;
  }
}
</script>

<style lang="scss" scoped>
.date {
  font-weight: normal;
}

.f-class {
  // font-size: 1.7rem;
}

.f-desc {
  font-weight: normal;
  margin-bottom: 0.5rem;
}

.f-rating {
  color: #000;
  font-size: 1.5rem;
}

.d-info {
  margin-bottom: 0;
}
</style>
