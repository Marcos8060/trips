import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function FilterDistance({ setSelectedDistance }) {
  const handleChange = (event) => {
    setSelectedDistance(event.target.value);
  };

  return (
    <section className="my-4">
      <FormControl>
        <FormLabel className="text-gray" id="demo-row-radio-buttons-group-label">Distance</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          defaultValue="any"
          name="radio-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel value="any" label="Any"
            control={<Radio sx={{ color: '#8479D1', '&.Mui-checked': { color: '#8479D1' },transform: 'scale(0.9)' }} /> }
           />
          <FormControlLabel
            value="under3km"
            label="Under 3 km"
            control={<Radio sx={{ color: '#8479D1', '&.Mui-checked': { color: '#8479D1' },transform: 'scale(0.9)' }} />}
          />
          <FormControlLabel
            value="3to6km"
            control={<Radio sx={{ color: '#8479D1', '&.Mui-checked': { color: '#8479D1' },transform: 'scale(0.9)' }} />}
            label="3 to 6 km"
          />
          <FormControlLabel
            value="6to15km"
            control={<Radio sx={{ color: '#8479D1', '&.Mui-checked': { color: '#8479D1' },transform: 'scale(0.9)' }} />}
            label="6 to 15 km"
          />
          <FormControlLabel
            value="above15km"
            control={<Radio sx={{ color: '#8479D1', '&.Mui-checked': { color: '#8479D1' },transform: 'scale(0.9)' }} />}
            label="More than 15 km"
          />
        </RadioGroup>
      </FormControl>
    </section>
  );
}
