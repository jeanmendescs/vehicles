import { Button } from "antd";
import { ReactSVG } from "react-svg";

import TagIcon from "../../assets/icons/tag.svg";
import { IVehicle } from "../../types/interfaces";

interface IVehicleDescription {
  vehicle: IVehicle | undefined;
}

function VehicleDescription({ vehicle }: IVehicleDescription) {
  if (!vehicle) return null;

  return (
    <div className="description">
      <div>
        <h3>{vehicle.vehicle}</h3>
        <div>
          <div>
            <h4>Brand</h4>
            <h4>{vehicle.brand}</h4>
          </div>
          <div>
            <h4>Year</h4>
            <h4>{vehicle.year}</h4>
          </div>
          <p>{vehicle.description}</p>
        </div>
      </div>
      <div>
        <Button>EDIT</Button>
        <ReactSVG src={TagIcon} alt="Tag Icon" />
      </div>
    </div>
  );
}

export default VehicleDescription;
