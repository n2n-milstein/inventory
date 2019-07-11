<template>
  <v-flex xs12 class="inventory">
    <v-data-table :headers="headers" :items="furniture">
      <template v-slot:items="props">
        <td>{{ props.item.physical.class }}</td>
        <td>
          {{ props.item.timing.dateAdded.toLocaleDateString() }}
        </td>
        <td>{{ props.item.donor.zone }}</td>
        <td>{{ props.item.physical.size }}</td>
        <td>{{ props.item.status }}</td>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { FClass, Material, Status, Furniture } from "@/data/Furniture";

@Component
export default class Inventory extends Vue {
  headers = [
    { text: "Class", value: "class" },
    { text: "Date Added", value: "dateAdded" },
    { text: "Zone", value: "zone" },
    { text: "Size", value: "size" },
    { text: "Status", value: "status" }
  ];

  furniture = [
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
        dateOffered: new Date(2019, 6, 1),
        dateAdded: new Date(2019, 6, 11)
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
        dateOffered: new Date(2019, 6, 1),
        dateAdded: new Date(2019, 6, 16)
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
        dateOffered: new Date(2019, 6, 1),
        dateAdded: new Date(2019, 6, 11)
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
