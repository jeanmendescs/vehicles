import {
  Modal as Component,
  Button,
  Divider,
  Input,
  Col,
  Row,
  Switch,
  Form,
  message,
} from "antd";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IModal, IVehicle } from "../../types/interfaces";
import initialModalConfigState from "../../pages/Vehicles/initialVehicleState";
import initialState from "./initialState";

function Modal({ vehicleId, onModalClose }: IModal) {
  const [messageApi, contextHolder] = message.useMessage();
  const [vehicle, setVehicle] = useState<IVehicle>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (vehicleId) {
      setIsLoading(true);
      axios
        .get(`http://localhost:4000/vehicles/${vehicleId}`)
        .then(({ data }) => {
          setIsLoading(false);
          setVehicle(data);
          form.resetFields();
        })
        .catch((err) => {
          setIsLoading(false);
          messageApi.open({
            content: err.message,
            type: "error",
            className: "modal__message",
          });
        });
    }
  }, [form, messageApi, vehicleId]);

  const handleCloseModal = useCallback(() => {
    onModalClose(initialModalConfigState);
  }, [onModalClose]);

  const handleConfirmButton = useCallback(
    (values) => {
      const baseURL = `http://localhost:4000/vehicles/${vehicleId}`;
      const method = vehicleId ? "PUT" : "POST";
      const body = {
        ...values,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isSold: vehicle.isSold,
      } as IVehicle;
      axios({ method, baseURL, data: body })
        .then(() =>
          messageApi.open({
            content: vehicleId
              ? "Vehicle edited successfully"
              : "Vehicle created successfully",
            type: "success",
            className: "modal__message",
          }),
        )
        .catch((err) =>
          messageApi.open({
            content: err.message,
            type: "error",
            className: "modal__message",
          }),
        );
    },
    [messageApi, vehicle.isSold, vehicleId],
  );

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
    <>
      {contextHolder}
      <Component
        open
        title={vehicleId ? "Edit Vehicle" : "New Vehicle"}
        keyboard
        closable={false}
        onCancel={handleCloseModal}
        wrapClassName="modal"
        footer={null}
      >
        {vehicleId && isLoading ? (
          <span>Loading...</span>
        ) : (
          <Form
            form={form}
            colon={false}
            layout="vertical"
            onFinish={handleConfirmButton}
            initialValues={vehicle}
          >
            <Row gutter={40} className="modal__spacing">
              <Col span={12}>
                <Form.Item
                  label="Vehicle"
                  name="vehicle"
                  className="modal__input-title"
                  rules={[
                    { required: true, message: "The vehicle is required" },
                  ]}
                >
                  <Input
                    bordered={false}
                    className="modal__input"
                    onChange={handleInputChange}
                    name="vehicle"
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Brand"
                  name="brand"
                  rules={[{ required: true, message: "The brand is required" }]}
                  className="modal__input-title"
                >
                  <Input
                    onChange={handleInputChange}
                    name="brand"
                    bordered={false}
                    className="modal__input"
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={40} className="modal__spacing" align="bottom">
              <Col span={12}>
                <Form.Item
                  getValueFromEvent={(e) => Number(e.target.value)}
                  label="Year"
                  name="year"
                  rules={[
                    { required: true, message: "The year is required" },
                    {
                      type: "integer",
                      min: 0,
                      message: "The year must be a positive integer number",
                    },
                  ]}
                  className="modal__input-title"
                >
                  <Input
                    onChange={handleInputChange}
                    name="year"
                    bordered={false}
                    className="modal__input"
                    autoComplete="off"
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="teste" className="modal__input-title">
                  <div className="modal__sold">
                    <Switch
                      onChange={(isChecked) =>
                        handleSwitchChange(isChecked, "isSold")
                      }
                      checked={vehicle.isSold}
                    />
                    <h4>{vehicle.isSold ? "Sold" : "On Sale"}</h4>
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Row align="bottom">
              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    { required: true, message: "The description is required" },
                  ]}
                  className="modal__input-title"
                >
                  <Input.TextArea
                    className="modal__input"
                    bordered={false}
                    onChange={handleInputChange}
                    name="description"
                    rows={3}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider orientation="center" />
            <Row justify="end">
              <Form.Item noStyle>
                <Button
                  size="large"
                  className="button button--large"
                  htmlType="submit"
                >
                  {vehicleId ? "Edit" : "Add"}
                </Button>
              </Form.Item>
              <Form.Item noStyle>
                <Button
                  size="large"
                  className="button button--large"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </Form.Item>
            </Row>
          </Form>
        )}
      </Component>
    </>
  );
}

export default Modal;
