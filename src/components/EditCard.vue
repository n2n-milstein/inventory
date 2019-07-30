<template>
  <v-card>
    <v-card-title class="headline" primary-title>
      {{ isEdit ? "Edit" : "Add" }} Furniture {{ isEdit ? " - " + id : "" }}
    </v-card-title>

    <v-card-text>
      <!-- <v-container> -->
      <v-layout wrap>
        <v-flex xs12>
          <v-form ref="edit-form" v-model="valid" lazy-validation>
            <!-- Donor Info -->
            <h3>Donor Info</h3>

            <v-text-field
              v-model="donorName"
              label="Donor Name"
              :rules="required"
              required
            ></v-text-field>

            <v-text-field
              v-model="phone"
              label="Phone Number"
              :rules="required"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              label="Email"
              :rules="emailRules"
              required
            ></v-text-field>

            <v-text-field
              v-model="address"
              label="Address"
              :rules="required"
              required
            ></v-text-field>

            <v-text-field
              v-model="zone"
              label="Zone"
              :rules="required"
              required
            ></v-text-field>

            <v-divider class="my-3" />

            <!-- Physical Attributes -->
            <h3>Physical Attributes</h3>
            <v-select
              v-model="fclass"
              :items="classOptions"
              :rules="[v => !!v || 'Item is required']"
              label="Furniture Class"
              required
            ></v-select>

            <physical-attr :fclass="fclass"></physical-attr>

            <v-divider class="my-3" />

            <!-- Attributes -->
            <h3>Attributes</h3>

            <!-- Timing -->
            <h3>Timing</h3>

            <date-picker-menu
              label="Date Offered"
              @date="dateOffered = $event"
            ></date-picker-menu>

            <date-picker-menu
              label="Pickup By Date"
              @date="pickupBy = $event"
            ></date-picker-menu>

            <v-checkbox v-model="urgent" label="Urgent?"></v-checkbox>

            <conditional-date
              question="Has the pickup date been confirmed?"
              label="Confirmed Pickup Date"
              @date="confirmedPickupDate = $event"
            ></conditional-date>

            <conditional-date
              question="Has the furniture been collected?"
              label="Date Collected"
              @date="dateCollected = $event"
            ></conditional-date>

            <conditional-date
              question="Has the furniture been delivered?"
              label="Date Delivered"
              @date="dateDelivered = $event"
            ></conditional-date>

            <v-divider class="my-3" />
          </v-form>
        </v-flex>
      </v-layout>
      <!-- </v-container> -->
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary">CANCEL</v-btn>
      <v-btn flat color="primary">SAVE</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { FClass } from "@/data/Furniture";
import PhysicalAttr from "./EditCard/PhysicalAttr.vue";
import ConditionalDate from "./EditCard/ConditionalDate.vue";
import DatePickerMenu from "./EditCard/DatePickerMenu.vue";

@Component({
  components: {
    PhysicalAttr,
    ConditionalDate,
    DatePickerMenu
  }
})
export default class EditCard extends Vue {
  @Prop({ default: true })
  isEdit!: boolean;

  valid = true;
  required = [(v: any) => !!v || "This is required"];
  emailRules = [
    (v: any) => !!v || "This is required",
    (v: any) => /.+@.+/.test(v) || "E-mail must be valid"
  ];

  id = "";

  donorName = "";
  phone = "";
  email = "";
  address = "";
  zone = "";

  fclass = "";
  classOptions = Object.keys(FClass);
  // size = -1;
  // material = "";
  // materialAlt = "";
  // set = false;
  // hasFrame = false;
  // hasBoxSpring = false;
  // numChairs = -1;
  // heavy = false;

  dateOffered = new Date().toISOString().substr(0, 10);
  pickupBy = new Date().toISOString().substr(0, 10);
  urgent = false;
  confirmedPickupDate = "";
  dateCollected = "";
  dateDelivered = "";
}
</script>
