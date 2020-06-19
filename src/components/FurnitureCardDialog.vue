<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="750"
      persistent
      scrollable
      @click:outside="closeDialog()"
      @keydown.escape="closeDialog()"
    >
      <edit-card
        :namespace="namespace"
        :is-edit="isEdit"
        :is-add="isAdd"
        @edit="toggleEdit()"
        @close="closeDialog()"
        @save="saveChanges()"
        @export="$emit('export')"
        @archive="$emit('archive')"
      />
    </v-dialog>

    <unsaved-dialog
      :dialog="unsavedDialog"
      @cancel="unsavedDialog = false"
      @discard="closeDialog(true)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { mapActions, mapState } from "vuex";
import collections from "@/network/collections";
import EditCard from "@/components/EditCard.vue";
import UnsavedDialog from "@/components/FurnitureCardUnsavedDialog.vue";

@Component({
  components: { EditCard, UnsavedDialog },
  computed: mapState({
    updatesLength(state, getters) {
      return getters[`${this.namespace}/getUpdatesLength`];
    },
  }),
  methods: mapActions({
    clearCurrent(dispatch) {
      return dispatch(`${this.namespace}/clearCurrent`);
    },
    clearUpdates(dispatch) {
      return dispatch(`${this.namespace}/clearUpdates`);
    },
    commitUpdates(dispatch) {
      return dispatch(`${this.namespace}/commitUpdates`);
    },
  }),
})
export default class FurnitureCardDialog extends Vue {
  @Prop({ default: false })
  readonly dialog!: boolean;

  @Prop({})
  readonly collection!: collections;

  @Prop({ default: false })
  readonly isAdd!: boolean;

  @Prop({})
  readonly namespace!: string;

  readonly updatesLength!: number;

  readonly clearCurrent!: () => void;

  readonly clearUpdates!: () => void;

  readonly commitUpdates!: () => void;

  unsavedDialog = false;

  isEdit = false;

  /**
   * Exits dialog and clears the current item
   */
  closeDialog(forceClose = false): void {
    if (this.updatesLength === 0 || forceClose) {
      this.unsavedDialog = false;
      this.isEdit = false;
      this.clearCurrent();
    } else {
      this.unsavedDialog = true;
    }
  }

  /**
   * Toggles edit state `isEdit` and clears update if setting `isEdit`
   * to false
   */
  toggleEdit(): void {
    if (this.isEdit) {
      this.clearUpdates();
    }
    this.isEdit = !this.isEdit;
  }

  /**
   * Commits updates to Firestore
   */
  saveChanges(): void {
    if (this.isAdd) {
      this.$emit("add");
    } else {
      this.commitUpdates();
      this.isEdit = false;
    }
  }
}
</script>
