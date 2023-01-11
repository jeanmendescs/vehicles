import { Button, Col, Divider, Row } from "antd";
import { ReactSVG } from "react-svg";

import TagIcon from "../../assets/icons/tag.svg";
import { IVehicleDescription } from "../../types/interfaces";
import EditIcon from "../../assets/icons/edit.svg";

function VehicleDescription({ vehicle, onEditClick }: IVehicleDescription) {
  if (!vehicle) return null;

  return (
    <div>
      <h3>Details</h3>
      <div className="descriptions">
        <div className="descriptions__info">
          <h3 className="descriptions__vehicle">{vehicle.vehicle}</h3>
          <Row className="descriptions__brand-wrapper">
            <Col span={12}>
              <h4 className="descriptions__brand-title">Brand</h4>
              <h4 className="descriptions__brand">{vehicle.brand}</h4>
            </Col>
            <Col span={12}>
              <h4>Year</h4>
              <h4>{vehicle.year}</h4>
            </Col>
          </Row>
          <p>{vehicle.description}</p>
        </div>
        <Divider orientation="center" />
        <div className="descriptions__actions">
          <Button
            icon={
              <ReactSVG
                className="descriptions__actions__icon"
                src={EditIcon}
              />
            }
            size="large"
            className="button"
            onClick={() =>
              onEditClick((prev) => ({
                ...prev,
                vehicleId: vehicle._id,
                isOpen: true,
              }))
            }
          >
            EDIT
          </Button>
          <ReactSVG src={TagIcon} alt="Tag Icon" />
        </div>
      </div>
    </div>
  );
}

export default VehicleDescription;
