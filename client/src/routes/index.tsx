import { Routes as Container, Route } from "react-router-dom";
import Login from "../pages/Login";
import Vehicles from "../pages/Vehicles";

function Routes() {
  return (
    <Container>
      <Route path="/" element={<Login />} />
      <Route path="/vehicles" element={<Vehicles />} />
    </Container>
  );
}

export default Routes;
