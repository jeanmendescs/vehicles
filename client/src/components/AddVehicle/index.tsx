import { Divider } from "antd";
import { ReactSVG } from "react-svg";
import AddIcon from "../../assets/icons/add.svg";
import { IAddVehicle } from "../../types/interfaces";

function AddVehicle({ onModalOpen }: IAddVehicle) {
  return (
    <div>
      <div className="add-vehicle">
        <h2>VEHICLE</h2>
        <ReactSVG
          onClick={() =>
            onModalOpen((prev) => ({
              ...prev,
              title: "New Vehicle",
              isOpen: !prev.isOpen,
            }))
          }
          src={AddIcon}
          className="add-vehicle__icon"
        />
      </div>
      <Divider orientation="center" />
    </div>
  );
}

export default AddVehicle;
