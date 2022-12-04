import React from 'react'

const SingleListing = (props) => {
    const backClick = () => {
        props.mainContentView();
    }
    return (
        <div>
            <div className='row'>
                <div className='col-lg-1'>
                    <button onClick={backClick}>BACK</button>
                </div>
                <div className='col-lg-10'>
                    <h1><strong>{props.listing.title}</strong></h1>
                    <i>{props.listing.city_name} - {props.listing.room_type}</i>
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
                            <img src={props.listing.images[0]} alt="..."></img>
                        </div>
                        <div className='col-lg-4'>
                            <img src={props.listing.images[1]} alt="..."></img>
                            <p></p>
                            <img src={props.listing.images[2]} alt="..."></img>
                        </div>
                    </div>
                    <br />
                    <div className='d-flex flex-row'>
                        <div className='col-lg-6'>
                            <p className="card-description" style={{ fontSize: '28px' }}><strong>{props.listing.description}</strong></p>
                            <strong>
                                ${props.listing.nightly_fee}/night <br />
                                ${props.listing.cleaning_fee} - Cleaning Fee <br />
                                ${props.listing.service_fee} - Service Fee <br />
                                {props.listing.bedrooms} Bedrooms <br />
                                {props.listing.minimum_nights} Minimum Nights <br />
                                Amenities: {props.listing.amenities}<br/>
                                Reviews: {props.listing.reviews}
                            </strong>
                        </div>
                        <div className='col-lg-6'>
                            <img src={props.listing.images[3]} alt="..."></img>
                        </div>
                    </div>
                    {/* {props.listing.images.map((image, index) => (
                    <img src={image} alt="..." key={index}></img>
                ))} */}
                </div>
                <div className='col-lg-1'></div>
            </div>
        </div>

    )
};

export default SingleListing