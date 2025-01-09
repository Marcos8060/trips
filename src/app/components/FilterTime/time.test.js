import { render, screen, fireEvent } from "@testing-library/react";
import FilterTime from "../FilterTime/index";
import React from "react";

describe("FilterTime Component", () => {
  it("should display the time filter radiogroup", () => {
    render(<FilterTime setSelectedTime={() => {}} />);

   
    const timeRadioGroup = screen.getByRole("radiogroup", { name: /time/i });
    expect(timeRadioGroup).toBeInTheDocument();
  });

  it("should apply the selected time filter", () => {
    const mockSetSelectedTime = jest.fn(); 
    render(<FilterTime setSelectedTime={mockSetSelectedTime} />);

    const under5minsOption = screen.getByLabelText(/under 5 min/i);

    fireEvent.click(under5minsOption);

    expect(mockSetSelectedTime).toHaveBeenCalledWith("under5mins");
  });

  it("should render all time filter options", () => {
    render(<FilterTime setSelectedTime={() => {}} />);

    expect(screen.getByLabelText(/any/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/under 5 min/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/5 - 10 min/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/10 - 20 mins/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/above 20 min/i)).toBeInTheDocument();
  });
});
