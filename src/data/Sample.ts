import { Furniture, FClass, Material, Status } from "./Furniture";

export const Approvals: Furniture[] = [
  {
    id: "",
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
      partsIntact: true,
      finishIntact: true,
      smokeFree: true,
      petFree: false,
      bedbugFree: true,
      mildewFree: true,
      donateToFriend: true
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
        caption: "test caption 1.3"
      },
      {
        url:
          "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        caption: "test caption 1.4"
      },
      {
        url:
          "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        caption: "test caption 1.5"
      },
      {
        url:
          "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        caption: "test caption 1.6"
      },
      {
        url:
          "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        caption: "test caption 1.7"
      },
      {
        url:
          "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        caption: "test caption 1.8"
      },
      {
        url:
          "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        caption: "test caption 1.9"
      }
    ],
    comments: "this is a comment that the donor has made",
    staffNotes: ""
  },
  {
    id: "",
    donor: {
      name: "John Smith",
      phone: "(123) 124-2145",
      email: "js14@gmail.com",
      address: "124 Cornell St Ithaca, NY 14853",
      zone: "Fall Creek"
    },
    physical: {
      class: FClass.Chair,
      size: 2,
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
      partsIntact: true,
      finishIntact: false,
      smokeFree: false,
      petFree: false,
      bedbugFree: true,
      mildewFree: true,
      donateToFriend: true
    },
    status: Status.Donor,
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
        caption: "test caption 1.3"
      },
      {
        url:
          "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        caption: "test caption 1.4"
      },
      {
        url:
          "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        caption: "test caption 1.5"
      },
      {
        url:
          "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        caption: "test caption 1.6"
      },
      {
        url:
          "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        caption: "test caption 1.7"
      }
    ],
    comments: "this is a comment that the donor has made",
    staffNotes: ""
  }
];

export const Inventory: Furniture[] = [];
