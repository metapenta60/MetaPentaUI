import React, {useState} from 'react';
import {Textarea} from "@material-tailwind/react";
import { alpha } from '@mui/material';
import DrawIcon from '@mui/icons-material/Draw';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import P5 from '../../pages/Website/p5/p5';
const Menu = () => {

    const [inputNodes, setInputNodes] = useState<string>('');
    const [triggerUpdate, setTriggerUpdate] = useState(true);
    const handleInputNodes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputNodes(event.target.value);
    };

    const handleDraw = () => {
        setTriggerUpdate(true);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

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
                            <Grid item xs={12} sm={3} xl={3}>
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
                            {/*<DataGrid*/}
                            {/*    rows={rows}*/}
                            {/*    columns={columns}*/}
                            {/*    initialState={{*/}
                            {/*        pagination: {*/}
                            {/*            paginationModel: { page: 0, pageSize: 5 },*/}
                            {/*        },*/}
                            {/*    }}*/}
                            {/*    pageSizeOptions={[5, 10]}*/}

                            {/*/>*/}
                        </Grid>
                    </Container>

                    <P5 inputNodes={inputNodes} triggerUpdate={triggerUpdate} setTriggerUpdate={setTriggerUpdate} />

                </Container>
            </Box>
        </>
    );
}

export default Menu;