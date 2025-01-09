import { render, screen, fireEvent } from '@testing-library/react';
import FilterDistance from '../FilterDistance/index';
import React from 'react';

describe('FilterDistance Component', () => {
  it('should display the distance filter radiogroup', () => {
    render(<FilterDistance />);

    const distanceRadioGroup = screen.getByRole('radiogroup', { name: /distance/i });
    expect(distanceRadioGroup).toBeInTheDocument();
  });

  it('should apply selected distance filter', () => {
    const mockSetSelectedDistance = jest.fn();
    render(<FilterDistance setSelectedDistance={mockSetSelectedDistance} />);

    const under3kmRadio = screen.getByLabelText(/Under 3 km/i);

    
    fireEvent.click(under3kmRadio);

   
    expect(mockSetSelectedDistance).toHaveBeenCalledWith('under3km');
  });
});
