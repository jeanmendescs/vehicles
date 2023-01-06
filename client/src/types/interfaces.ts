export interface IVehicle {
  id: string;
  vehicle: string;
  brand: string;
  year: number;
  description: string;
  isSold: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICard
  extends Pick<IVehicle, "brand" | "year" | "vehicle" | "isSold"> {
  isActive: boolean;
}
