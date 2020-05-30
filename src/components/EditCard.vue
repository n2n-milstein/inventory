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
      <span>{{ isEdit ? "Edit" : "View" }} Furniture</span>
      <v-spacer />
      <view-action-group
        :actions="ACTIONS"
        v-if="!isEdit"
        @close="$emit('close')"
        @edit="$emit('edit')"
      />
    </v-card-title>

    <v-card-text id="scroll-target" class="pa-0">
      <v-container>
        <v-row v-scroll:#scroll-target="onScroll" class="px-4">
          <v-col cols="12">
            <v-form
              ref="edit-form"
              v-model="valid"
              :class="{ 'readonly-text': !isEdit }"
              lazy-validation
            >
              <!-- Donor Info -->
              <h2>Donor Info</h2>

              <!-- TODO: make these just normal text when in readonly -->
              <v-text-field
                :value="donor.name"
                @input="updateDonor('name', $event)"
                :rules="required"
                label="Donor Name"
                required
                prepend-icon="person"
                :readonly="!isEdit"
              />

              <v-text-field
                :value="donor.phone"
                @input="updateDonor('phone', $event)"
                :rules="required"
                label="Phone Number"
                required
                prepend-icon="phone"
                :readonly="!isEdit"
              />

              <v-text-field
                :value="donor.email"
                @input="updateDonor('email', $event)"
                :rules="emailRules"
                label="Email"
                required
                prepend-icon="email"
                :readonly="!isEdit"
              />

              <v-text-field
                :value="donor.address"
                @input="updateDonor('address', $event)"
                :rules="required"
                label="Address"
                required
                prepend-icon="location_on"
                :readonly="!isEdit"
              />

              <v-text-field
                :value="donor.zone"
                @input="updateDonor('zone', $event)"
                :rules="required"
                label="Zone"
                required
                :readonly="!isEdit"
              />

              <v-divider class="my-3" />

              <!-- Status -->
              <h2>Status</h2>

              <v-text-field
                v-if="!isEdit"
                :value="statusOptions[status].text"
                label="Furniture Status"
                readonly
                :prepend-icon="statusIcons[status]"
              />

              <v-select
                v-else
                v-model="status"
                :items="statusOptions"
                label="Furniture Status"
                required
                :prepend-icon="statusIcons[status]"
                :readonly="!isEdit"
              />

              <v-divider class="my-3" />

              <!-- Physical Attributes -->
              <h2>Physical Attributes</h2>

              <h3 v-if="!fclass">
                Select a furniture class
              </h3>

              <v-text-field
                v-if="!isEdit"
                :value="fclass"
                label="Furniture Class"
                readonly
                prepend-icon="category"
              />

              <v-select
                v-else
                v-model="fclass"
                :items="classOptions"
                :rules="[(v) => !!v || 'Item is required']"
                label="Furniture Class"
                required
                prepend-icon="category"
                :readonly="!isEdit"
              />

              <physical-attributes
                v-model="physical"
                :fclass="fclass"
                :readonly="!isEdit"
              />

              <v-divider class="my-3" />

              <!-- Attributes -->
              <h2>Attributes</h2>

              <attribute-questions v-model="attributes" :readonly="!isEdit" />

              <v-divider class="my-3" />

              <!-- Timing -->
              <h2>Timing</h2>

              <timing-dates v-model="timing" :readonly="!isEdit" />

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

    <v-card-actions v-if="isEdit">
      <v-spacer />
      <v-btn text color="primary" @click="$emit('edit')">
        Cancel
      </v-btn>
      <v-btn
        text
        color="primary"
        :disabled="!isEdit || updatesLength === 0"
        @click="$emit('save')"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
// data
import { Furniture, Status } from "@/data/Furniture";
import Physical, { FClass } from "@/data/furniture/Physical";
import Timing from "@/data/furniture/Timing";
import Donor from "@/data/furniture/Donor";
import Attributes from "@/data/furniture/Attributes";
import ViewAction from "@/data/ViewAction";
// components
import PhysicalAttributes from "./EditCard/PhysicalAttributes.vue";
import ConditionalDate from "./EditCard/ConditionalDate.vue";
import DatePickerMenu from "./EditCard/DatePickerMenu.vue";
import AttributeQuestions from "./EditCard/AttributeQuestions.vue";
import TimingDates from "./EditCard/TimingDates.vue";
import ViewActionGroup from "./ViewActionGroup.vue";

const namespace = "inventory";

@Component({
  components: {
    PhysicalAttributes,
    ConditionalDate,
    DatePickerMenu,
    AttributeQuestions,
    TimingDates,
    ViewActionGroup,
  },
  computed: mapGetters(namespace, {
    getCurrent: "getCurrent",
    updates: "getCurrentUpdates",
    updatesLength: "getUpdatesLength",
  }),
  methods: mapActions(namespace, ["updateCurrent"]),
})
export default class EditCard extends Vue {
  /* Properties for Vuex mapGetters and mapActions */

  updates!: Partial<Furniture>;

  getCurrent!: Furniture;

  updateCurrent!: ({ updates }: { updates: Partial<Furniture> }) => void;

  /* Props */

  @Prop({ default: false })
  readonly isEdit!: boolean;

  @Prop({ default: true })
  readonly isStaff!: boolean;

  /**
   * Sets the offset when user scrolls
   */
  onScroll(e: any): void {
    this.offsetTop = e.target.scrollTop;
  }

  offsetTop = 0;

  /* Form validation */

  valid = true;

  // TODO: consider factoring out validation rules that are reused across the application
  readonly required = [(v: any): boolean | string => !!v || "This is required"];

  readonly emailRules = [
    (v: any): boolean | string => !!v || "This is required",
    (v: any): boolean | string => /.+@.+/.test(v) || "E-mail must be valid",
  ];

  readonly ACTIONS: ViewAction[] = [
    { icon: "edit", desc: "Edit Item", emit: "edit" },
    {
      icon: "more_vert",
      desc: "More Actions",
      emit: "menu",
      menu: [
        { icon: "archive", desc: "Archive", emit: "archive" },
        {
          icon: "cloud_download",
          desc: "Export",
          emit: "export",
        },
      ],
    },
    { icon: "close", desc: "Close", emit: "close" },
  ];

  /* Getters and setters for form fields */

  get current(): Furniture {
    return { ...this.getCurrent, ...this.updates };
  }

  get donor(): Donor {
    return this.current.donor;
  }

  updateDonor(key: string, value: string): void {
    /* eslint-disable object-curly-newline */
    this.updateCurrent({
      updates: { donor: { ...this.current.donor, [key]: value } },
    });
    /* eslint-enable */
  }

  get status(): Status {
    return this.current.status;
  }

  set status(value: Status) {
    this.updateCurrent({ updates: { status: value } });
  }

  readonly statusOptions = Object.values(Status)
    .filter((v) => typeof (v as any) !== "number")
    .map((value, index) => {
      return { text: value, value: index };
    });

  readonly statusIcons = [
    "face",
    "local_shipping",
    "storefront",
    "mood", // could also use "check" or "beenhere"
    "not_listed_location",
  ];

  get fclass(): FClass {
    return this.current.physical.class;
  }

  set fclass(value: FClass) {
    /* eslint-disable object-curly-newline */
    this.updateCurrent({
      updates: { physical: { ...this.current.physical, class: value } },
    });
    /* eslint-enable */
  }

  readonly classOptions = Object.keys(FClass);

  get physical(): Physical {
    return this.current.physical;
  }

  set physical(value: Physical) {
    this.updateCurrent({ updates: { physical: value } });
  }

  get timing(): Timing {
    return this.current.timing;
  }

  set timing(value: Timing) {
    this.updateCurrent({ updates: { timing: value } });
  }

  get comments(): string {
    return this.current.comments;
  }

  get staffNotes(): string {
    return this.current.staffNotes;
  }

  set staffNotes(value: string) {
    this.updateCurrent({ updates: { staffNotes: value } });
  }

  get attributes(): Attributes {
    return this.current.attributes;
  }

  set attributes(value: Attributes) {
    this.updateCurrent({ updates: { attributes: value } });
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

.readonly-text ::v-deep .v-text-field > .v-input__control > .v-input__slot {
  &::before,
  &::after {
    content: none;
    border: none;
  }
}
</style>
