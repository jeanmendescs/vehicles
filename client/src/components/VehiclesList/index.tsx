import VehicleCard from "../VehicleCard";
import { IVehiclesList } from "../../types/interfaces";

function VehiclesList({ list, onVehicleSelect }: IVehiclesList) {
  return (
    <>
      <h3>Vehicles list</h3>
      <div className="list">
        {list?.map((vehicle) => {
          return (
            <VehicleCard
              key={vehicle._id}
              id={vehicle._id}
              brand={vehicle.brand}
              isActive={false}
              isSold={vehicle.isSold}
              vehicle={vehicle.vehicle}
              year={vehicle.year}
              onVehicleSelect={onVehicleSelect}
            />
          );
        })}
      </div>
    </>
  );
}

export default VehiclesList;
