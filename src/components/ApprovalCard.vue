<template>
  <v-card light color="white" class="mb-4">
    <v-layout wrap class="pt-3 px-3">
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
        <v-btn block flat @click="show = !show">
          <v-icon>{{
            show ? "keyboard_arrow_up" : "keyboard_arrow_down"
          }}</v-icon>
        </v-btn>

        <v-slide-y-transition>
          <div v-show="show" class="text-xs-left">
            <v-divider class="py-2" />
            <h3 class="pb-2">Attributes</h3>
            <v-layout row>
              <v-flex xs4 class="f-pros">
                <div v-for="attr in pros" :key="attr">
                  {{ attr }}
                </div>
              </v-flex>
              <v-flex xs4 class="f-cons">
                <div v-for="attr in cons" :key="attr">
                  {{ attr }}
                </div>
              </v-flex>
            </v-layout>

            <h3 class="pt-4 pb-2">Images</h3>
            <v-layout row style="overflow-x: scroll">
              <div v-for="(image, i) in request.images" :key="i" class="mr-3">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-img
                      aspect-ratio="1"
                      width="10rem"
                      :src="image.url"
                      v-on="on"
                      class="f-image"
                    ></v-img>
                  </template>
                  <span>{{ image.caption ? image.caption : "image" }}</span>
                </v-tooltip>
              </div>
            </v-layout>
            <h3 class="pt-4 pb-2">Notes</h3>
            <div class="f-comments py-2 px-3">
              {{ request.comments }}
            </div>
            <!-- <v-textarea
              solo
              readonly
              :value="request.comments"
            ></v-textarea> -->
          </div>
        </v-slide-y-transition>
      </v-flex>
    </v-layout>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="red">Deny</v-btn>
      <v-btn flat color="green">Approve</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { Furniture } from "../data/Furniture";

@Component
export default class ApprovalCard extends Vue {
  @Prop()
  request!: Furniture;
  show = false;
  pros: string[] = [];
  cons: string[] = [];

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

  genPros(furn: Furniture) {
    const attributes = furn.attributes;
    let pros = [];

    for (let attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        let value = attributes[attr];
        if (typeof value === "number" && value < 3) pros.push(attr);
        else if (typeof value === "boolean" && value) pros.push(attr);
      }
    }

    this.pros = pros;
  }

  mounted() {
    this.genPros(this.request);
    this.genCons(this.request);
  }

  genCons(furn: Furniture) {
    const attributes = furn.attributes;
    let cons = [];

    for (let attr in attributes) {
      if (!this.pros.includes(attr)) cons.push(attr);
    }

    this.cons = cons;
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

.f-pros {
  color: green;
}

.f-cons {
  color: red;
}

.f-image {
  border-radius: 5px;
}

.f-comments {
  border: 2px solid #ddd;
  border-radius: 5px;
  box-shadow: none;
}

.d-info {
  margin-bottom: 0;
}
</style>
