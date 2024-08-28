import React from 'react';
import TextField from '@mui/material/TextField';

interface MenuTextFieldProps {
  id?: string;
  label: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | null;
  placeholder?: string;
  rows?: number;
}

const MenuTextField: React.FC<MenuTextFieldProps> = ({
  id = 'outlined-multiline-static',
  label,
  value,
  onChange,
  placeholder = '',
  rows = 4,
}) => {
  return (
    <TextField
      fullWidth
      id={id}
      label={label}
      value={value}
      onChange={onChange || undefined}
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
