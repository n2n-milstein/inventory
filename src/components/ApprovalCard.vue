<template>
  <v-card light color="white" class="mb-4">
    <v-row class="pt-3 px-3">
      <v-col cols="12" class="pb-0">
        <h4 class="date">
          {{ request.timing.dateOffered.toDate().toLocaleDateString() }}
        </h4>
      </v-col>
      <v-col cols="6">
        <h2 class="f-class">
          {{ request.physical.class }}
        </h2>
        <h3 class="f-desc">
          {{ request.physical.material.toLowerCase() }}
          {{ request.physical.class.toLowerCase() }}
          {{ request.physical.set ? ", set" : "" }}
        </h3>
      </v-col>
      <v-col cols="6">
        <p class="d-info">
          {{ request.donor.name }}
        </p>
        <p class="d-info">
          {{ request.donor.phone }}
        </p>
        <p class="d-info">
          {{ request.donor.email }}
        </p>
        <p class="d-info">
          {{ request.donor.address }}
        </p>
      </v-col>
      <v-col cols="12" class="text-center mt-2">
        <v-btn block text @click="show = !show">
          <v-icon>
            {{ show ? "keyboard_arrow_up" : "keyboard_arrow_down" }}
          </v-icon>
        </v-btn>

        <v-slide-y-transition>
          <div v-show="show" class="text-left">
            <v-divider class="py-2" />
            <h3 class="pb-2">
              Attributes
            </h3>
            <v-row>
              <v-col cols="4">
                <div
                  class="f-attr f-pro d-flex"
                  v-for="attr in pros"
                  :key="attr.key"
                >
                  <v-icon class="f-attr-icon" left>
                    thumb_up
                  </v-icon>
                  {{ attr.pretty }}
                </div>
              </v-col>
              <v-col cols="4">
                <div
                  class="f-attr f-con d-flex"
                  v-for="attr in cons"
                  :key="attr.key"
                >
                  <v-icon class="f-attr-icon" left>
                    thumb_down
                  </v-icon>
                  {{ attr.pretty }}
                </div>
              </v-col>
            </v-row>

            <h3 class="pt-4 pb-2">
              Images
            </h3>

            <v-row class="flex-nowrap" style="overflow-x: scroll;">
              <div v-for="(image, i) in request.images" :key="i" class="mr-3">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-img
                      :src="image.url"
                      aspect-ratio="1"
                      width="10rem"
                      class="f-image"
                      v-on="on"
                    />
                  </template>
                  <span>{{ image.caption ? image.caption : "image" }}</span>
                </v-tooltip>
              </div>
            </v-row>
            <h3 class="pt-4 pb-2">
              Donor Comments
            </h3>
            <div class="f-comments py-2 px-3">
              {{ request.comments }}
            </div>
            <h3 class="pt-4 pb-2">
              Staff Notes
            </h3>
            <v-textarea
              :value="request.staffNotes"
              label="Staff Notes"
              auto-grow
              filled
              @change="updateNotes"
            />
          </div>
        </v-slide-y-transition>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer />
      <v-btn v-if="isPending" text color="red" @click="$emit('deny', request)">
        Deny
      </v-btn>
      <v-btn text color="green" @click="$emit('approve', request)">
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

  pros: { key: string; pretty: string }[] = [];

  cons: { key: string; pretty: string }[] = [];

  /**
   * Returns the "prettier" version of an attribute.
   * @param attr - a Furniture Attribute name (probably in camelCase)
   * @param status: whether you want the "positive" or "negative" version of the text
   * @returns a "prettier" representation of attribute `attr`
   */
  static prettyAttr(attr: string, status: boolean): string {
    let pretty = "";
    Object.keys(AttributesDict).forEach((key) => {
      if (key === attr) {
        pretty = status
          ? AttributesDict[key].prettyPos
          : AttributesDict[key].prettyNeg;
      }
    });
    return pretty !== "" ? pretty : "Invalid attribute";
  }

  /**
   * TODO: needs to be fixed. Attributes have changed.
   * Returns the rating of a piece of furniture.
   * @param furn - a given Furniture object
   * @returns the rating of the furniture `furn`
   */
  static getRating(furn: Furniture): number {
    const { attributes } = furn;
    const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
    let rating = 0;

    Object.keys(attributes).forEach((key) => {
      if (has.call(attributes, key)) {
        const value = attributes[key];
        if (value) rating += 1;
      }
    });

    return rating;
  }

  /**
   * Gets the pros of the given furniture and sets it to the local variable.
   * @param furn - a given Furniture object
   */
  genProsCons(furn: Furniture): void {
    const { attributes } = furn;
    const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
    const pros: { key: string; pretty: string }[] = [];
    const cons: { key: string; pretty: string }[] = [];

    Object.keys(attributes).forEach((key) => {
      if (has.call(attributes, key)) {
        const value = attributes[key];
        if (value)
          pros.push({ key, pretty: ApprovalCard.prettyAttr(key, true) });
        else cons.push({ key, pretty: ApprovalCard.prettyAttr(key, false) });
      }
    });

    this.pros = pros;
    this.cons = cons;
  }

  /**
   * Updates the furniture's `Staff Notes` field and emits `notes`.
   * @param notes - the notes that have been written
   */
  updateNotes(notes: string): void {
    this.request.staffNotes = notes;
    this.$emit("notes", this.request);
  }

  mounted(): void {
    this.genProsCons(this.request);
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

.f-attr {
  padding: 0.3rem 0.5rem;

  &.f-pro {
    color: green;
  }

  &.f-con {
    color: red;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
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
