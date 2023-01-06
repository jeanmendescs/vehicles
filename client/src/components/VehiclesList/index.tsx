import VehicleCard from "../VehicleCard";
import { IVehicle } from "../../types/interfaces";

interface IVehiclesList {
  list: IVehicle[];
}

function VehiclesList({ list }: IVehiclesList) {
  return (
    <div>
      <h3>Vehicles list</h3>
      {list.map((vehicle) => {
        return (
          <VehicleCard
            key={vehicle.id}
            brand={vehicle.brand}
            isActive={false}
            isSold={vehicle.isSold}
            vehicle={vehicle.vehicle}
            year={vehicle.year}
          />
        );
      })}
    </div>
  );
}

export default VehiclesList;
