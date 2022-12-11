import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Modal,
  Button,
  Rating,
  TextField,
  Grid
} from '@mui/material'
import {
  RateReview,
} from '@mui/icons-material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddReviewModal = (props) => {

  const reviewSchema = {
    userName: props.userName,
    propertyId: props.propertyId,
    rating: 5,
    comment: ''
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(5);
  const [newReview, setNewReview] = useState(reviewSchema);

  const createReview = () => {
    newReview.rating = value
    console.log(newReview)
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
    };
    fetch("http://localhost:8080/reviews", requestOptions)
        .then((response) => response.json())
        .then((data) => { 
          console.log(data) 
          props.updateReviews()
          setOpen(false)
        })
        .catch((error) => console.log(error));
}

  return (
    <>
      <Button variant='contained' onClick={handleOpen}>Add Review</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Rating
              name="review-rating"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                setNewReview({ ...newReview, rating: newValue })
              }}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField label='Enter comments' onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} multiline rows={3} variant='outlined' fullWidth />
          </Typography>
          <Grid container justifyContent="center" style={{ padding: '5%' }}>
            <Button variant='contained' color='success' startIcon={<RateReview />} onClick={createReview}>ADD</Button>
          </Grid>
        </Box>
      </Modal>
    </ >
  );
};

export default AddReviewModal;