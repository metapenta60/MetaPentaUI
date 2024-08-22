import './App.css';
import "./assets/fonts/Barlow-SemiBold.ttf";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom';
import Trial from "./pages/Website/Trial/trial";
import React, {useState} from 'react';
import {createTheme, PaletteMode, ThemeProvider} from "@mui/material";

function App() {

    const [mode, setMode] = useState<PaletteMode>('light'); // default to 'light'

    const theme = createTheme({
        palette: {
            mode: mode,
        },
    });



    return (
      <>
          
              <ThemeProvider theme={theme}>
                  {/*<AppAppBar mode={mode} toggleColorMode={toggleColorMode} />*/}
                  <Routes>
                      <Route path="/" element={<Trial />} />
                      <Route path={"/cytoscape"} element={<Trial />}/>
                  </Routes>
                  
                  {/* Other components that use the theme */}
              </ThemeProvider>
              {/*<Barra/>*/}
              {/*<ResponsiveAppBar/>*/}

      </>

  );
}


export default App;

//https://colorhunt.co/palette/2c3333395b64a5c9cae7f6f2
