import './App.css';
import "./assets/fonts/Barlow-SemiBold.ttf";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Menu from "./components/ui/menu"
import React, {useState} from 'react';
import {Box, Button, createTheme, Drawer, PaletteMode, ThemeProvider} from "@mui/material";
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import 'tailwindcss/tailwind.css';
import Cytoscape from './pages/Website/cytoscape/cytoscape';

function App() {
  const [mode, setMode] = useState<PaletteMode>('dark');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [inputNodes, setInputNodes] = useState<string>('');
    const [inputReactions, setInputReactions] = useState<string>('');
    const [triggerUpdate, setTriggerUpdate] = useState(true);
    const [layoutName, setLayoutName] = useState<string>('elk'); // Default layout

  const theme = createTheme({
      palette: {
          mode: mode,
      },
  });

  const handleDrawerOpen = () => {
      setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
      setIsDrawerOpen(false);
  };

  const handleLayoutChange = (layout: string) => {
    console.log(`Switching to layout: ${layout}`);
    setLayoutName(layout);
    setTriggerUpdate(true); // Trigger update to re-render Cytoscape with the new layout
  };

  return (
      <ThemeProvider theme={theme}>
          <AppBar position="fixed" className="bg-blue-600" style={{ zIndex: 1301 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Metapenta
                    </Typography>

                    {/* Add four buttons to the AppBar */}
                    <Button color="inherit" onClick={() => handleLayoutChange('elk')}>ELK Layout</Button>
                    <Button color="inherit" onClick={() => handleLayoutChange('dagre')}>Dagre Layout</Button>
                    <Button color="inherit" onClick={() => handleLayoutChange('cola')}>Cola Layout</Button>
                    <Button color="inherit" onClick={() => handleLayoutChange('klay')}>Klay Layout</Button>
                </Toolbar>
          </AppBar>

          <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={handleDrawerClose}
                sx={{
                    width: 350,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 350,
                        boxSizing: 'border-box',
                        background: 'white',
                    },
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    hideBackdrop: true, // Hides the default backdrop
                }}
            >
              {/* Menu Component inside the Drawer */}
              <Box
                  sx={{
                      width: 350,
                      padding: 2,
                  }}
                  role="presentation"
              >
                  <Menu
                        inputNodes={inputNodes}
                        setInputNodes={setInputNodes}
                        inputReactions={inputReactions}
                        setInputReactions={setInputReactions}
                        triggerUpdate={triggerUpdate}
                        setTriggerUpdate={setTriggerUpdate}
                    />
              </Box>
          </Drawer>

          <div className="mt-20 p-4">
              <Cytoscape
                inputNodes={inputNodes}
                inputReactions={inputReactions}
                triggerUpdate={triggerUpdate}
                setTriggerUpdate={setTriggerUpdate}
                layoutName={layoutName}
              />
          </div>
      </ThemeProvider>
  );
}

export default App;

//https://colorhunt.co/palette/2c3333395b64a5c9cae7f6f2
