import './App.css';
import React, { useEffect, useState } from 'react';
import MainContent from './components/main-content';
import SingleListing from './components/single-listing';

function App() {

  const [listings, setListings] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);
  const [listView, setListView] = useState(true);
  const [listingInfo, setListingInfo] = useState([]);
  const [listingID, setListingID] = useState(-1);

  useEffect(() => {
    setLoading(true);
    fetch('properties.json')
      .then(res => res.json())
      .then((data) => {
        setListings(data)
        setLoading(false)
      })
      .catch(err => console.log(err));
  }, []);

  const searchListing = (listings) => {
    return listings.filter(listing => listing.city_name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1 || listing.title.toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
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
      setListingInfo(listings.filter(v => v.id === listingID))
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
  return (
    <div className="row navbar-style">
      <div className="col-lg-1 center-all">
        <img src="logo.png" alt="..." height="85px"></img>
      </div>

      <div className="col-lg-10 header">
        <form className="search-header">
          <div className="input-group">
            <input type="text" className="form-control" value={filterText} placeholder="Find your Abode..."
              onChange={(e) => onFilterTextChange(e.target.value)} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default App;
