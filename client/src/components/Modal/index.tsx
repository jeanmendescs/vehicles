import {
  Modal as Component,
  Button,
  Divider,
  Input,
  Col,
  Row,
  Switch,
} from "antd";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IModal, IVehicle } from "../../types/interfaces";
import initialModalConfigState from "../../pages/Vehicles/initialVehicleState";
import initialState from "./initialState";

function Modal({ isOpen, vehicleId, onModalClose }: IModal) {
  const [vehicle, setVehicle] = useState<IVehicle>(initialState);

  useEffect(() => {
    if (vehicleId) {
      axios
        .get(`http://localhost:4000/vehicles/${vehicleId}`)
        .then(({ data }) => setVehicle(data))
        .catch((err) => console.log(err));
    }
  }, [vehicleId]);

  const handleCloseModal = useCallback(() => {
    onModalClose(initialModalConfigState);
    setVehicle(initialState);
  }, [onModalClose]);

  const handleInputChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      const { value, name } = e.target;

      setVehicle((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleSwitchChange = useCallback((isChecked: boolean, name: string) => {
    setVehicle((prev) => ({
      ...prev,
      [name]: isChecked,
    }));
  }, []);

  return (
    <Component
      open={isOpen}
      title={vehicleId ? "Edit Vehicle" : "New Vehicle"}
      keyboard
      closable={false}
      onCancel={handleCloseModal}
      wrapClassName="modal"
      footer={
        <>
          <Button size="large" className="button button--large">
            ADD
          </Button>
          <Button
            size="large"
            className="button button--large"
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </>
      }
    >
      <>
        <Row gutter={40} className="modal__spacing">
          <Col span={12}>
            <h4 className="modal__input-title">Vehicle</h4>
            <Input
              bordered={false}
              className="modal__input"
              onChange={handleInputChange}
              name="vehicle"
              value={vehicle.vehicle}
              autoComplete="off"
            />
          </Col>
          <Col span={12}>
            <h4 className="modal__input-title">Brand</h4>
            <Input
              onChange={handleInputChange}
              name="brand"
              bordered={false}
              className="modal__input"
              value={vehicle.brand}
              autoComplete="off"
            />
          </Col>
        </Row>
        <Row gutter={40} className="modal__spacing" align="bottom">
          <Col span={12}>
            <h4 className="modal__input-title">Year</h4>
            <Input
              onChange={handleInputChange}
              name="year"
              bordered={false}
              className="modal__input"
              value={vehicle.year}
              autoComplete="off"
            />
          </Col>
          <Col span={12} className="modal__sold">
            <Switch
              onChange={(isChecked) => handleSwitchChange(isChecked, "isSold")}
              checked={vehicle.isSold}
            />
            <h4>{vehicle.isSold ? "Sold" : "On Sale"}</h4>
          </Col>
        </Row>
        <Row align="bottom">
          <Col span={24}>
            <h4 className="modal__input-title">Description</h4>
            <Input.TextArea
              className="modal__input"
              value={vehicle.description}
              bordered={false}
              onChange={handleInputChange}
              name="description"
              rows={3}
              autoComplete="off"
            />
          </Col>
        </Row>
        <Divider orientation="center" />
      </>
    </Component>
  );
}

export default Modal;
