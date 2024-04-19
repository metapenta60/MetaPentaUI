import React, {useState} from 'react';
import {Textarea} from "@material-tailwind/react";
import { alpha } from '@mui/material';
import DrawIcon from '@mui/icons-material/Draw';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Sketch from '../../pages/Website/Trial/sketch';
const Menu = () => {

    const [inputNodes, setInputNodes] = useState<string>('');
    const [triggerUpdate, setTriggerUpdate] = useState(true);
    const handleInputNodes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputNodes(event.target.value);
    };

    const handleDraw = () => {
        setTriggerUpdate(true);
    };



    return (
        <>

            <Box
                id="hero"
                sx={(theme) => ({
                    width: '100%',
                    backgroundImage:
                        theme.palette.mode === 'light'
                            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                    backgroundSize: '100% 20%',
                    backgroundRepeat: 'no-repeat',
                })}
            >

                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: { xs: 14, sm: 20 },
                        pb: { xs: 8, sm: 12 },
                    }}
                >
                    <Typography variant="h2" align="center" gutterBottom>
                        MetaPeNTA
                    </Typography>
                    <Container maxWidth="md">
                        <Grid container spacing={10} sx={{ '& .MuiGrid-item': { marginBottom: -4 } }}>
                            <Grid item xs={12} sm={4} xl={4}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-static-1"
                                    label="Set de metabolitos a pintar"
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
                                    Draw
                                </Button>


                            </Grid>
                            <Grid item xs={12} sm={4} xl={4}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-static-1"
                                    label="requerimiento2"
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
                                    }
                                }}>
                                    Req2
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={4} xl={4}>
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

                        </Grid>
                    </Container>

                    <Sketch inputNodes={inputNodes} triggerUpdate={triggerUpdate} setTriggerUpdate={setTriggerUpdate} />

                </Container>
            </Box>
        </>
    );
}

export default Menu;