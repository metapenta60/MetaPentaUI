import React, {useState} from 'react';
import DrawIcon from '@mui/icons-material/Draw';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FileUpload from '../fileUpload/fileUpload';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import P5 from '../../pages/Website/p5/p5';
import Cytoscape from "../../pages/Website/cytoscape/cytoscape";
import {useLocation} from "react-router-dom";
import MenuTextField from './textFields/menuTextField';

interface MenuProps {
    inputNodes: string;
    setInputNodes: (value: string) => void;
    inputReactions: string;
    setInputReactions: (value: string) => void;
    triggerUpdate: boolean;
    setTriggerUpdate: (value: boolean) => void;
}
const Menu: React.FC<MenuProps> = ({ inputNodes, setInputNodes, inputReactions, setInputReactions, setTriggerUpdate }) => {
    

    const handleInputNodes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputNodes(event.target.value);
    };

    const handleInputReactions = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputReactions(event.target.value);
    };

    const handleDraw = () => {
        setTriggerUpdate(true);
    };

    return (
        <Container
            sx={{
                padding: 2,
                display: 'flex',
                flexDirection: 'column', // Stack items vertically
                alignItems: 'stretch',   // Make sure items take full width
                gap: 2,                  // Add spacing between items
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                MetaPeNTA
            </Typography>

            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <MenuTextField
                        label="Metabolitos"
                        value={inputNodes}
                        onChange={handleInputNodes}
                        placeholder="metabolito1, metabolito2, metabolito3"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        endIcon={<DrawIcon />}
                        sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'lightgreen' } }}
                        onClick={handleDraw}
                    >
                        Dibujar Metabolitos
                    </Button>
                </Grid>

                <Grid item>
                    <MenuTextField
                        label="Reacciones"
                        value={inputReactions}
                        onChange={handleInputReactions}
                        placeholder="reacción1, reacción2, reacción3"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        endIcon={<DrawIcon />}
                        sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'lightgreen' } }}
                        onClick={handleDraw}
                    >
                        Dibujar Reacciones
                    </Button>
                </Grid>

                <Grid item>
                    <MenuTextField
                        label="Req3"
                        value=""
                        onChange={undefined}
                        placeholder="req3, req3, req3"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        endIcon={<DrawIcon />}
                        sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'lightgreen' } }}
                    >
                        Req3
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Menu;