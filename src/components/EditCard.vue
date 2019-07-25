<template>
  <v-card>
    <v-card-title class="headline" primary-title>
      {{ isEdit ? "Edit" : "Add" }} Furniture {{ isEdit ? " - " + id : "" }}
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-layout wrap>
          <v-flex xs12>
            <v-form ref="edit-form" v-model="valid" lazy-validation>
              <!-- Donor Info -->
              <div>Donor Info</div>

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

              <v-divider />
              <!-- Physical Attributes -->
              <div>Physical Attributes</div>
              <v-select
                v-model="fclass"
                :items="classOptions"
                :rules="[v => !!v || 'Item is required']"
                label="Furniture Class"
                required
              ></v-select>

              <physical-attr :fclass="fclass"></physical-attr>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
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

@Component({
  components: {
    PhysicalAttr
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
  size = -1;
  material = "";
  materialAlt = "";
  set = false;
  hasFrame = false;
  hasBoxSpring = false;
  numChairs = -1;
  heavy = false;
}
</script>
