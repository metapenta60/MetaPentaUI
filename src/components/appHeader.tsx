import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface AppHeaderProps {
  handleDrawerOpen: () => void;
  handleLayoutChange: (layout: string) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  handleDrawerOpen, 
  handleLayoutChange, 
  handleFileUpload 
}) => {
  return (
    <AppBar position="fixed" className="bg-blue-600" style={{ zIndex: 1301 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Metapenta
        </Typography>

        {/* Layout change buttons */}
        <Button color="inherit" onClick={() => handleLayoutChange('elk')}>ELK Layout</Button>
        <Button color="inherit" onClick={() => handleLayoutChange('dagre')}>Dagre Layout</Button>
        <Button color="inherit" onClick={() => handleLayoutChange('cola')}>Cola Layout</Button>
        <Button color="inherit" onClick={() => handleLayoutChange('klay')}>Klay Layout</Button>

        {/* File upload button */}
        <input
          type="file"
          accept=".xml"
          style={{ display: 'none' }}
          id="file-upload"
          onChange={handleFileUpload}
        />
        <label htmlFor="file-upload">
          <Button color="inherit" component="span">
            Upload File
          </Button>
        </label>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
