import './App.css';
import "./assets/fonts/Barlow-SemiBold.ttf";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Menu from "./components/ui/menu";
import React, { useState, useMemo, useEffect } from 'react';
import { Box, Button, createTheme, Drawer, PaletteMode, ThemeProvider, Toolbar, AppBar, Typography, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Cytoscape from './pages/Website/cytoscape/cytoscape';
import { fetchReactions } from './API/fetch/reactions';
import axios from 'axios';

interface ReactionsData {
  metabolites: Record<string, any>;
  reactions: Record<string, any>;
}

function App() {
  const [mode, setMode] = useState<PaletteMode>('dark');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [inputNodes, setInputNodes] = useState<string>('');
  const [inputReactions, setInputReactions] = useState<string>('');
  const [triggerUpdate, setTriggerUpdate] = useState(true);
  const [layoutName, setLayoutName] = useState<string>('elk');
  const [metabolites, setMetabolites] = useState<string[]>([]);
  const [reactions, setReactions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Upload file and send POST request to /upload endpoint
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file); // The key name 'file' must match what is expected on the backend

    try {
      // Sending POST request to the backend to upload the file
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the metabolites and reactions after the file is uploaded successfully
      const data: ReactionsData = response.data;

      // Extract metabolites and reactions into arrays
      const metabolitesArray = Array.from(new Set(Object.values(data.metabolites).map(metabolite => metabolite.name)));
      const reactionsArray = Array.from(new Set(Object.values(data.reactions).map(reaction => reaction.name)));

      setMetabolites(metabolitesArray);
      setReactions(reactionsArray);
      setTriggerUpdate(true); // Trigger update to re-render Cytoscape with new data

    } catch (error) {
      console.error("Error uploading file:", error);
      setError('Failed to upload and process the file');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data: ReactionsData = await fetchReactions();

        const metabolitesArray = Array.from(new Set(Object.values(data.metabolites).map(metabolite => metabolite.name)));
        const reactionsArray = Array.from(new Set(Object.values(data.reactions).map(reaction => reaction.name)));

        setMetabolites(metabolitesArray);
        setReactions(reactionsArray);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    loadData();  // Fetch initial data at the start of the app
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
            accept=".json"
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
