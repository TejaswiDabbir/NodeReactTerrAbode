import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Button,
    Divider,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    Rating,
    Box,
} from '@mui/material'
import EditPropertyModal from './edit-property-modal';

const HostListings = (props) => {

    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);
    const userId = '639237c1a0fead10016e489b';

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/properties/host/' + userId)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setListings(data)
                setLoading(false)
            })
            .catch(err => console.log(err));
    }, []);

    const updateProperties = () => {
        props.updateProperties()
    }

    return (
        <div className="row">
            {
                loading ?
                    <div> LOADING DATA </div>
                    :
                    <Container>
                        <Grid container spacing={2}>
                            {listings.map((listing, index) => (
                                <Grid item xs={12} sm={6}>
                                    <Card>
                                        <CardContent>
                                            <Grid container>
                                                <Grid item xs={9}>
                                                    <Typography variant='h5'>{listing.title}</Typography>
                                                    <Typography variant="caption" display="block">{listing.roomType}</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Box display="flex" justifyContent="flex-end">
                                                        <EditPropertyModal property={listing} updateProperties={updateProperties}/>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                    </Container>
            }
        </div>
    )
};

export default HostListings;