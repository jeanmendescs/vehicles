import {
  Modal as Component,
  Button,
  Divider,
  Input,
  Col,
  Row,
  Switch,
} from "antd";

import React, { useCallback, useState } from "react";
import { IModal, IVehicle } from "../../types/interfaces";
import initialModalConfigState from "../../pages/Vehicles/initialState";
import initialState from "./initialState";

function Modal({ isOpen, title, onModalClose }: IModal) {
  const [vehicle, setVehicle] = useState<IVehicle>(initialState);

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
      title={title}
      keyboard
      closable={false}
      onCancel={handleCloseModal}
      wrapClassName="modal"
      footer={
        <>
          <Button size="large" className="button button--large">
            ADD
          </Button>
          <Button size="large" className="button button--large">
            Close
          </Button>
        </>
      }
    >
      <>
        <div>
          <Row gutter={40} className="modal__spacing">
            <Col span={12}>
              <h4 className="modal__input-title">Vehicle</h4>
              <Input
                bordered={false}
                className="modal__input"
                onChange={handleInputChange}
                name="vehicle"
                value={vehicle.vehicle}
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
              />
            </Col>
            <Col span={12} className="modal__sold">
              <Switch
                onChange={(isChecked) =>
                  handleSwitchChange(isChecked, "isSold")
                }
                checked={vehicle.isSold}
              />
              <h4>{vehicle.isSold ? "Sold" : "On Sale"}</h4>
            </Col>
          </Row>
          <Row className="modal__spacing" align="bottom">
            <Col span={24}>
              <h4 className="modal__input-title">Description</h4>
              <Input.TextArea
                className="modal__input"
                value={vehicle.description}
                bordered={false}
                onChange={handleInputChange}
                name="description"
                rows={3}
              />
            </Col>
          </Row>
        </div>
        <Divider orientation="center" />
      </>
    </Component>
  );
}

export default Modal;
