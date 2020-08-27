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
      <span>{{ isEdit ? (isAdd ? "Add" : "Edit") : "View" }} Client</span>
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
              <h2>Client Info</h2>
              <v-text-field
                v-for="field in clientInfo"
                :key="field.name"
                :value="current[field.name]"
                @input="updateClient(field.name, $event)"
                :rules="required"
                :label="field.label"
                required
                :prepend-icon="field.icon"
                :readonly="!isEdit"
              />

              <v-divider class="my-3" />

              <h2>Agency Info</h2>
              <v-text-field
                v-for="field in agencyInfo"
                :key="field.name"
                :value="current[field.name]"
                @input="updateClient(field.name, $event)"
                :rules="required"
                :label="field.label"
                required
                :prepend-icon="field.icon"
                :readonly="!isEdit"
              />

              <v-divider class="my-3" />

              <h2>Furniture Requested</h2>
              <v-checkbox
                v-for="box in furnitureBoxes"
                @change="updateFurniture($event)"
                :input-value="furnitureValue"
                :key="box.value"
                :label="box.text"
                :value="box.value"
                hide-details
              >
              </v-checkbox>

              <v-divider class="my-3" />

              <h2>Reason for Need</h2>
              <v-checkbox
                v-for="box in needBoxes"
                @change="updateNeed($event)"
                :input-value="needValue"
                :key="box.value"
                :label="box.text"
                :value="box.value"
                hide-details
              >
              </v-checkbox>

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
import { Prop, Component } from "vue-property-decorator";
import { mapActions, mapState } from "vuex";
// data
import ViewAction from "@/data/ViewAction";
// eslint-disable-next-line prettier/prettier
import Client, { agencyData, clientData, requestOptions, needOptions } from "@/data/Client";
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
  computed: mapState({
    getCurrent(state, getters) {
      return getters[`${this.namespace}/getCurrent`];
    },
    updatesLength(state, getters) {
      return getters[`${this.namespace}/getUpdatesLength`];
    },
    updates(state, getters) {
      return getters[`${this.namespace}/getCurrentUpdates`];
    },
  }),
  methods: mapActions({
    updateCurrent(dispatch, payload) {
      return dispatch(`${this.namespace}/updateCurrent`, payload);
    },
  }),
})
export default class EditCard extends Vue {
  /* Properties for Vuex mapGetters and mapActions */

  updates!: Partial<Client>;

  getCurrent!: Client;

  updateCurrent!: ({ updates }: { updates: Partial<Client> }) => void;

  /* Props */

  @Prop({ default: "clients" })
  readonly namespace!: string;

  @Prop({ default: false })
  readonly isEdit!: boolean;

  @Prop({ default: false })
  readonly isAdd!: boolean;

  @Prop({ default: true })
  readonly isStaff!: boolean;

  @Prop({ default: [] })
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

  /* Data */

  readonly agencyInfo = agencyData;

  readonly clientInfo = clientData;

  readonly furnitureBoxes = requestOptions;

  readonly needBoxes = needOptions;

  /* Getters and setters for form fields */

  get current(): Client {
    return { ...this.getCurrent, ...this.updates };
  }

  updateClient(key: string, value: string): void {
    this.updateCurrent({ updates: { [key]: value } });
  }

  get furnitureValue(): any {
    return Object.entries(this.current.requestedFurniture)
      .filter((x) => x.values)
      .map((x) => x.keys);
  }

  updateFurniture(key: string, value: boolean): void {
    this.updateCurrent({
      updates: {
        requestedFurniture: {
          ...this.current.requestedFurniture,
          [key]: value,
        },
      },
    });
  }

  get needValue(): any {
    return Object.entries(this.current.reasonForNeed)
      .filter((x) => x.values)
      .map((x) => x.keys);
  }

  updateNeed(key: string, value: boolean): void {
    this.updateCurrent({
      updates: {
        reasonForNeed: {
          ...this.current.reasonForNeed,
          [key]: value,
        },
      },
    });
  }

  get comments(): string {
    return this.current.comments;
  }

  set comments(value: string) {
    this.updateCurrent({ updates: { comments: value } });
  }

  get staffNotes(): string {
    return this.current.staffNotes;
  }

  set staffNotes(value: string) {
    this.updateCurrent({ updates: { staffNotes: value } });
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
