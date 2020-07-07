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
        :menu-actions="menuActions"
        :menu-loading="menuLoading"
        :loading="updatesLoading"
        @edit="toggleEdit()"
        @close="closeDialog()"
        @save="saveChanges()"
        @export="$emit('export')"
        @archive="$emit('archive')"
        @unarchive="$emit('unarchive')"
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
import { Component, Prop, Watch } from "vue-property-decorator";
import { mapActions, mapState } from "vuex";
import ViewAction from "@/data/ViewAction";
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
    async commitUpdates(dispatch) {
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

  @Prop({})
  readonly menuActions!: ViewAction[];

  @Prop({ default: false })
  readonly menuLoading!: boolean;

  readonly updatesLength!: number;

  readonly clearCurrent!: () => void;

  readonly clearUpdates!: () => void;

  readonly commitUpdates!: () => Promise<void>;

  updatesLoading = false;

  unsavedDialog = false;

  isEdit = false;

  /**
   * Watch for change in dialog; if it opens, set isEdit to isAdd
   */
  @Watch("dialog")
  onDialogChanged(val: boolean): void {
    if (val) this.isEdit = this.isAdd;
  }

  /**
   * Exits dialog and clears the current item
   */
  closeDialog(forceClose = false): void {
    if (this.updatesLoading) {
      return;
    }
    if (this.updatesLength === 0 || forceClose) {
      this.unsavedDialog = false;
      this.isEdit = false;
      this.$emit("close"); // used to set isAdd to false
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
  async saveChanges(): Promise<void> {
    if (this.isAdd) {
      this.$emit("add");
    } else {
      this.updatesLoading = true;
      await this.commitUpdates();
      this.isEdit = false;
      this.updatesLoading = false;
    }
  }
}
</script>
