import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SubHeader from ".";

describe("SubHeader", () => {
  it("should open the Modal after clicking on the button", async () => {
    const onModalOpenMock = jest.fn();
    render(<SubHeader onModalOpen={onModalOpenMock} />);

    const addButton = await screen.findByTestId("addButton");
    userEvent.click(addButton);

    expect(onModalOpenMock).toBeCalledWith({ isOpen: true, vehicleId: "" });
  });
});
