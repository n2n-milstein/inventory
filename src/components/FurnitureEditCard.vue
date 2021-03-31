<template>
  <v-card>
    <v-overlay absolute :value="loading" align="center" opacity="0.25">
      <v-progress-circular
        class="mr-3"
        indeterminate
        size="32"
      ></v-progress-circular>
      Saving edits...
    </v-overlay>

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
      <span>{{ isEdit ? (isAdd ? "Add" : "Edit") : "View" }} Furniture</span>
      <v-spacer />
      <view-action-group
        :actions="ACTIONS"
        v-if="!isEdit"
        @close="$emit('close')"
        @edit="$emit('edit')"
        @export="$emit('export')"
        @archive="$emit('archive')"
        @unarchive="$emit('unarchive')"
      />
    </v-card-title>

    <v-card-text id="scroll-target" class="pa-0">
      <v-container>
        <v-row v-scroll:#scroll-target="onScroll" class="px-4">
          <v-col cols="12">
            <v-form
              ref="editForm"
              v-model="valid"
              :class="{ 'readonly-text': !isEdit }"
              lazy-validation
            >
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

              <!-- Donor Info -->
              <h2>Donor Info</h2>

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
                :value="statusOptions[status] ? statusOptions[status].text : ''"
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

              <h3 v-if="!fclass">Select a furniture class</h3>

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
            </v-form>
          </v-col>
        </v-row>
      </v-container>
      <v-divider />
    </v-card-text>

    <v-card-actions v-if="isEdit">
      <v-spacer />
      <v-btn v-if="!isAdd" text color="primary" @click="$emit('edit')">
        Cancel
      </v-btn>
      <v-btn
        text
        color="primary"
        :disabled="!isEdit || updatesLength === 0"
        @click="saveChanges()"
      >
        {{ isAdd ? "Add" : "Save" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component, Emit } from "vue-property-decorator";
// data
import { Furniture, Status } from "@/data/Furniture";
import Physical, { FClass } from "@/data/furniture/Physical";
import Timing from "@/data/furniture/Timing";
import Donor from "@/data/furniture/Donor";
import Attributes from "@/data/furniture/Attributes";
import ViewAction from "@/data/ViewAction";
// components
import PhysicalAttributes from "./FurnitureEditCard/PhysicalAttributes.vue";
import ConditionalDate from "./FurnitureEditCard/ConditionalDate.vue";
import DatePickerMenu from "./DatePickerMenu.vue";
import AttributeQuestions from "./FurnitureEditCard/AttributeQuestions.vue";
import TimingDates from "./FurnitureEditCard/TimingDates.vue";
import ViewActionGroup from "./ViewActionGroup.vue";

@Component({
  components: {
    PhysicalAttributes,
    ConditionalDate,
    DatePickerMenu,
    AttributeQuestions,
    TimingDates,
    ViewActionGroup,
  },
})
export default class FurnitureEditCard extends Vue {
  /* Props */

  @Prop({})
  readonly current!: Furniture;

  @Prop({})
  readonly updates!: Partial<Furniture>;

  @Prop({ default: false })
  readonly readonly!: boolean;

  @Prop({ default: false })
  readonly isEdit!: boolean;

  @Prop({ default: false })
  readonly isAdd!: boolean;

  @Prop({ default: true })
  readonly isStaff!: boolean;

  @Prop({})
  readonly menuActions!: ViewAction[];

  @Prop({ default: false })
  readonly menuLoading!: boolean;

  @Prop({ default: false })
  readonly loading!: boolean;

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

  get ACTIONS(): ViewAction[] {
    if (this.readonly) {
      return [{ icon: "close", desc: "Close", emit: "close" }];
    }

    return [
      { icon: "edit", desc: "Edit Item", emit: "edit" },
      {
        icon: "more_vert",
        desc: "More Actions",
        emit: "menu",
        menu: this.menuActions,
        loading: (): boolean => this.menuLoading,
      },
      { icon: "close", desc: "Close", emit: "close" },
    ];
  }

  /** Variables for updates */

  get updatesLength(): number {
    return Object.keys(this.updates).length;
  }

  get currentWithUpdates(): Furniture {
    return { ...this.current, ...this.updates };
  }

  /**
   * Written like this to maintain compatibility with stores
   */
  @Emit("update")
  /* eslint-disable object-curly-newline */
  // eslint-disable-next-line class-methods-use-this
  updateCurrent({
    updates,
  }: {
    updates: Partial<Furniture>;
  }): Partial<Furniture> {
    return updates;
  }
  /* eslint-enable object-curly-newline */

  /* Getters and setters for form fields */

  get donor(): Donor {
    return this.currentWithUpdates.donor || new Donor();
  }

  updateDonor(key: string, value: string): void {
    /* eslint-disable object-curly-newline */
    this.updateCurrent({
      updates: { donor: { ...this.currentWithUpdates.donor, [key]: value } },
    });
    /* eslint-enable */
  }

  get status(): Status {
    return this.currentWithUpdates.status;
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
    return this.currentWithUpdates.physical
      ? this.currentWithUpdates.physical.class
      : FClass.Bed;
  }

  set fclass(value: FClass) {
    /* eslint-disable object-curly-newline */
    this.updateCurrent({
      updates: {
        physical: { ...this.currentWithUpdates.physical, class: value },
      },
    });
    /* eslint-enable */
  }

  readonly classOptions = Object.keys(FClass);

  get physical(): Physical {
    return this.currentWithUpdates.physical || new Physical();
  }

  set physical(value: Physical) {
    if (!this.isEdit) return;
    this.updateCurrent({ updates: { physical: value } });
  }

  get timing(): Timing {
    return this.currentWithUpdates.timing || new Timing();
  }

  set timing(value: Timing) {
    this.updateCurrent({ updates: { timing: value } });
  }

  get comments(): string {
    return this.currentWithUpdates.comments;
  }

  get staffNotes(): string {
    return this.currentWithUpdates.staffNotes;
  }

  set staffNotes(value: string) {
    this.updateCurrent({ updates: { staffNotes: value } });
  }

  get attributes(): Attributes {
    return this.currentWithUpdates.attributes || new Attributes();
  }

  set attributes(value: Attributes) {
    this.updateCurrent({ updates: { attributes: value } });
  }

  /**
   * Validates form and emits save if form is valid
   */
  saveChanges(): void {
    const form = this.$refs.editForm as any;
    if (form.validate()) {
      this.$emit("save");
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

.readonly-text ::v-deep .v-text-field > .v-input__control > .v-input__slot {
  &::before,
  &::after {
    content: none;
    border: none;
  }
}
</style>
