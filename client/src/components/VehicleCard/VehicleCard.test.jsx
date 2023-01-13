import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import VehicleCard from ".";

import MOCK from "../../data/MOCK";
import getVehicle from "../../utils/get-vehicle";

const vehicleId = "63c0214ba80c4dacf9349725";
const vehicle = getVehicle(MOCK, vehicleId);

describe("VehiclesList", () => {
  it("should select a vehicle after clicking on the card", async () => {
    const onVehicleSelectMock = jest.fn();
    render(
      <VehicleCard
        brand={vehicle.brand}
        id={vehicle._id}
        isSold={vehicle.isSold}
        vehicle={vehicle.vehicle}
        year={vehicle.year}
        onVehicleSelect={onVehicleSelectMock}
      />,
    );

    const item = await screen.findByTestId(`vehicle-card-${vehicleId}`);
    userEvent.click(item);

    expect(onVehicleSelectMock).toBeCalledWith(vehicleId);
  });
});
