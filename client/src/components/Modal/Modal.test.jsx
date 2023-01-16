import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Modal from ".";

const vehicleId = "63c0214ba80c4dacf9349725";
const inputsNames = ["vehicle", "brand", "year", "description"];

describe("Modal", () => {
  it("should render empty input fields", async () => {
    render(<Modal vehicleId="" />);

    const vehicleInput = await screen.findByRole("textbox", {
      name: /vehicle/i,
    });
    const brandInput = await screen.findByRole("textbox", {
      name: /brand/i,
    });
    const yearInput = await screen.findByRole("spinbutton", {
      name: /year/i,
    });
    const switchInput = await screen.findByTestId("isSold");
    const descriptionInput = await screen.findByRole("textbox", {
      name: /description/i,
    });

    expect(vehicleInput).toHaveValue("");
    expect(brandInput).toHaveValue("");
    expect(yearInput).toHaveValue(0);
    expect(switchInput).toHaveValue("false");
    expect(descriptionInput).toHaveValue("");
  });

  it("should render input fields from vehicle", async () => {
    render(<Modal vehicleId={vehicleId} />);

    const vehicleInput = await screen.findByRole("textbox", {
      name: /vehicle/i,
    });
    const brandInput = await screen.findByRole("textbox", {
      name: /brand/i,
    });
    const yearInput = await screen.findByRole("spinbutton", {
      name: /year/i,
    });
    const switchInput = await screen.findByTestId("isSold");
    const descriptionInput = await screen.findByRole("textbox", {
      name: /description/i,
    });

    expect(vehicleInput).toHaveValue("Fusca");
    expect(brandInput).toHaveValue("Volks");
    expect(yearInput).toHaveValue(1950);
    expect(switchInput).toHaveValue("false");
    expect(descriptionInput).toHaveValue("A nice car");
  });

  it("should close the Modal after clicking on the Close button", async () => {
    const onModalCloseMock = jest.fn();
    render(<Modal vehicleId="" onModalClose={onModalCloseMock} />);

    const closeButton = await screen.findByRole("button", { name: "Close" });
    userEvent.click(closeButton);

    expect(onModalCloseMock).toBeCalledWith({ isOpen: false, vehicleId: "" });
  });

  it("should show validate error messages under every required input after clicking on Add button with empty inputs", async () => {
    render(<Modal vehicleId="" />);

    const addButton = await screen.findByRole("button", { name: "Add" });
    userEvent.click(addButton);

    const errorValidateMessages = await inputsNames.map((fieldName) =>
      screen.findByText(`The ${fieldName} is required`),
    );

    expect(errorValidateMessages).toHaveLength(inputsNames.length);
  });

  it("should post form data", async () => {
    render(<Modal vehicleId="" />);

    const vehicleInput = await screen.findByRole("textbox", {
      name: /vehicle/i,
    });
    const brandInput = await screen.findByRole("textbox", {
      name: /brand/i,
    });
    const yearInput = await screen.findByRole("spinbutton", {
      name: /year/i,
    });
    const descriptionInput = await screen.findByRole("textbox", {
      name: /description/i,
    });

    userEvent.type(vehicleInput, "Fusca");
    userEvent.type(brandInput, "Volks");
    userEvent.type(yearInput, "1950");
    userEvent.type(descriptionInput, "A nice car");

    const addButton = await screen.findByRole("button", { name: "Add" });
    userEvent.click(addButton);

    const successMessage = await screen.findByText(
      "Vehicle created successfully",
    );

    expect(successMessage).toBeInTheDocument();
  });

  it("should put form data", async () => {
    render(<Modal vehicleId={vehicleId} />);

    const vehicleInput = await screen.findByRole("textbox", {
      name: /vehicle/i,
    });

    const brandInput = await screen.findByRole("textbox", {
      name: /brand/i,
    });
    const yearInput = await screen.findByRole("spinbutton", {
      name: /year/i,
    });
    const switchInput = await screen.findByTestId("isSold");
    const descriptionInput = await screen.findByRole("textbox", {
      name: /description/i,
    });

    userEvent.clear(vehicleInput);
    userEvent.type(vehicleInput, "Voyage");

    expect(vehicleInput).toHaveValue("Voyage");
    expect(brandInput).toHaveValue("Volks");
    expect(yearInput).toHaveValue(1950);
    expect(switchInput).toHaveValue("false");
    expect(descriptionInput).toHaveValue("A nice car");

    const addButton = await screen.findByRole("button", { name: "Save" });
    userEvent.click(addButton);

    const successMessage = await screen.findByText(
      "Vehicle edited successfully",
    );

    expect(successMessage).toBeInTheDocument();
  });
});
