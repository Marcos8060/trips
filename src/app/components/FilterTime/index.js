import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function FilterTime({ setSelectedTime }) {
  const handleChange = (event) => {
    setSelectedTime(event.target.value);
  };

  return (
    <section className="my-4">
      <FormControl>
        <FormLabel className="text-gray" id="demo-row-radio-buttons-group-label">Time</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          defaultValue="any"
          name="radio-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel value="any" 
          control={<Radio sx={{ color: '#8479D1', '&.Mui-checked': { color: '#8479D1' },transform: 'scale(0.9)' }} /> }
           label="Any" />
          <FormControlLabel
            value="under5mins"
            control={
              <Radio
                sx={{
                  color: "#8479D1",
                  "&.Mui-checked": { color: "#8479D1" },
                  transform: "scale(0.9)",
                }}
              />
            }
            label="Under 5 min"
          />
          <FormControlLabel
            value="5to10mins"
            control={<Radio sx={{ color: '#8479D1', '&.Mui-checked': { color: '#8479D1' },transform: 'scale(0.9)' }} /> }
            label="5 - 10 min"
          />
          <FormControlLabel
            value="10to20mins"
            control={<Radio sx={{ color: '#8479D1', '&.Mui-checked': { color: '#8479D1' },transform: 'scale(0.9)' }} /> }
            label="10 - 20 mins"
          />
          <FormControlLabel
            value="morethan20mins"
            control={<Radio sx={{ color: '#8479D1', '&.Mui-checked': { color: '#8479D1' },transform: 'scale(0.9)' }} /> }
            label="Above 20 min"
          />
        </RadioGroup>
      </FormControl>
    </section>
  );
}
