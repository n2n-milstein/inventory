<template>
  <v-card light color="white" class="mb-4">
    <v-layout wrap class="pt-3 px-3">
      <v-flex xs12 class="mb-1">
        <h4 class="date">
          {{ request.timing.dateOffered.toDate().toLocaleDateString() }}
        </h4>
      </v-flex>
      <v-flex xs6>
        <h2 class="f-class">{{ request.physical.class }}</h2>
        <h3 class="f-desc">
          {{ request.physical.material.toLowerCase() }}
          {{ request.physical.class.toLowerCase() }}
          {{ request.physical.set ? ", set" : "" }}
        </h3>
      </v-flex>
      <v-flex xs6>
        <p class="d-info">{{ request.donor.name }}</p>
        <p class="d-info">{{ request.donor.phone }}</p>
        <p class="d-info">{{ request.donor.email }}</p>
        <p class="d-info">{{ request.donor.address }}</p>
      </v-flex>
      <v-flex xs12 class="text-xs-center mt-2">
        <v-btn @click="show = !show" block flat>
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
                  <v-icon class="f-attr-icon">
                    thumbs_up
                  </v-icon>
                  {{ prettyAttr(attr, true) }}
                </div>
              </v-flex>
              <v-flex xs4 class="f-cons">
                <div v-for="attr in cons" :key="attr">
                  <v-icon class="f-attr-icon">
                    thumbs_down
                  </v-icon>
                  {{ prettyAttr(attr, false) }}
                </div>
              </v-flex>
            </v-layout>

            <h3 class="pt-4 pb-2">Images</h3>
            <v-layout row style="overflow-x: scroll">
              <div v-for="(image, i) in request.images" :key="i" class="mr-3">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-img
                      :src="image.url"
                      v-on="on"
                      aspect-ratio="1"
                      width="10rem"
                      class="f-image"
                    ></v-img>
                  </template>
                  <span>{{ image.caption ? image.caption : "image" }}</span>
                </v-tooltip>
              </div>
            </v-layout>
            <h3 class="pt-4 pb-2">Donor Comments</h3>
            <div class="f-comments py-2 px-3">{{ request.comments }}</div>
            <h3 class="pt-4 pb-2">Staff Notes</h3>
            <v-textarea
              :value="request.staffNotes"
              @change="updateNotes"
              label="Staff Notes"
              auto-grow
              box
            ></v-textarea>
          </div>
        </v-slide-y-transition>
      </v-flex>
    </v-layout>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-if="isPending" @click="$emit('deny', request)" flat color="red"
        >Deny</v-btn
      >
      <v-btn @click="$emit('approve', request)" flat color="green">
        {{ isPending ? "Approve" : "Move to Pending" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { Furniture, AttributesDict } from "../data/Furniture";

@Component
export default class ApprovalCard extends Vue {
  @Prop()
  request!: Furniture;

  @Prop({ default: true })
  isPending!: boolean;

  show = false;

  pros: string[] = [];

  cons: string[] = [];

  /**
   * Returns the "prettier" version of an attribute.
   * @param attr - a Furniture Attribute name (probably in camelCase)
   * @param status: whether you want the "positive" or "negative" version of the text
   * @returns a "prettier" representation of attribute `attr`
   */
  prettyAttr(attr: string, status: boolean) {
    for (const key in AttributesDict) {
      if (key === attr) {
        if (status) {
          return AttributesDict[key].prettyPos;
        } else {
          return AttributesDict[key].prettyNeg;
        }
      }
    }
    return "Invalid attribute";
  }

  /**
   * TODO: needs to be fixed. Attributes have changed.
   * Returns the rating of a piece of furniture.
   * @param furn - a given Furniture object
   * @returns the rating of the furniture `furn`
   */
  getRating(furn: Furniture) {
    const { attributes } = furn;
    let rating = 0;

    for (const attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        const value = attributes[attr];
        if (value) rating += 1;
      }
    }
    return rating;
  }

  /**
   * Gets the pros of the given furniture and sets it to the local variable.
   * @param furn - a given Furniture object
   */
  genPros(furn: Furniture) {
    const { attributes } = furn;
    const pros = [];

    for (const attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        const value = attributes[attr];
        // TODO: remove/clean as we no longer have attributes that are numbers
        if (typeof value === "number" && value < 3) pros.push(attr);
        else if (typeof value === "boolean" && value) pros.push(attr);
      }
    }

    this.pros = pros;
  }

  /**
   * Gets the cons of the given furniture and sets it to the local variable.
   * @param furn - a given Furniture object
   */
  genCons(furn: Furniture) {
    const { attributes } = furn;
    const cons = [];

    for (const attr in attributes) {
      if (!this.pros.includes(attr)) cons.push(attr);
    }

    this.cons = cons;
  }

  /**
   * Updates the furniture's `Staff Notes` field and emits `notes`.
   * @param notes - the notes that have been written
   */
  updateNotes(notes: string) {
    this.request.staffNotes = notes;
    this.$emit("notes", this.request);
  }

  mounted() {
    this.genPros(this.request);
    this.genCons(this.request);
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

.f-attr-icon {
  font-size: 1.35rem;
  color: inherit;
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
