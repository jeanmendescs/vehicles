import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import VehicleDescription from ".";
import MOCK from "../../data/MOCK";
import getVehicle from "../../utils/get-vehicle";

const vehicleId = "63c0214ba80c4dacf9349725";
const vehicle = getVehicle(MOCK, vehicleId);

describe("VehicleDescription", () => {
  it("should render a vehicle", async () => {
    render(<VehicleDescription vehicle={vehicle} />);

    const title = await screen.findByText(/Fusca/i);
    const brand = await screen.findByText(/Volks/i);
    const year = await screen.findByText(/1950/i);
    const description = await screen.findByText(/A nice car/i);

    expect(title).toBeInTheDocument();
    expect(brand).toBeInTheDocument();
    expect(year).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("should open a Modal to edit a vehicle after clicking on a button", async () => {
    const onEditClickMock = jest.fn();
    render(
      <VehicleDescription vehicle={vehicle} onEditClick={onEditClickMock} />,
    );

    const button = await screen.findByRole("button", { name: "Edit" });
    userEvent.click(button);

    expect(onEditClickMock).toBeCalledWith(vehicleId);
  });
});
