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
  onVehicleSelect: React.Dispatch<React.SetStateAction<string>>;
}

export interface IModal {
  isOpen: boolean;
  vehicleId: string;
  onModalClose: React.Dispatch<React.SetStateAction<IModal>>;
}

export interface IAddVehicle {
  onModalOpen: React.Dispatch<React.SetStateAction<IModal>>;
}

export interface IVehiclesList {
  list: IVehicle[];
  onVehicleSelect: React.Dispatch<React.SetStateAction<string>>;
}

export interface IVehicleDescription {
  vehicle: IVehicle | undefined;
  onEditClick: React.Dispatch<React.SetStateAction<IModal>>;
}
