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





const Menu: React.FC<MenuProps> = ({ inputNodes, setInputNodes, inputReactions, setInputReactions, setTriggerUpdate, availableMetabolites, availableReactions,onProcessModel, currentModel }) => {

    const { models, loading, error } = useFetchModels();
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [metabolites, setMetabolites] = useState<string[]>(['']); 
    const [reactions, setReactions] = useState<string[]>(['']); 
    const [targetMetabolite, setTargetMetabolite] = useState<string>(''); 
    const [processingResult, setProcessingResult] = useState<any>(null);
    const [processingError, setProcessingError] = useState<string | null>(null);
    

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
        console.log("Target Metabolite:", targetMetabolite); // Example action: log to the console
        // Implement other actions related to the target metabolite
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
                                options={availableMetabolites}  // Provide list of available metabolites
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
                                options={availableReactions}
                            />
                            <Box ml={1}>
                                {/* Remove Reaction Button */}
                                <IconButton
                                    color="secondary"
                                    onClick={() => removeReactionField(index)}
                                    aria-label="remove reacción"
                                    disabled={reactions.length === 1} // Prevent removing the last field
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
                <Typography variant="h6" color="black">Target Metabolite</Typography>
                <Grid item>
                    <Box display="flex" flexDirection="column" alignItems="stretch"> {/* Changed to column layout */}
                        <MenuTextField
                            label="Target"
                            value={targetMetabolite}
                            onChange={(e, newValue) => handleTargetMetaboliteChange(e, newValue)}
                            placeholder="Enter target metabolite"
                            options={availableMetabolites}  
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            endIcon={<DrawIcon />}
                            sx={{ marginTop: 2, backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'lightgreen' } }}
                            onClick={handleTargetAction}
                        >
                            Draw
                        </Button>
                    </Box>
                </Grid>
            </Grid>


        </Container>
    );
};

export default Menu;
