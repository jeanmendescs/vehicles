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

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IModal, IVehicle } from "../../types/interfaces";
import initialModalConfigState from "../../pages/Vehicles/initialVehicleState";
import initialState from "./initialState";

function Modal({ vehicleId, onModalClose }: IModal) {
  const [messageApi, contextHolder] = message.useMessage();
  const [vehicle, setVehicle] = useState<IVehicle>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleCloseModal = useCallback(() => {
    onModalClose(initialModalConfigState);
  }, [onModalClose]);

  useEffect(() => {
    if (!vehicleId) {
      return;
    }

    setIsLoading(true);
    axios
      .get(`http://localhost:4000/vehicles/${vehicleId}`)
      .then(({ data }) => {
        form.setFieldsValue(data);
        setVehicle(data);
      })
      .catch((err) => {
        messageApi.open({
          content: err.message,
          type: "error",
          className: "modal__message",
          onClose: handleCloseModal,
        });
      })
      .finally(() => setIsLoading(false));
  }, [form, handleCloseModal, messageApi, vehicleId]);

  const handleConfirmButton = useCallback(
    (values: IVehicle) => {
      const baseURL = `http://localhost:4000/vehicles/${vehicleId}`;
      const method = vehicleId ? "PUT" : "POST";
      axios({ method, baseURL, data: values })
        .then(() => {
          messageApi.open({
            content: vehicleId
              ? "Vehicle edited successfully"
              : "Vehicle created successfully",
            type: "success",
            className: "modal__message",
          });
          setTimeout(() => handleCloseModal(), 1000);
        })
        .catch((err) =>
          messageApi.open({
            content: err.message,
            type: "error",
            className: "modal__message",
          }),
        );
    },
    [handleCloseModal, messageApi, vehicleId],
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
            data-testid="form"
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
                    name="vehicle"
                    autoComplete="off"
                    data-testid="form-vehicle"
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
                    name="brand"
                    bordered={false}
                    className="modal__input"
                    autoComplete="off"
                    data-testid="form-brand"
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
                    name="year"
                    bordered={false}
                    className="modal__input"
                    autoComplete="off"
                    type="number"
                    data-testid="form-year"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item className="modal__sold">
                  <Form.Item name="isSold" noStyle>
                    <Switch
                      onChange={(isChecked) =>
                        handleSwitchChange(isChecked, "isSold")
                      }
                      checked={vehicle.isSold}
                      data-testid="form-is-sold"
                    />
                  </Form.Item>
                  <h4>{vehicle.isSold ? "Sold" : "On Sale"}</h4>
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
                    name="description"
                    rows={3}
                    autoComplete="off"
                    data-testid="form-description"
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
                  data-testid="form-submit-button"
                >
                  {vehicleId ? "Save" : "Add"}
                </Button>
              </Form.Item>
              <Form.Item noStyle>
                <Button
                  size="large"
                  className="button button--large"
                  onClick={handleCloseModal}
                  data-testid="form-close-buttonr"
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
