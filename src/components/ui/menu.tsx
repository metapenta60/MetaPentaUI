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

interface MenuProps {
    inputNodes: string;
    setInputNodes: (value: string) => void;
    inputReactions: string;
    setInputReactions: (value: string) => void;
    triggerUpdate: boolean;
    setTriggerUpdate: (value: boolean) => void;
    availableMetabolites: string[]
    availableReactions: string[]

}

const Menu: React.FC<MenuProps> = ({ inputNodes, setInputNodes, inputReactions, setInputReactions, setTriggerUpdate, availableMetabolites, availableReactions }) => {
    // State to manage dynamic metabolitos inputs
    const [metabolites, setMetabolites] = useState<string[]>(['']); // Initially, one input field
    // State to manage dynamic reactions inputs
    const [reactions, setReactions] = useState<string[]>(['']); // Initially, one input field

    // console.log('availablemetabolites Inside Menu:', availableMetabolites)

    // Handle dynamic input change for metabolites
    const handleMetaboliteChange = (index: number, value: string) => {
        const updatedMetabolites = [...metabolites];
        updatedMetabolites[index] = value;
        setMetabolites(updatedMetabolites);
    };

    // Add a new metabolite input field
    const addMetaboliteField = () => {
        setMetabolites([...metabolites, '']); // Add a new empty input at the end
    };

    // Remove a metabolite input field
    const removeMetaboliteField = (index: number) => {
        const updatedMetabolites = metabolites.filter((_, i) => i !== index);
        setMetabolites(updatedMetabolites);
    };

    // Handle dynamic input change for reactions
    const handleReactionChange = (index: number, value: string) => {
        const updatedReactions = [...reactions];
        updatedReactions[index] = value;
        setReactions(updatedReactions);
    };

    // Add a new reaction input field
    const addReactionField = () => {
        setReactions([...reactions, '']); // Add a new empty input at the end
    };

    // Remove a reaction input field
    const removeReactionField = (index: number) => {
        const updatedReactions = reactions.filter((_, i) => i !== index);
        setReactions(updatedReactions);
    };

    const handleDraw = () => {
        // Convert the metabolites and reactions arrays into comma-separated strings and pass them to inputNodes and inputReactions
        setInputNodes(metabolites.join(','));
        setInputReactions(reactions.join(','));
        setTriggerUpdate(true);
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
        </Container>
    );
};

export default Menu;
