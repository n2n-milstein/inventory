<template>
  <v-card>
    <v-card-title
      class="headline ease-transition pb-4"
      :class="{
        'elevation-3': offsetTop > 0,
        'no-line': offsetTop > 0,
        'elevation-0': offsetTop === 0,
        line: offsetTop === 0,
      }"
      primary-title
    >
      {{ isEdit ? "Edit" : "View" }} Furniture
    </v-card-title>

    <v-card-text id="scroll-target" class="pa-0">
      <v-container>
        <v-row v-scroll:#scroll-target="onScroll" class="px-4">
          <v-col cols="12">
            <v-form ref="edit-form" v-model="valid" lazy-validation>
              <!-- Donor Info -->
              <h2>Donor Info</h2>

              <!-- TODO: make these just normal text when in readonly -->
              <v-text-field
                v-model="donorName"
                :rules="required"
                label="Donor Name"
                required
                prepend-icon="person"
                :readonly="!isEdit"
              />

              <v-text-field
                v-model="phone"
                :rules="required"
                label="Phone Number"
                required
                prepend-icon="phone"
                :readonly="!isEdit"
              />

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                required
                prepend-icon="email"
                :readonly="!isEdit"
              />

              <v-text-field
                v-model="address"
                :rules="required"
                label="Address"
                required
                prepend-icon="location_on"
                :readonly="!isEdit"
              />

              <v-text-field
                v-model="zone"
                :rules="required"
                label="Zone"
                required
                :readonly="!isEdit"
              />

              <v-divider class="my-3" />

              <!-- Physical Attributes -->
              <h2>Physical Attributes</h2>

              <h3 v-if="!fclass">
                Select a furniture class
              </h3>

              <v-select
                v-model="fclass"
                :items="classOptions"
                :rules="[(v) => !!v || 'Item is required']"
                label="Furniture Class"
                required
                prepend-icon="category"
                :readonly="!isEdit"
              />

              <physical-attr
                v-model="physical"
                :fclass="fclass"
                :readonly="!isEdit"
              />

              <v-divider class="my-3" />

              <!-- Attributes -->
              <h2>Attributes</h2>

              <attribute-question
                v-for="attr in attributes"
                :key="attr"
                :attribute="attr"
                @answer="updateAttr(attr, $event)"
                :readonly="!isEdit"
              />

              <v-divider class="my-3" />

              <!-- Timing -->
              <h2>Timing</h2>

              <date-picker-menu
                label="Date Offered"
                @date="dateOffered = $event"
                spacing="pb-3"
                :readonly="!isEdit"
              />

              <date-picker-menu
                label="Pickup By Date"
                @date="pickupBy = $event"
                spacing="pb-3"
                :readonly="!isEdit"
              />

              <v-checkbox
                v-model="urgent"
                label="Urgent?"
                hide-details
                :readonly="!isEdit"
              />

              <conditional-date
                question="Has the pickup date been confirmed?"
                label="Confirmed Pickup Date"
                @date="confirmedPickupDate = $event"
                :readonly="!isEdit"
              />

              <conditional-date
                question="Has the furniture been collected?"
                label="Date Collected"
                @date="dateCollected = $event"
                :readonly="!isEdit"
              />

              <conditional-date
                question="Has the furniture been delivered?"
                label="Date Delivered"
                @date="dateDelivered = $event"
                class="pb-3"
                :readonly="!isEdit"
              />

              <v-divider class="my-3" />

              <h2>Images</h2>
              <!-- TODO: think of some way to host images -->
              <p>Feature in development...</p>

              <v-divider class="my-3" />

              <h2>Comments</h2>
              <v-textarea
                v-model="comments"
                label="Comments"
                auto-grow
                filled
                readonly
              />

              <div v-if="isStaff">
                <h2>Staff Notes</h2>
                <v-textarea
                  v-model="staffNotes"
                  label="Staff Notes"
                  auto-grow
                  filled
                  :readonly="!isEdit"
                />
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
      <v-divider />
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn text color="primary" @click="$emit('cancel')">
        CANCEL
      </v-btn>
      <v-btn text color="primary">
        SAVE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
// data
import { AttributesDict, Furniture } from "@/data/Furniture";
import Physical, { FClass } from "@/data/furniture/Physical";
// components
import PhysicalAttr from "./EditCard/PhysicalAttr.vue";
import ConditionalDate from "./EditCard/ConditionalDate.vue";
import DatePickerMenu from "./EditCard/DatePickerMenu.vue";
import AttributeQuestion from "./EditCard/AttributeQuestion.vue";

const namespace = "inventory";

@Component({
  components: {
    PhysicalAttr,
    ConditionalDate,
    DatePickerMenu,
    AttributeQuestion,
  },
  computed: mapGetters(namespace, { current: "getCurrent" }),
  methods: mapActions(namespace, ["updateCurrent"]),
})
export default class EditCard extends Vue {
  current!: Furniture;

  updateCurrent!: ({ updates }: { updates: Partial<Furniture> }) => void;

  @Prop({ default: true })
  readonly isEdit!: boolean;

  @Prop({ default: true })
  readonly isStaff!: boolean;

  offsetTop = 0;

  onScroll(e: any): void {
    this.offsetTop = e.target.scrollTop;
  }

  valid = true;

  // TODO: consider factoring out validation rules that are reused across the application
  readonly required = [(v: any): boolean | string => !!v || "This is required"];

  readonly emailRules = [
    (v: any): boolean | string => !!v || "This is required",
    (v: any): boolean | string => /.+@.+/.test(v) || "E-mail must be valid",
  ];

  id = "";

  get donorName(): string {
    return this.current.donor.name;
  }

  get phone(): string {
    return this.current.donor.phone;
  }

  get email(): string {
    return this.current.donor.email;
  }

  get address(): string {
    return this.current.donor.address;
  }

  get zone(): string {
    return this.current.donor.zone;
  }

  get fclass(): string {
    return this.current.physical.class;
  }

  readonly classOptions = Object.keys(FClass);

  get physical(): Physical {
    return this.current.physical;
  }

  dateOffered = new Date().toISOString().substr(0, 10);

  pickupBy = new Date().toISOString().substr(0, 10);

  urgent = false;

  confirmedPickupDate = "";

  dateCollected = "";

  dateDelivered = "";

  readonly attributes = Object.keys(AttributesDict);

  partsIntact = false;

  finishIntact = false;

  smokeFree = false;

  petFree = false;

  bedbugFree = false;

  mildewFree = false;

  donateToFriend = false;

  comments = "";

  staffNotes = "";

  updateAttr(attr: string, value: boolean): void {
    switch (attr) {
      case "partsIntact":
        this.partsIntact = value;
        break;
      case "finishIntact":
        this.finishIntact = value;
        break;
      case "smokeFree":
        this.smokeFree = value;
        break;
      case "petFree":
        this.petFree = value;
        break;
      case "bedbugFree":
        this.bedbugFree = value;
        break;
      case "mildewFree":
        this.mildewFree = value;
        break;
      case "donateToFriend":
        this.donateToFriend = value;
        break;
      default:
        break;
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  padding-top: 1rem;
  padding-bottom: 1.5rem;

  &:first-of-type {
    padding-top: 0;
  }
}

.ease-transition {
  z-index: 1;
  transition: box-shadow ease-in-out 0.1s;
}

.line {
  border-bottom: 1px solid lightgray;
}

.no-line {
  border-bottom: none;
}
</style>
