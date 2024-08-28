import './App.css';
import "./assets/fonts/Barlow-SemiBold.ttf";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom';
import Trial from "./pages/Website/Trial/trial";
import Menu from "./components/ui/menu"
import React, {useState} from 'react';
import {createTheme, PaletteMode, ThemeProvider} from "@mui/material";
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import 'tailwindcss/tailwind.css';
import Cytoscape from './pages/Website/cytoscape/cytoscape';

function App() {

    const [mode, setMode] = useState<PaletteMode>('dark'); // default to 'light'

    const theme = createTheme({
        palette: {
            mode: mode,
        },
    });



    return (
      <>
          
              <ThemeProvider theme={theme}>


                  <Routes>
                      <Route path="/" element={<Menu />} />
                      <Route path={"/cytoscape"} element={<Menu />}/>
                  </Routes>
                  <div>
                    <FullscreenComponent />
                    <MenuOverlay />
                    {/* Other content can go here, it will be interactable */}
                    <div className="mt-20 p-4">
                        <h1 className="text-2xl">Interactable Background Content</h1>
                        <p>This content is behind the fullscreen component but can still be interacted with.</p>
                    </div>
                </div>

              </ThemeProvider>


      </>

  );
}
const FullscreenComponent: React.FC = () => {
    return (
      <div
        className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50"
        style={{ pointerEvents: 'none' }}
      >
        {/* Fullscreen content goes here */}
        <div className="text-white text-center text-xl pt-20">
          {/* <Cytoscape /> */}
        </div>
      </div>
    );
  };
  
  const MenuOverlay: React.FC = () => {
    return (
      <AppBar position="fixed" className="bg-blue-600" style={{ zIndex: 1301 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ pointerEvents: 'auto' }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };


export default App;

//https://colorhunt.co/palette/2c3333395b64a5c9cae7f6f2
