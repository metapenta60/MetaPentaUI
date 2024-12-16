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
  options?: string[];  // autocomplete options
}

const MenuTextField: React.FC<MenuTextFieldProps> = ({
  id = 'outlined-multiline-static',
  label,
  value,
  onChange,
  placeholder = '',
  rows = 1,
  options = [],  
}) => {
  return options.length > 0 ? (
    <Autocomplete
      freeSolo
      options={options}
      value={value}
      onInputChange={(event, newInputValue) => {
        if (event === null) {
          onChange(null, newInputValue); 
        } else {
          onChange(event as React.ChangeEvent<HTMLInputElement>, newInputValue);
        }
      }}
      sx={{ width: '100%' }}  
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
