import { screen, render } from "@testing-library/react";

import VehiclesList from ".";

import MOCK from "../../data/MOCK";

describe("VehiclesList", () => {
  it("should render an empty list", () => {
    render(<VehiclesList />);

    const vehicle = screen.queryByText(/Fusca/i);
    const brand = screen.queryByText(/Volks/i);
    const year = screen.queryByText(/1950/i);

    expect(vehicle).not.toBeInTheDocument();
    expect(brand).not.toBeInTheDocument();
    expect(year).not.toBeInTheDocument();
  });

  it("should render at least a vehicle", async () => {
    render(<VehiclesList list={MOCK} onVehicleSelect={() => null} />);

    const vehicle = await screen.findByText(/Fusca/i);
    const brand = await screen.findByText(/Volks/i);
    const year = await screen.findByText(/1950/i);

    expect(vehicle).toBeInTheDocument();
    expect(brand).toBeInTheDocument();
    expect(year).toBeInTheDocument();
  });
});
