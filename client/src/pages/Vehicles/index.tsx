import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

import AddVehicle from "../../components/AddVehicle";
import Header from "../../components/Header";
import VehiclesList from "../../components/VehiclesList";
import { IVehicle } from "../../types/interfaces";

function Vehicles() {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/vehicles")
      .then(({ data }) => setVehicles(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header onSearch={setSearch} />
      <div className="vehicles">
        <AddVehicle onClick={() => null} />
        <Row>
          <Col span={selectedVehicle ? 12 : 24}>
            <VehiclesList list={vehicles} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Vehicles;
