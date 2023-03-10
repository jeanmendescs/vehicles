import { Col, Row } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import SubHeader from "../../components/SubHeader";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import VehicleDescription from "../../components/VehicleDescription";
import VehiclesList from "../../components/VehiclesList";
import { IVehicle } from "../../types/interfaces";
import initialModalConfigState from "./initialVehicleState";

function Vehicles() {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [search, setSearch] = useState("");
  const [modalConfig, setModalConfig] = useState(initialModalConfigState);

  const handleEditClick = useCallback((_id: string) => {
    return setModalConfig({ vehicleId: _id, isOpen: true });
  }, []);

  const handleVehicleSelectClick = useCallback((_id: string) => {
    return setSelectedVehicleId(_id);
  }, []);

  const getVehicle = () => {
    if (!selectedVehicleId) {
      return undefined;
    }
    return vehicles.find((vehicle) => vehicle._id === selectedVehicleId);
  };

  useEffect(() => {
    if (modalConfig.isOpen) {
      return;
    }

    axios
      .get("http://localhost:4000/vehicles", {
        params: {
          search,
        },
      })
      .then(({ data }) => setVehicles(data))
      .catch((err) => console.log(err));
  }, [search, modalConfig.isOpen]);

  return (
    <>
      <Header onSearch={setSearch} />
      <div className="vehicles">
        <SubHeader onModalOpen={setModalConfig} />
        <Row gutter={[30, 30]}>
          <Col className="order" xs={24} sm={12}>
            <VehiclesList
              onVehicleSelect={handleVehicleSelectClick}
              list={vehicles}
            />
          </Col>
          {!!selectedVehicleId && (
            <Col xs={24} sm={12}>
              <VehicleDescription
                vehicle={getVehicle()}
                onEditClick={handleEditClick}
              />
            </Col>
          )}
        </Row>
      </div>
      {modalConfig.isOpen && (
        <Modal
          vehicleId={modalConfig.vehicleId}
          onModalClose={setModalConfig}
        />
      )}
    </>
  );
}

export default Vehicles;
