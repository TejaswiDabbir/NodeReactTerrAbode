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
    InputAdornment
} from '@mui/material'
import {
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

const AddPropertyModal = (props) => {

    const propertySchema = {
        title: '',
        description: '',
        roomType: '',
        bedrooms: '',
        location: {
            streetName: '',
            apt: '',
            city: '',
            state: '',
            country: '',
            pinCode: '',
        },
        hostId: props.userId,
        rating: '5',
        images: [],
        rate: {
            ratePerNight: '500',
            additionalCharges: []
        },
        amenities: [],
        rules: []
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [newProperty, setNewProperty] = useState(propertySchema);
    const [images, setImages] = useState([])

    const uploadImages = () => {
        console.log(images)
        const imageData = new FormData()
        Object.values(images).forEach((file) => {
            imageData.append('img',file)
        })
        // imageData.append('img', images[0])
        console.log(imageData)
        const requestOptions = {
            method: "POST",
            body: imageData,
        };
        fetch("http://localhost:8080/files/propertyImages", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                // props.updateProperties()
                // setOpen(false)
            })
            .catch((error) => console.log(error));
    }

    const createProperty = () => {
        console.log(newProperty)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProperty),
        };
        fetch("http://localhost:8080/properties", requestOptions)
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
            <Button variant='contained' onClick={handleOpen}>Add Property</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container justifyContent="center">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            ADD NEW PROPERTY
                        </Typography>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} style={{ margin: '1%' }}>
                            <Card>
                                <CardContent>
                                    <TextField label='Title' onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })} variant='outlined' fullWidth />
                                    <TextField label='Description' onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })} multiline rows={2} variant='outlined' fullWidth style={{ marginTop: '1%' }} />
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item xs={12} sm={6} style={{ paddingTop: '3%' }}>
                                            <TextField label='Room Type' onChange={(e) => setNewProperty({ ...newProperty, roomType: e.target.value })} variant='outlined' fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={6} style={{ paddingTop: '3%' }}>
                                            <TextField label='No. of bedrooms' onChange={(e) => setNewProperty({ ...newProperty, bedrooms: e.target.value })} variant='outlined' fullWidth />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} style={{ margin: '1%' }}>
                            <Card>
                                <CardContent>
                                    <TextField label='Street' onChange={(e) => setNewProperty({ ...newProperty, location: { ...newProperty.location, streetName: e.target.value } })} variant='outlined' fullWidth />
                                    <Grid container>
                                        <Grid item xs={6} sm={4} style={{ padding: '1%' }}>
                                            <TextField label='Apt' onChange={(e) => setNewProperty({ ...newProperty, location: { ...newProperty.location, apt: e.target.value } })} variant='outlined' fullWidth />
                                        </Grid>
                                        <Grid item xs={6} sm={4} style={{ padding: '1%' }}>
                                            <TextField label='State' onChange={(e) => setNewProperty({ ...newProperty, location: { ...newProperty.location, apt: e.target.value } })} variant='outlined' fullWidth />
                                        </Grid>
                                        <Grid item xs={6} sm={4} style={{ padding: '1%' }}>
                                            <TextField label='City' onChange={(e) => setNewProperty({ ...newProperty, location: { ...newProperty.location, apt: e.target.value } })} variant='outlined' fullWidth />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6} style={{ padding: '1%' }}>
                                            <TextField label='Country' onChange={(e) => setNewProperty({ ...newProperty, location: { ...newProperty.location, country: e.target.value } })} variant='outlined' fullWidth />
                                        </Grid>
                                        <Grid item xs={6} style={{ padding: '1%' }}>
                                            <TextField label='Zip Code' onChange={(e) => setNewProperty({ ...newProperty, location: { ...newProperty.location, pinCode: e.target.value } })} variant='outlined' fullWidth />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} style={{ margin: '1%' }}>
                            <Card>
                                <CardContent>
                                    <Grid container justifyContent="center">
                                        <input type='file' multiple onChange={(e) => setImages(e.target.files)}></input>
                                        <Button variant='contained' component='label' onClick={uploadImages}>
                                            Upload images
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
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" style={{ padding: '5%' }}>
                        <Button variant='contained' color='success' startIcon={<AddHome />} onClick={createProperty}>ADD</Button>
                    </Grid>
                </Box>
            </Modal>
        </ >
    );
};

export default AddPropertyModal;