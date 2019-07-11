<template>
  <v-container fluid>
    <v-layout justify-start align-start>
      <v-flex lg8 md9 xs12>
        <approval-card
          v-for="(request, i) in pending"
          :request="request"
          :key="i"
        ></approval-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { FClass, Material, Status, Furniture } from "@/data/Furniture";
import ApprovalCard from "@/components/ApprovalCard.vue";

@Component({
  components: {
    ApprovalCard
  }
})
export default class Approval extends Vue {
  show: boolean = false;
  pending: Furniture[] = [
    {
      donor: {
        name: "John Smith",
        phone: "(123) 124-2145",
        email: "js14@gmail.com",
        address: "124 Cornell St Ithaca, NY 14853",
        zone: "Cornell"
      },
      physical: {
        class: FClass.Chair,
        size: 5,
        material: Material.Wood,
        set: false,
        hasFrame: false,
        hasBoxSpring: false,
        numChairs: 0,
        heavy: false
      },
      timing: {
        urgent: false,
        pickupBy: new Date(2019, 6, 21),
        dateOffered: new Date(2019, 6, 1)
      },
      attributes: {
        originalOwner: true,
        smokeFree: true,
        petFree: false,
        donateToFriend: true,
        age: 2
      },
      status: Status.OnTruck,
      images: [
        {
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
          caption: "test caption 1"
        },
        {
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
          caption: "test caption 1.1"
        },
        {
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
          caption: "test caption 1.2"
        },
        {
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
          caption: "test caption 1.2"
        },
        {
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
          caption: "test caption 1.2"
        },
        {
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
          caption: "test caption 1.2"
        },
        {
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
          caption: "test caption 1.2"
        },
        {
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
          caption: "test caption 1.2"
        },
        {
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
          caption: "test caption 1.2"
        },
        {
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
          caption: "test caption 1.2"
        }
      ],
      comments: "hi"
    },
    {
      donor: {
        name: "John Smith",
        phone: "(123) 124-2145",
        email: "js14@gmail.com",
        address: "124 Cornell St Ithaca, NY 14853",
        zone: "Cornell"
      },
      physical: {
        class: FClass.Chair,
        size: 5,
        material: Material.Plastic,
        set: false,
        hasFrame: false,
        hasBoxSpring: false,
        numChairs: 0,
        heavy: false
      },
      timing: {
        urgent: false,
        pickupBy: new Date(2019, 6, 21),
        dateOffered: new Date(2019, 6, 1)
      },
      attributes: {
        originalOwner: true,
        smokeFree: true,
        petFree: false,
        donateToFriend: true,
        age: 6
      },
      status: Status.OnTruck,
      images: [
        {
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
          caption: "test caption 2"
        }
      ],
      comments: "hi"
    }
  ];
}
</script>
