import React, { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    Modal,
    Button,
    InputLabel,
    TextField,
    Grid,
    Card,
    CardContent,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from '@mui/material'
import {
    Edit,
    AddHome,
} from '@mui/icons-material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
};

const EditPropertyModal = (props) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [newProperty, setNewProperty] = useState(props.property);

    const createProperty = () => {
        console.log(newProperty)
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProperty),
        };
        fetch("http://localhost:8080/properties/" + newProperty._id, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                props.updateProperties()
                setOpen(false)
            })
            .catch((error) => console.log(error));
    }

    return (
        <>
            {/* <Button variant='outlined' onClick={handleOpen}></Button> */}
            <IconButton aria-label="edit" onClick={handleOpen}>
                <Edit />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container justifyContent="center">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            EDIT PROPERTY
                        </Typography>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} style={{ margin: '1%' }}>
                            <Card>
                                <CardContent>
                                    <TextField label='Title' onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })} variant='outlined' value={newProperty.title} fullWidth />
                                    <TextField label='Description' onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })} value={newProperty.description} multiline rows={2} variant='outlined' fullWidth style={{ marginTop: '1%' }} />
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item xs={12} sm={6} style={{ paddingTop: '3%' }}>
                                            <TextField label='Room Type' onChange={(e) => setNewProperty({ ...newProperty, roomType: e.target.value })}  value={newProperty.roomType} variant='outlined' fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={6} style={{ paddingTop: '3%' }}>
                                            <TextField label='No. of bedrooms' onChange={(e) => setNewProperty({ ...newProperty, bedrooms: e.target.value })} value={newProperty.bedrooms} variant='outlined' fullWidth />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} style={{ margin: '1%' }}>
                            <Card>
                                <CardContent>
                                    <TextField label='Street' onChange={(e) => setNewProperty({ ...newProperty, location: { ...newProperty.location, streetName: e.target.value } })} value={newProperty.location.streetName} variant='outlined' fullWidth />
                                    <Grid container>
                                        <Grid item xs={6} sm={4} style={{ padding: '1%' }}>
                                            <TextField label='Apt' onChange={(e) => setNewProperty({ ...newProperty, location: { ...newProperty.location, apt: e.target.value } })} value={newProperty.location.apt} variant='outlined' fullWidth />
                                        </Grid>
                                        <Grid item xs={6} sm={4} style={{ padding: '1%' }}>
                                            <TextField label='State' onChange={(e) => setNewProperty({ ...newProperty, location: { ...newProperty.location, state: e.target.value } })} value={newProperty.location.state} variant='outlined' fullWidth />
                                        </Grid>
                                        <Grid item xs={6} sm={4} style={{ padding: '1%' }}>
                                            <TextField label='City' onChange={(e) => setNewProperty({ ...newProperty, location: { ...newProperty.location, city: e.target.value } })} value={newProperty.location.city} variant='outlined' fullWidth />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6} style={{ padding: '1%' }}>
                                            <TextField label='Country' onChange={(e) => setNewProperty({ ...newProperty, location: { ...newProperty.location, country: e.target.value } })} value={newProperty.location.country} variant='outlined' fullWidth />
                                        </Grid>
                                        <Grid item xs={6} style={{ padding: '1%' }}>
                                            <TextField label='Zip Code' onChange={(e) => setNewProperty({ ...newProperty, location: { ...newProperty.location, pinCode: e.target.value } })} value={newProperty.location.pinCode} variant='outlined' fullWidth />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} style={{ margin: '1%' }}>
                            <Card>
                                <CardContent>
                                    <Grid container justifyContent="center">
                                        <Button variant='contained' component='label'>
                                            Upload images
                                            <input type='file' multiple hidden></input>
                                        </Button>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} style={{ margin: '1%' }}>
                            <Card>
                                <CardContent>
                                    <InputLabel htmlFor="outlined-adornment-amount">Rate per night</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        onChange={(e) => setNewProperty({ ...newProperty, rate: { ...newProperty.rate, ratePerNight: e.target.value } })}
                                        value={newProperty.rate.ratePerNight}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" style={{ padding: '5%' }}>
                        <Button variant='contained' color='success' startIcon={<AddHome />} onClick={createProperty}>CONFIRM</Button>
                    </Grid>
                </Box>
            </Modal>
        </ >
    );
};

export default EditPropertyModal;