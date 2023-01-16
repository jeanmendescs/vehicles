import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from ".";

describe("Header", () => {
  it("should receive user input", () => {
    const onSearchMock = jest.fn();
    render(<Header onSearch={onSearchMock} />);

    const input = screen.getByTestId("header-input");

    userEvent.clear(input);
    userEvent.type(input, "Fusca");

    expect(input).toHaveValue("Fusca");
  });
});
