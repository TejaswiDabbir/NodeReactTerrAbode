import React from 'react'
import Card from './card';

const MainContent = (props) => {

  const cardClick = (e, idx) => {
    if (e.target.tagName === 'SPAN' || e.target.tagName === 'BUTTON') {
      return;
    }
    props.singleListingView(idx);
  }

  return (
    <div className="row">
      {props.listings.map((listing, index) => (
        <Card listing={listing} cardno={index + 1} key={index} cardClick={cardClick}></Card>
      ))}
    </div>
  )
};

export default MainContent