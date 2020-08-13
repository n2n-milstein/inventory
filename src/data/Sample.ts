// TODO: delete this file

import Run, { RunStatus } from "@/data/Run";
import Timing, { Timestamp } from "@/data/furniture/Timing";
import { Material, FClass } from "@/data/furniture/Physical";
import { VolunteerRole } from "@/data/Volunteer";

import { Furniture, Status } from "./Furniture";

export const Approvals: Furniture[] = [
  {
    id: "",
    donor: {
      name: "John Smith",
      phone: "(123) 124-2145",
      email: "js14@gmail.com",
      address: "124 Cornell St Ithaca, NY 14853",
      zone: "Cornell",
    },
    physical: {
      class: FClass.Chair,
      size: 5,
      material: Material.Wood,
      set: false,
      hasFrame: false,
      hasBoxSpring: false,
      numChairs: 0,
      heavy: false,
    },
    timing: {
      urgent: false,
      pickupBy: new Date(2019, 6, 21),
      dateAdded: new Date(),
      dateOffered: new Date(2019, 6, 1),
    },
    attributes: {
      partsIntact: true,
      finishIntact: true,
      smokeFree: true,
      petFree: false,
      bedbugFree: true,
      mildewFree: true,
      donateToFriend: true,
    },
    status: Status.OnTruck,
    images: [
      {
        url: "assets/logo.png",
        caption: "test caption 1",
      },
    ],
    comments: "this is a comment that the donor has made",
    staffNotes: "",
    clientId: "",
  },
  {
    id: "",
    donor: {
      name: "John Smith",
      phone: "(123) 124-2145",
      email: "js14@gmail.com",
      address: "124 Cornell St Ithaca, NY 14853",
      zone: "Fall Creek",
    },
    physical: {
      class: FClass.Chair,
      size: 2,
      material: Material.Plastic,
      set: false,
      hasFrame: false,
      hasBoxSpring: false,
      numChairs: 0,
      heavy: false,
    },
    timing: {
      urgent: false,
      pickupBy: new Date(2019, 6, 21),
      dateAdded: new Date(),
      dateOffered: new Date(2019, 6, 1),
    },
    attributes: {
      partsIntact: true,
      finishIntact: false,
      smokeFree: false,
      petFree: false,
      bedbugFree: true,
      mildewFree: true,
      donateToFriend: true,
    },
    status: Status.Donor,
    images: [
      {
        url: "assets/logo.png",
        caption: "test caption 1",
      },
    ],
    comments: "this is a comment that the donor has made",
    staffNotes: "",
    clientId: "",
  },
];

export const Inventory: Furniture[] = [];

export const SampleRun: Run = {
  id: "testRun",
  dateCreated: new Date(),
  lastUpdated: new Date(),
  date: new Date(),
  volunteers: [
    {
      id: "vol1",
      name: "John Johnson",
      phone: "123-555-5555",
      role: VolunteerRole.Driver,
      email: "john@jj.com",
      address: "1 Test Rd Ithaca, NY 14850",
      runs: [] as string[],
    },
  ],
  pickups: {
    "3QzT3qNRNN6u0tMuIcEu": {
      status: 1,
      physical: {
        hasFrame: false,
        size: 5,
        heavy: false,
        material: Material.Wood,
        hasBoxSpring: false,
        set: false,
        altMaterial: Material.Wood,
        class: FClass.Chair,
        numChairs: 0,
      },
      timing: {
        urgent: false,
        pickupBy: Timing.toDate(new Timestamp(1563681600, 0)),
        dateOffered: Timing.toDate(new Timestamp(1561953600, 0)),
        dateAdded: Timing.toDate(new Timestamp(1579733112, 913000000)),
      },
      donor: {
        address: "125 Ithaca St Ithaca, NY 14853",
        zone: "Cornell",
        name: "Ray Jones",
        phone: "(123) 124-2145",
        email: "js14@gmail.com",
      },
      images: [
        {
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
          caption: "test caption 1",
        },
        {
          caption: "test caption 1.1",
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        },
        {
          caption: "test caption 1.2",
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        },
        {
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
          caption: "test caption 1.3",
        },
        {
          caption: "test caption 1.4",
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        },
        {
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
          caption: "test caption 1.5",
        },
        {
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
          caption: "test caption 1.6",
        },
        {
          caption: "test caption 1.7",
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        },
        {
          caption: "test caption 1.8",
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        },
        {
          caption: "test caption 1.9",
          url:
            "https://www.uredeals.com/wp-content/uploads/2018/08/Used-Shelby-Williams-Brown-Wood-Ladder-Back-Chairs1.jpg",
        },
      ],
      attributes: {
        petFree: false,
        bedbugFree: true,
        partsIntact: true,
        donateToFriend: true,
        mildewFree: true,
        smokeFree: true,
        finishIntact: true,
      },
      comments: "this is a comment that the donor has made",
      staffNotes: "",
      clientId: "",
      id: "3QzT3qNRNN6u0tMuIcEu",
    },
    h58u1dTR48DpZjsP1Bgz: {
      attributes: {
        finishIntact: true,
        partsIntact: true,
        bedbugFree: false,
        mildewFree: false,
        donateToFriend: true,
        petFree: false,
        smokeFree: true,
      },
      physical: {
        heavy: false,
        hasBoxSpring: false,
        class: FClass.Chair,
        size: 2,
        hasFrame: false,
        material: Material.Metal,
        set: false,
        numChairs: 0,
      },
      donor: {
        zone: "Flicker",
        email: "polygondust@gmail.com",
        address: "1 Snow St Flicker, MA 01295",
        name: "Porter Robinson",
        phone: "6085513560",
      },
      images: [],
      timing: {
        urgent: false,
        dateAdded: Timing.toDate(new Timestamp(1591768730, 31000000)),
        dateOffered: Timing.toDate(new Timestamp(1591768637, 702000000)),
        pickupBy: Timing.toDate(new Timestamp(1593216000, 0)),
      },
      comments: "",
      id: "h58u1dTR48DpZjsP1Bgz",
      staffNotes: "I'm listening to Worlds.",
      clientId: "",
      status: 4,
    },
  },
  dropoffs: {},
  clients: {},
  status: RunStatus.Planning,
  notes: "Hello, these are some sample notes.",
};
