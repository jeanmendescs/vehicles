import { IVehicle } from "../types/interfaces";

export default function getVehicle(vehicles: IVehicle[], _id: IVehicle["_id"]) {
  return vehicles.find((vehicle) => vehicle._id === _id);
}
