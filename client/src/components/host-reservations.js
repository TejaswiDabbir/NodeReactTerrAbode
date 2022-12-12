import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material'

const HostReservations = (props) => {

  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const userId = '639237c1a0fead10016e489b';

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/reservations/host/' + userId)
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setReservations(data)
        setLoading(false)
      })
      .catch(err => console.log(err));
  }, []);

  const updateProperties = () => {
    props.updateProperties()
  }

  function before (value, delimiter) {  
    value = value || ''
  
    return delimiter === ''
      ? value
      : value.split(delimiter).shift()
  }

  return (
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
                        <Typography variant="caption" display="block">{before(reservation.startDate,'T')} TO {before(reservation.endDate,'T')}</Typography>
                        </Grid>
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
};

export default HostReservations;