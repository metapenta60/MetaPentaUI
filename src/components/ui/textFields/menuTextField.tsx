import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface MenuTextFieldProps {
  id?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null, newValue?: string) => void;
  placeholder?: string;
  rows?: number;
  options?: string[];  // List of options for Autocomplete
}

const MenuTextField: React.FC<MenuTextFieldProps> = ({
  id = 'outlined-multiline-static',
  label,
  value,
  onChange,
  placeholder = '',
  rows = 1,
  options = [],  // Default to an empty array
}) => {
  return options.length > 0 ? (
    // Render Autocomplete if options are provided
    <Autocomplete
      freeSolo
      options={options}
      value={value}
      onInputChange={(event, newInputValue) => {
        // Handle the case where `event` is null
        if (event === null) {
          onChange(null, newInputValue); // Handle Autocomplete selection with no event
        } else {
          onChange(event as React.ChangeEvent<HTMLInputElement>, newInputValue);
        }
      }}
      sx={{ width: '100%' }}  // Ensure Autocomplete takes full width
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          id={id}
          label={label}
          placeholder={placeholder}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#000",
              fontFamily: "Arial",
              fontWeight: "bold",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2e2e2e",
                borderWidth: "2px",
              },
            },
            "& .MuiInputLabel-outlined": {
              color: "#2e2e2e",
              fontWeight: "bold",
            },
          }}
        />
      )}
    />
  ) : (
    // Render standard TextField if no options are provided
    <TextField
      fullWidth
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      multiline
      rows={rows}
      placeholder={placeholder}
      margin="normal"
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "#000",
          fontFamily: "Arial",
          fontWeight: "bold",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2e2e2e",
            borderWidth: "2px",
          },
        },
        "& .MuiInputLabel-outlined": {
          color: "#2e2e2e",
          fontWeight: "bold",
        },
      }}
    />
  );
};

export default MenuTextField;
