import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Menu from "./components/menu";
import React, { useState, useEffect } from 'react';
import { Box, createTheme, Drawer, PaletteMode, ThemeProvider, Container } from "@mui/material";
import Cytoscape from './components/cytoscape/cytoscape';
import { ReactionsData } from 'interfaces/types';
import { handleFileUpload } from './utils/fileUploadHandler';
import { handleProcessModelData } from './utils/processBiggModelDataHandler';
import { fileLoader } from './utils/fileLoader';
import AppHeader from './components/appHeader';


function App() {
  const [mode, setMode] = useState<PaletteMode>('dark');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [layoutName, setLayoutName] = useState<string>('elk');
  const [inputNodes, setInputNodes] = useState<string>('');
  const [inputReactions, setInputReactions] = useState<string>('');
  const [triggerUpdate, setTriggerUpdate] = useState(true);
  const [metabolites, setMetabolites] = useState<{ id: string; name: string }[]>([]);
  const [reactions, setReactions] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [bigModel,setBigModel] = useState<ReactionsData | null>(null);
  const [currentModel, setCurrentModel] = useState<string>('');

  console.log("This are the current availablemetabolites",metabolites)

  useEffect(() => {
    if (triggerUpdate && formData) {
      fileLoader(formData, setMetabolites, setReactions, setLoading, setError);
    }
  }, [triggerUpdate, formData]); 

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
    setLayoutName(layout);
    setTriggerUpdate(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppHeader
        handleDrawerOpen={handleDrawerOpen}
        handleLayoutChange={handleLayoutChange}
        handleFileUpload={(event) => 
          handleFileUpload(
            event, 
            setFormData, 
            setMetabolites, 
            setReactions, 
            setBigModel, 
            setCurrentModel, 
            setTriggerUpdate, 
            setError
          )}
      />

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
          keepMounted: true,
          hideBackdrop: true,
        }}
      >
        <Box sx={{ width: 350, padding: 2 }} role="presentation">
          <Menu
            inputNodes={inputNodes}
            setInputNodes={setInputNodes}
            inputReactions={inputReactions}
            setInputReactions={setInputReactions}
            triggerUpdate={triggerUpdate}
            setTriggerUpdate={setTriggerUpdate}
            availableMetabolites={metabolites}
            availableReactions={reactions}
            onProcessModel={(data: ReactionsData) => 
              handleProcessModelData(
                data, 
                setBigModel, 
                setMetabolites, 
                setReactions, 
                setTriggerUpdate
              )}      
            currentModel={currentModel}
          />
        </Box>
      </Drawer>

      <Container className="mt-20 p-4">
        <Cytoscape
          inputNodes={inputNodes}
          inputReactions={inputReactions}
          triggerUpdate={triggerUpdate}
          setTriggerUpdate={setTriggerUpdate}
          layoutName={layoutName}
          formData={formData}
          bigModel={bigModel}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
