import '../App.css';
import React, { useEffect, useState } from 'react';
import MainContent from '../components/main-content';
import SingleListing from '../components/single-listing';
import Login from '../components/Login';
import Signup from '../components/Signup';
import AccountMenu from '../components/account-menu';
import {
  Tooltip,
  IconButton
} from '@mui/material'
import {
  AddHome,
  Favorite,
  EventSeat
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

function Listings() {

  const [listings, setListings] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [listView, setListView] = useState(true);
  const [listingInfo, setListingInfo] = useState([]);
  const [listingID, setListingID] = useState(-1);
  const [favoriteIds, setFavoriteIds] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)


  const userId = '639237c1a0fead10016e489b';

  useEffect(() => {
    setLoading(true);
    setLoadingFavorites(true);
    fetch('http://localhost:8080/properties')
      .then(res => res.json())
      .then((data) => {
        setListings(data)
        setLoading(false)
      })
      .catch(err => console.log(err));
    fetch('http://localhost:8080/favorites/user/' + userId)
      .then(res => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setFavoriteIds(data.map((fav) => fav.propertyId));
        }
        setLoadingFavorites(false);
      })
      .catch(err => console.log(err));
  }, []);

  const searchListing = (listings) => {
    if (!showFavorites) {
      return listings.filter(listing => listing.location.city.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
        || listing.title.toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
    }
    return listings.filter(listing => favoriteIds.indexOf(listing._id) === -1 && (listing.location.city.toLowerCase().indexOf(filterText.toLowerCase()) !== -1 
    || listing.title.toLowerCase().indexOf(filterText.toLowerCase())) !== -1);
  }

  const singleListingView = (idx) => {
    setLoading(true);
    setListingID(idx);
    setListView(false);
  }

  const mainContentView = () => {
    setListView(true);
  }

  const toggleFavoriteView = () => {
    setShowFavorites(!showFavorites)
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
        toggleFavorite={toggleFavoriteView}
      /> : <></>}
      <div className="row">
        {loading || loadingFavorites ?
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
  toggleFavorite
}) {
  const [selectedOption, setSelectedOption] = useState('Option 1');

  const navigate = useNavigate()

  const navToHosting = () => {
    navigate('/host', {
      state: {
        key: 'value',
      }
    })
  }

  const navToFavorites = () => {
    toggleFavorite();
  }

  const navToReservations = () => {
    navigate('/reservations', {
      state: {
        key: 'value',
      }
    })
  }

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
      <Login></Login>
     
    </div>
    <div className="col-lg-1 header">

    <Signup></Signup>
    </div>
      {/* <div className='col-lg-3 d-flex justify-content-end' style={{ paddingRight: "3%" }}>
        <Tooltip title="Hosting">
          <IconButton >
            <AddHome onClick={navToHosting} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Toggle Favorites">
          <IconButton>
            <Favorite onClick={navToFavorites} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reservations">
          <IconButton>
            <EventSeat onClick={navToReservations} />
          </IconButton>
        </Tooltip>
      </div> */}

    </div>
  )
}

export default Listings;
