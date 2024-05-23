import React, {useState} from 'react';
import {Textarea} from "@material-tailwind/react";
import { alpha } from '@mui/material';
import DrawIcon from '@mui/icons-material/Draw';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FileUpload from '../fileUpload/fileUpload';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import P5 from '../../pages/Website/p5/p5';
const Menu = () => {

    const [inputNodes, setInputNodes] = useState<string>('');
    const [inputReactions, setInputReactions] = useState<string>('');
    const [triggerUpdate, setTriggerUpdate] = useState(true);
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
        <>

            <Box
                id="hero"
            >

                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: { xs: 14, sm: 20, xl: 5 },
                        pb: { xs: 8, sm: 12, xl: 5},
                    }}
                >
                    <Typography variant="h2" align="center" gutterBottom>
                        MetaPeNTA
                    </Typography>
                    <Container maxWidth="xl">
                        <Grid container spacing={1} sx={{ '& .MuiGrid-item': { marginBottom: -4 } }}>
                            <Grid item xs={12} sm={3} xl={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-static-1"
                                    label="Pintar por metabolitos"
                                    value={inputNodes}
                                    onChange={handleInputNodes}
                                    multiline
                                    rows={4}
                                    placeholder="metabolito1, metabolito2, metabolito3"
                                    margin="normal"
                                    variant="outlined"
                                />
                                <Button variant="contained" endIcon={<DrawIcon />} sx={{
                                    backgroundColor: 'green',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'lightgreen',
                                    }}}
                                        onClick={handleDraw}
                                >
                                    Draw Reactions
                                </Button>


                            </Grid>
                            <Grid item xs={12} sm={3} xl={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-static-1"
                                    label="Pintar por reacciones"
                                    value={inputReactions}
                                    onChange={handleInputReactions}
                                    multiline
                                    rows={4}
                                    placeholder="requerimiento2"
                                    margin="normal"
                                    variant="outlined"
                                />
                                <Button variant="contained" endIcon={<DrawIcon />} sx={{
                                    backgroundColor: 'green',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'lightgreen',
                                    }}}
                                onClick={handleDraw}
                                >
                                    Draw Metabolites
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={3} xl={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-static-1"
                                    label="requerimiento3"
                                    multiline
                                    rows={4}
                                    placeholder="requerimiento3"
                                    margin="normal"
                                    variant="outlined"
                                />
                                <Button variant="contained" endIcon={<DrawIcon />} sx={{
                                    backgroundColor: 'green',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'lightgreen',
                                    }
                                }}>
                                    Req3
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={3} xl={3}>
                                <FileUpload setTriggerUpdate={setTriggerUpdate} />
                            </Grid>
                        </Grid>
                    </Container>

                    <P5 inputNodes={inputNodes} inputReactions={inputReactions} triggerUpdate={triggerUpdate} setTriggerUpdate={setTriggerUpdate} />

                </Container>
            </Box>
        </>
    );
}

export default Menu;