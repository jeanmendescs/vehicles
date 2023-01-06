import axios from "axios";
import { useEffect, useState } from "react";

import AddVehicle from "../../components/AddVehicle";
import Header from "../../components/Header";
import VehiclesList from "../../components/VehiclesList";
import { IVehicle } from "../../types/interfaces";

function Vehicles() {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/vehicles")
      .then(({ data }) => setVehicles(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header onSearch={() => null} />
      <div className="vehicles">
        <AddVehicle onClick={() => null} />
        <VehiclesList list={vehicles} />
      </div>
    </div>
  );
}

export default Vehicles;
