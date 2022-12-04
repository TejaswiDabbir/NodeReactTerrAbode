import React from 'react'

const Card = (props) => {
  return (
    <div className="col-lg-3">
      <div className="card" onClick={(e) => {
        props.cardClick(e, props.listing.id)
      }}>
        <div id={"carouselExampleIndicators" + props.cardno} className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
              aria-label="Slide 4"></button>
          </div>

          <div className="carousel-inner">
            {props.listing.images.map((image, index) => (
              <div className={"carousel-item" + (index == 0 ? " active" : "")} key={index}>
                <img src={image} className="d-block w-100" alt="..."></img>
              </div>
            ))}

          </div>
          <button className="carousel-control-prev" type="button" data-bs-target={"#carouselExampleIndicators" + props.cardno}
            data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target={"#carouselExampleIndicators" + props.cardno}
            data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="card-body">
          <p className="card-text ">{props.listing.title}<br />
            <strong>{props.listing.city_name}</strong><br />
            <p className="card-description" style={{ fontSize: '14px' }}>{props.listing.description}</p>
            <strong>{props.listing.nightly_fee}</strong>/night
            <span className="float-end"><strong>{props.listing.rating}</strong>&nbsp;<i className="bi bi-star"></i></span>
          </p>
        </div>
      </div>
    </div>
  )
};

export default Card