import React, { useEffect, useState } from 'react'
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
    FormControl,
    Rating
} from '@mui/material'

const SingleListing = (props) => {

    const reservationSchema = {
        userId: '639237c1a0fead10016e489b',
        propertyId: props.listing._id,
        bookingPrice: props.listing.rate.ratePerNight,
        status: 'Initiated',
        startDate: '',
        endDate: ''
    }

    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [newReservation, setNewReservation] = useState(reservationSchema);
    // const [isFormValid, setIsFormValid] = React.useState(true);
    // const [isFormSubmitting, setIsFormSubmitting] = React.useState(false);

    useEffect(() => {
        setLoading(true);
        // fetch('properties.json')
        fetch('http://localhost:8080/reviews/' + props.listing._id)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setReviews(data)
                setLoading(false)
            })
            .catch(err => console.log(err));
    }, []);

    const backClick = () => {
        props.mainContentView();
    }

    const createReservation = () => {
        // setIsFormSubmitting(true)
        console.log(newReservation)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReservation),
        };
        fetch("http://localhost:8080/reservations", requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));

    }

    return (
        <>
            {
                loading ?
                    <div>Loading data </div> :
                    <>
                        <div>
                            <div className='row'>
                                <div className='col-lg-1'>
                                    <button onClick={backClick}>BACK</button>
                                </div>
                                <div className='col-lg-10'>
                                    <h1><strong>{props.listing.title}</strong></h1>
                                    <i>{props.listing.location.city} - {props.listing.roomType} | {props.listing.bedrooms} bedrooms</i>
                                </div>
                                <div className='col-lg-1'>
                                    <h2><strong>{props.listing.rating}</strong>&nbsp;<i className="bi bi-star"></i></h2>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className='col-lg-1'></div>
                                <div className='col-lg-10'>
                                    <div className='d-flex flex-row'>
                                        <div className='col-lg-8'>
                                            <img src={props.listing.images[0].filePath} alt="..."></img>
                                        </div>
                                        <div className='col-lg-4'>
                                            {
                                                props.listing.images[1] ? <img src={props.listing.images[1].filePath} alt="..."></img> : <></>
                                            }
                                            <p></p>
                                            {
                                                props.listing.images[2] ? <img src={props.listing.images[2].filePath} alt="..."></img> : <></>
                                            }

                                        </div>
                                    </div>
                                    <br />

                                    <Container>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant='h5'>{props.listing.description}</Typography>
                                                <Card>
                                                    <CardContent>
                                                        Rates
                                                        <Card>
                                                            <CardContent>
                                                                <Grid container>
                                                                    <Grid item xs={6} sm={4}>
                                                                        ${props.listing.rate.ratePerNight}/night
                                                                    </Grid>
                                                                    {props.listing.rate.additionalCharges.map((charge, index) => (
                                                                        <Grid item xs={6} sm={4}>
                                                                            {charge.chargeType} - ${charge.value}
                                                                        </Grid>
                                                                    ))}
                                                                </Grid>
                                                            </CardContent>
                                                        </Card>
                                                        Amenities
                                                        <Card>
                                                            <CardContent>
                                                                <Grid container>
                                                                    {props.listing.amenities.map((amenity, index) => (
                                                                        <Grid item xs={12} sm={6}>
                                                                            {amenity.type} - {amenity.description}
                                                                        </Grid>
                                                                    ))}
                                                                </Grid>
                                                            </CardContent>
                                                        </Card>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            {
                                                props.listing.images[3] ?
                                                    <Grid item xs={12} sm={6}>
                                                        <CardMedia component='img' alt={props.listing.name} image={props.listing.images[3].filePath}></CardMedia>
                                                    </Grid>
                                                    : <></>
                                            }
                                        </Grid>
                                    </Container>

                                    <Container>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant='h5'>REVIEWS</Typography>
                                                {
                                                    reviews.length == 0 ?
                                                        <div>There are no reviews yet for this property</div>
                                                        :
                                                        <Card>
                                                            <CardContent>
                                                                {
                                                                    reviews.map((review, index) => (
                                                                        <>
                                                                            <Divider variant='fullWidth' style={{ height: 2, backgroundColor: "darkgrey" }} />
                                                                            <Typography component="legend" display="block">{review.userName}</Typography>
                                                                            <Typography variant="caption" display="block">{review.comment}</Typography>
                                                                            <Rating name="read-only" value={review.rating} readOnly />
                                                                            <Divider variant='fullWidth' style={{ height: 2, backgroundColor: "darkgrey" }} />
                                                                        </>

                                                                    ))
                                                                }
                                                            </CardContent>

                                                        </Card>
                                                }
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography variant='h5'>RESERVE</Typography>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} sm={6} style={{ padding: '5%' }}>
                                                                <TextField id='from_date' label='From' type='date' InputLabelProps={{ shrink: true }}
                                                                    onChange={(e) => setNewReservation({ ...newReservation, startDate: e.target.value })}></TextField>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} style={{ padding: '5%' }}>
                                                                <TextField id='to_date' label='To' type='date' InputLabelProps={{ shrink: true }}
                                                                    onChange={(e) => setNewReservation({ ...newReservation, endDate: e.target.value })}></TextField>
                                                            </Grid>
                                                        </Grid>
                                                        <InputLabel id="guest-label">Guests</InputLabel>
                                                        <Select
                                                            labelId="guest-label"
                                                            id="guests"
                                                            label="Guests"
                                                            // onChange={(e)=>setNewReservation({...newReservation,guests:e.target.value})}
                                                            fullWidth
                                                        >
                                                            <MenuItem value={1}>One</MenuItem>
                                                            <MenuItem value={2}>Two</MenuItem>
                                                            <MenuItem value={3}>Three</MenuItem>
                                                            <MenuItem value={4}>Four</MenuItem>
                                                        </Select>
                                                        <Button style={{ marginTop: "3%" }} variant="contained" size="large" onClick={createReservation} fullWidth>
                                                            Check availability and Book
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </div>
                                <div className='col-lg-1'></div>
                            </div>
                        </div>
                    </>
            }
        </>


    )
};

export default SingleListing