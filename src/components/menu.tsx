import React, { useState } from 'react';
import DrawIcon from '@mui/icons-material/Draw';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuTextField from './textFields/menuTextField';
import useFetchModels from '../API/fetch/fetchBiggModels';
import { MenuProps } from '../interfaces/types';
import { handleProcessModel } from '../utils/processBiggModelDataHandler';
import axios from 'axios';





const Menu: React.FC<MenuProps> = ({ inputNodes,
     setInputNodes, inputReactions, setInputReactions,
      setTriggerUpdate, availableMetabolites,
       availableReactions,onProcessModel, currentModel,
        setCurrentModel, bigModel, formData, selectedModel, setSelectedModel }) => {

    const { models, loading, error } = useFetchModels();
    const [metabolites, setMetabolites] = useState<string[]>(['']); 
    const [reactions, setReactions] = useState<string[]>(['']); 
    const [targetMetabolite, setTargetMetabolite] = useState<string>(''); 
    const [processingResult, setProcessingResult] = useState<any>(null);
    const [processingError, setProcessingError] = useState<string | null>(null);
    const [originId, setOriginId] = useState<string>('');
    const [destinationId, setDestinationId] = useState<string>('');
    const [path, setPath] = useState<string[]>([]);

    console.log("SelectedModel:",selectedModel);
    console.log("currentModel:",currentModel);
    console.log("availableReactions:",availableReactions);

    const handleOriginIdChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null, newValue?: string) => {
        const selectedMetabolite = availableMetabolites.find(metabolite => `${metabolite.name} - ${metabolite.id}` === newValue);
        if (selectedMetabolite) {
            setOriginId(selectedMetabolite.id); 
        }
        
    };

    const handleDestinationIdChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null, newValue?: string) => {
        const selectedMetabolite = availableMetabolites.find(metabolite => `${metabolite.name} - ${metabolite.id}` === newValue);
        if (selectedMetabolite) {
            setDestinationId(selectedMetabolite.id); 
        }
    };

    const handleShortestPath = async () => {
        try {
          if (!originId || !destinationId) {
            console.error("Please select both origin and destination metabolites.");
            return;
          }
      
          if (formData) {
            console.log("Using uploaded model for shortest path calculation.");
            
            const formDataWithParams = formData;
            formDataWithParams.append("originId", originId);
            formDataWithParams.append("destinationId", destinationId);
      
            const response = await axios.post(
              "http://localhost:8080/metabolite/shortest-path",
              formDataWithParams,
              { headers: { "Content-Type": "multipart/form-data" } }
            );
      
            const reactionIds = response.data.path;
            const reactionNames = reactionIds.map(id => {
              const reaction = availableReactions.find(r => r.id === id);
              return reaction ? reaction.name : id;
            });
      
            setReactions(reactionNames);
            setInputReactions(reactionNames.join(","));
            setTriggerUpdate(true);
          } 
          else if (selectedModel) {
            console.log("Using BiGG model for shortest path calculation.");
      
            const fileResponse = await axios.get(
              `http://localhost:8080/bigg/models/${selectedModel}/download`,
              { responseType: "blob" }
            );
      
            const fileBlob = fileResponse.data;
            const formData = new FormData();
            formData.append("file", new File([fileBlob], `${selectedModel}.xml`));
            formData.append("originId", originId);
            formData.append("destinationId", destinationId);
      
            const response = await axios.post(
              "http://localhost:8080/metabolite/shortest-path",
              formData,
              { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log("Reactions to paint after fetching shortestPath Reactions",response)
      
            const reactionIds = response.data.path;
            const reactionNames = reactionIds.map(id => {
              const reaction = availableReactions.find(r => r.id === id);
              return reaction ? reaction.name : id;
            });
      
            setReactions(reactionNames);
            setInputReactions(reactionNames.join(","));
            setTriggerUpdate(true);
          } else {
            console.error("No model selected or uploaded. Please select or upload a model.");
          }
        } catch (error) {
          console.error("Error calculating shortest path:", error);
        }
      };

    const handleModelChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null, newValue?: string) => {
        const model = models.find((m) => `${m.bigg_id} - ${m.organism}` === newValue);
        if (model) {
            setSelectedModel(model.bigg_id);
            currentModel = selectedModel;
        }

    };
    
    const handleMetaboliteChange = (index: number, value: string) => {
        const updatedMetabolites = [...metabolites];
        updatedMetabolites[index] = value;
        setMetabolites(updatedMetabolites);
    };

    const handleTargetMetaboliteChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null, newValue?: string) => {
        if (newValue !== undefined) {
            setTargetMetabolite(newValue);
        } else if (event !== null) {
            setTargetMetabolite(event.target.value);
        }
    };

    const addMetaboliteField = () => {
        setMetabolites([...metabolites, '']); 
    };

    const removeMetaboliteField = (index: number) => {
        const updatedMetabolites = metabolites.filter((_, i) => i !== index);
        setMetabolites(updatedMetabolites);
    };

    const handleReactionChange = (index: number, value: string) => {
        const updatedReactions = [...reactions];
        updatedReactions[index] = value;
        setReactions(updatedReactions);
    };

    const addReactionField = () => {
        setReactions([...reactions, '']); 
    };

    const removeReactionField = (index: number) => {
        const updatedReactions = reactions.filter((_, i) => i !== index);
        setReactions(updatedReactions);
    };

    const handleDraw = () => {
        setInputNodes(metabolites.join(','));
        setInputReactions(reactions.join(','));
        setTriggerUpdate(true);
    };

    const handleTargetAction = () => {
        console.log("Target Metabolite:", targetMetabolite); 
    };

    return (
        <Container
            sx={{
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: 2,
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                MetaPeNTA
            </Typography>
            <Typography variant="h6" color="black">Load a Bigg Model</Typography>
            {/* Model Selection using MenuTextField */}
            {loading ? (
                <Typography>Loading models...</Typography>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <>
                <MenuTextField
                    label="Select Bigg Model"
                    value={currentModel}
                    onChange={handleModelChange}
                    placeholder="Type or select a model"
                    options={models.map((model) => `${model.bigg_id} - ${model.organism}`)}
                />
                <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'lightgreen' } }}
                        onClick={() =>
                            handleProcessModel(
                              setCurrentModel,
                              selectedModel,
                              onProcessModel,
                              setProcessingError
                            )
                          }
                    >
                        Render Bigg Model
                    </Button>
                   <br/> 
                </>
                
            )}

            {/* Dynamic Metabolites Fields */}
            <Grid container direction="column" spacing={2}>
                <Typography variant="h6" color="black">Draw Metabolites</Typography>
                {metabolites.map((metabolite, index) => (
                    <Grid item key={index}>
                        <Box display="flex" alignItems="center">
                            <MenuTextField
                                label={`Metabolito ${index + 1}`}
                                value={metabolite}
                                onChange={(e, newValue) => handleMetaboliteChange(index, newValue || e?.target.value || '')} // Handle both event and Autocomplete change
                                placeholder={`metabolito ${index + 1}`}
                                options={[...new Set(availableMetabolites.map(metabolite => metabolite.name))]}
                            />
                            <Box ml={1}>
                                {/* Remove Metabolite Button */}
                                <IconButton
                                    color="secondary"
                                    onClick={() => removeMetaboliteField(index)}
                                    aria-label="remove metabolito"
                                    disabled={metabolites.length === 1} // Prevent removing the last field
                                >
                                    <DeleteOutlineIcon />
                                </IconButton>

                                {/* Add Metabolite Button (only on the last field) */}
                                {index === metabolites.length - 1 && (
                                    <IconButton
                                        color="primary"
                                        onClick={addMetaboliteField}
                                        aria-label="add metabolito"
                                    >
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Button to trigger drawing */}
            <Button
                fullWidth
                variant="contained"
                endIcon={<DrawIcon />}
                sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'lightgreen' } }}
                onClick={handleDraw}
            >
                Draw
            </Button>

            <br/>

            {/* Dynamic Reactions Fields */}
            <Grid container direction="column" spacing={1}>
            <Typography variant="h6" color="black">Draw Reactions</Typography>
                {reactions.map((reaction, index) => (
                    <Grid item key={index}>
                        <Box display="flex" alignItems="center">
                            <MenuTextField
                                label={`Reacción ${index + 1}`}
                                value={reaction}
                                onChange={(e, newValue) => handleReactionChange(index, newValue || e?.target.value || '')}
                                placeholder={`reacción ${index + 1}`}
                                options={[...new Set(availableReactions.map(reaction => reaction.name))]}
                            />
                            <Box ml={1}>
                                {/* Remove Reaction Button */}
                                <IconButton
                                    color="secondary"
                                    onClick={() => removeReactionField(index)}
                                    aria-label="remove reacción"
                                    disabled={reactions.length === 1} 
                                >
                                    <DeleteOutlineIcon />
                                </IconButton>

                                {/* Add Reaction Button (only on the last field) */}
                                {index === reactions.length - 1 && (
                                    <IconButton
                                        color="primary"
                                        onClick={addReactionField}
                                        aria-label="add reacción"
                                    >
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Button
                fullWidth
                variant="contained"
                endIcon={<DrawIcon />}
                sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'lightgreen' } }}
                onClick={handleDraw}
            >
                Draw
            </Button>
            <br />
            <Grid container direction="column" spacing={1}>
                <Typography variant="h6" color="black">Shortest Path</Typography>
                <Grid item>
                    {/* Origin ID Field */}
                    <MenuTextField
                        label="Select Origin Metabolite"
                        value={originId}
                        onChange={handleOriginIdChange}
                        placeholder="Type or select an origin metabolite"
                        options={availableMetabolites.map(metabolite => `${metabolite.name} - ${metabolite.id}`)}
                    />
                    <br/>

                    {/* Destination ID Field */}
                    <MenuTextField
                        label="Select Destination Metabolite"
                        value={destinationId}
                        onChange={handleDestinationIdChange}
                        placeholder="Type or select a destination metabolite"
                        options={availableMetabolites.map(metabolite => `${metabolite.name} - ${metabolite.id}`)}
                    />
                    <br/>
                    {/* Button to calculate shortest path */}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'lightgreen' } }}
                        onClick={handleShortestPath}
                    >
                        Calculate Shortest Path
                    </Button>
                </Grid>
            </Grid>


        </Container>
    );
};

export default Menu;
