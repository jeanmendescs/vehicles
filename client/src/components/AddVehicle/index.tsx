import { Divider } from "antd";
import { ReactSVG } from "react-svg";
import AddIcon from "../../assets/icons/add.svg";

interface IAddVehicle {
  onClick: () => void;
}

function AddVehicle({ onClick }: IAddVehicle) {
  return (
    <div>
      <div className="add-vehicle">
        <h2>VEHICLE</h2>
        <ReactSVG src={AddIcon} className="add-vehicle__icon" />
      </div>
      <Divider orientation="center" />
    </div>
  );
}

export default AddVehicle;
