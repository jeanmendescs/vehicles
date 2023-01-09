import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

import AddVehicle from "../../components/AddVehicle";
import Header from "../../components/Header";
import VehicleDescription from "../../components/VehicleDescription";
import VehiclesList from "../../components/VehiclesList";
import { IVehicle } from "../../types/interfaces";

function Vehicles() {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [search, setSearch] = useState("");

  const getVehicle = () => {
    if (!selectedVehicle) {
      return undefined;
    }
    return vehicles.find((vehicle) => vehicle.id === selectedVehicle);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/vehicles", {
        params: {
          search,
        },
      })
      .then(({ data }) => setVehicles(data))
      .catch((err) => console.log(err));
  }, [search]);

  return (
    <>
      <Header onSearch={setSearch} />
      <div className="vehicles">
        <AddVehicle onClick={() => null} />
        <Row gutter={30}>
          <Col span={12}>
            <VehiclesList list={vehicles} />
          </Col>
          <Col span={12}>
            <VehicleDescription vehicle={vehicles[0]} />
          </Col>
        </Row>
        {!!selectedVehicle && (
          <Row>
            <VehicleDescription vehicle={getVehicle()} />
          </Row>
        )}
      </div>
    </>
  );
}

export default Vehicles;
