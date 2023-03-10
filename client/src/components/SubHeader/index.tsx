import { Divider } from "antd";
import { ReactSVG } from "react-svg";
import AddIcon from "../../assets/icons/add.svg";
import { IAddVehicle } from "../../types/interfaces";

function SubHeader({ onModalOpen }: IAddVehicle) {
  return (
    <div>
      <div className="add-vehicle">
        <h2>VEHICLE</h2>
        <ReactSVG
          onClick={() => onModalOpen({ isOpen: true, vehicleId: "" })}
          src={AddIcon}
          className="add-vehicle__icon"
          data-testid="addButton"
        />
      </div>
      <Divider orientation="center" />
    </div>
  );
}

export default SubHeader;
