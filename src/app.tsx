import './App.css';
import "./assets/fonts/Barlow-SemiBold.ttf";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom';
import Trial from "./pages/Website/Trial/trial";
import React, {useState} from 'react';
import {createTheme, PaletteMode, ThemeProvider} from "@mui/material";
import Box from "@mui/material/Box";

function App() {

    const [mode, setMode] = useState<PaletteMode>('light'); // default to 'light'

    const theme = createTheme({
        palette: {
            mode: mode,
        },
    });

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };



    return (
      <>
          <div className="App">
              <ThemeProvider theme={theme}>
                  {/*<AppAppBar mode={mode} toggleColorMode={toggleColorMode} />*/}
                  <Box sx={{ bgcolor: 'background.default' }}>
                  <Routes>
                      <Route path="/" element={<Trial />} />
                      <Route path={"/trial"} element={<Trial />}/>
                  </Routes>
                  </Box>
                  {/* Other components that use the theme */}
              </ThemeProvider>
              {/*<Barra/>*/}
              {/*<ResponsiveAppBar/>*/}
          </div>

      </>

  );
}


export default App;

//https://colorhunt.co/palette/2c3333395b64a5c9cae7f6f2
