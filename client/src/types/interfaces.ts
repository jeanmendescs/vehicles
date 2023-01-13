export interface IVehicle {
  _id: string;
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
  id: string;
  isActive: boolean;
  onVehicleSelect: (_id: string) => void;
}

export interface IModalConfig {
  isOpen: boolean;
  vehicleId: string;
}

export interface IModal {
  vehicleId: string;
  onModalClose: React.Dispatch<React.SetStateAction<IModalConfig>>;
}

export interface IAddVehicle {
  onModalOpen: React.Dispatch<React.SetStateAction<IModalConfig>>;
}

export interface IVehiclesList {
  list: IVehicle[];
  onVehicleSelect: (_id: string) => void;
}

export interface IVehicleDescription {
  vehicle: IVehicle | undefined;
  onEditClick: (_id: string) => void;
}
