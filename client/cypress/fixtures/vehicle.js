const vehicles = [
  {
    brand: "Volkswagen",
    vehicle: "Voyage",
    year: 1988,
    description: "A nice car",
    isSold: false,
  },
  {
    brand: "FIAT",
    vehicle: "Fusca",
    year: 1960,
    description: "A lovelly car",
    isSold: false,
  },
  {
    brand: "FIAT",
    vehicle: "Uno",
    year: 1999,
    description: "A great car",
    isSold: false,
  },
];

export default function getVehicle(type) {
  switch (type) {
    case "create":
      return vehicles[0];
    case "edit":
      return vehicles[1];
    default:
      return vehicles[2];
  }
}
