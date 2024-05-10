import React, {useState} from "react";
import Menu from "../../../components/ui/menu";
import Box from "@mui/material/Box";
import {Container, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import P5 from "../p5/p5";
const Trial  = () => {


    return (
        <>
            <Box
                id="hero"
                sx={(theme) => ({
                    width: '100%',
                    backgroundImage:
                        theme.palette.mode === 'light'
                            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                            : `linear-gradient(#02294F, ${alpha('#090E10')})`,
                    backgroundSize: '100% 20%',
                    backgroundRepeat: 'no-repeat',
                })}
            >

                <Box sx={{ display: 'flex' }}>

                        <Container sx={{ mt: 4, mb: 4, width:'100%'}}>
                            <Grid container spacing={3}>
                                {/* Chart */}
                                <Grid item xs={12} md={8} lg={9} >
                                    <Menu/>

                                </Grid>
                                <Grid item xs={12} md={4} lg={3} sx={{mt:12}}>
                                    <Paper
                                        sx={{
                                            pt:10,
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 260,
                                        }}
                                    >
                                        Name: <br/>
                                        Type: <br/>
                                        Reactants: <br/>



                                        {/*<div/>*/}
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                </Box>
            </Box>
        </>

    );
};

export default Trial;