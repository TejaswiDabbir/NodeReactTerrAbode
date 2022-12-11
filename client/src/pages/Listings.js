import '../App.css';
import React, { useEffect, useState } from 'react';
import MainContent from '../components/main-content';
import SingleListing from '../components/single-listing';
import Login from '../components/Login';
import Signup from '../components/Signup';

function Listings() {

  const [listings, setListings] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);
  const [listView, setListView] = useState(true);
  const [listingInfo, setListingInfo] = useState([]);
  const [listingID, setListingID] = useState(-1);

  useEffect(() => {
    setLoading(true);
    // fetch('properties.json')
    fetch('http://localhost:8080/properties')
      .then(res => res.json())
      .then((data) => {
        //console.log(data)
        setListings(data)
        setLoading(false)
      })
      .catch(err => console.log(err));
  }, []);

  const searchListing = (listings) => {
    return listings.filter(listing => listing.location.city.toLowerCase().indexOf(filterText.toLowerCase()) !== -1 || listing.title.toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
  }

  const singleListingView = (idx) => {
    setLoading(true);
    setListingID(idx);
    setListView(false);
  }

  const mainContentView = () => {
    setListView(true);
  }

  useEffect(() => {
    if (!listView) {
      setListingInfo(listings.filter(v => v._id === listingID))
      setLoading(false)
    }
  }, [listView])

  return (
    <div className="col-lg-12">
      {listView ? <SearchBar
        filterText={filterText}
        onFilterTextChange={setFilterText}
      /> : <></>}
      <div className="row">
        {loading ?
          <div>Loading data </div> :
          (
            listView ?
              <MainContent listings={searchListing(listings)} singleListingView={singleListingView}></MainContent> :
              <SingleListing listing={listingInfo[0]} mainContentView={mainContentView}></SingleListing>
          )
        }
      </div>
    </div>
  )
}
function SearchBar({
  filterText,
  onFilterTextChange,
}) {
  const [selectedOption, setSelectedOption] = useState('Option 1');
  return (
    <div className="row navbar-style">
      <div className="col-lg-1 center-all">
        <img src="logo.png" alt="..." height="85px"></img>
      </div>

      <div className="col-lg-8 header">
        <form className="search-header">
          <div className="input-group">
            <input type="text" className="form-control" value={filterText} placeholder="Find your Abode..."
              onChange={(e) => onFilterTextChange(e.target.value)} />
          </div>
        </form>
      </div>

      <div className="col-lg-1 header">
      {/* <label>Select an option:</label>
      <select value={selectedOption} onChange={(event) => {
        setSelectedOption(event.target.value);
      }}>
        <option value="Option 1">Log In</option>
        <option value="Option 2">Sign up</option>
        <option value="Option 3">Become a Host</option>
        <option value="Option 4">Show Favorites</option>
      </select> */}
      <Login></Login>
     
    </div>
    <div className="col-lg-1 header">

    <Signup></Signup>
    </div>
    </div>
  )
}

export default Listings;
