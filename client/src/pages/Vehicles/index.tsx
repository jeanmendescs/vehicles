import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

import AddVehicle from "../../components/AddVehicle";
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

  const getVehicle = () => {
    if (!selectedVehicleId) {
      return undefined;
    }
    return vehicles.find((vehicle) => vehicle._id === selectedVehicleId);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/vehicles", {
        params: {
          search,
          // fields: ["id", "vehicles"] TODO,
        },
      })
      .then(({ data }) => setVehicles(data))
      .catch((err) => console.log(err));
  }, [search]);

  return (
    <>
      <Header onSearch={setSearch} />
      <div className="vehicles">
        <AddVehicle onModalOpen={setModalConfig} />
        <Row gutter={30}>
          <Col span={12}>
            <VehiclesList
              onVehicleSelect={setSelectedVehicleId}
              list={vehicles}
            />
          </Col>
          {!!selectedVehicleId && (
            <Col span={12}>
              <VehicleDescription
                vehicle={getVehicle()}
                onEditClick={setModalConfig}
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
