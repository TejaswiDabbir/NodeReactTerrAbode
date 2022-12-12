import '../App.css';
import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    IconButton,
} from '@mui/material'
import {
    Cancel,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

function Reservations() {

    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState([]);
    const userId = '639237c1a0fead10016e489b';

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/reservations/' + userId)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setReservations(data)
                setLoading(false)
            })
            .catch(err => console.log(err));
    }, []);

    const updateProperties = () => {
        window.location.reload()
    }

    function before(value, delimiter) {
        value = value || ''

        return delimiter === ''
            ? value
            : value.split(delimiter).shift()
    }

    const cancelReservation = (curr_reservation) => {
        console.log(curr_reservation)
        if (new Date(curr_reservation.startDate).getDate() - new Date().getDate() <= 2) {
            alert("Reservation cancellation time expired!")
            return;
        }
        else {
            fetch("http://localhost:8080/reservations/remove/" + curr_reservation._id)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    window.location.reload()
                })
                .catch((error) => console.log(error));
        }
    }

    return (
        <div className="col-lg-12">
            <SearchBar />
            {
                loading ?
                    <div>Loading data </div> :
                    (
                        <div className="row">
                            {
                                loading ?
                                    <div> LOADING DATA </div>
                                    :
                                    (
                                        reservations.length == 0 ?
                                            <Typography variant='h5'>NO RESERVATIONS YET</Typography>
                                            :
                                            <Container>
                                                <Grid container spacing={2}>
                                                    {reservations.map((reservation, index) => (
                                                        <Grid item xs={12} sm={6}>
                                                            <Card>
                                                                <CardContent>
                                                                    <Grid container>
                                                                        <Grid item xs={8}>
                                                                            <Typography variant='h5'>{reservation.propertyName}</Typography>
                                                                        </Grid>
                                                                        <Grid item xs={3}>
                                                                            <Typography variant="caption" display="block">{before(reservation.startDate, 'T')} TO {before(reservation.endDate, 'T')}</Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid container justifyContent="center" style={{ padding: '1%' }}>
                                                                        <IconButton aria-label="Cancel" onClick={() => cancelReservation(reservation)}>
                                                                            <Cancel />
                                                                        </IconButton>
                                                                    </Grid>

                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                    ))}
                                                </Grid>

                                            </Container>
                                    )

                            }
                        </div>
                    )
            }
        </div>
    )
}
function SearchBar() {
    const navigate = useNavigate()

    const navHome = () => {
        navigate('/listings', {
            state: {
              key: 'value',
            }
          })
    }
    return (
        <div className="row navbar-style">
            <div className="col-lg-1 center-all">
                <img src="logo.png" alt="..." height="85px" onClick={navHome}></img>
            </div>
        </div>
    )
}

export default Reservations;
