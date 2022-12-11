import '../App.css';
import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import HostListings from '../components/host-listings';
import HostReservations from '../components/host-reservations';
import AddProperty from '../components/add-property';

function Host() {

    const [user, SetUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/users/639237c1a0fead10016e489b') //get userId from session
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                SetUser(data)
                setLoading(false)
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="col-lg-12">
            <SearchBar />
            {
                loading ?
                    <div>Loading data </div> :
                    (
                        <>
                            <div className="row">
                                <div className='col-lg-10'>
                                    <h1>Hi {user.firstName} {user.lastName}</h1>
                                </div>
                                <div className='col-lg-2'>
                                    <button>Add Property</button>
                                </div>
                            </div>
                            <Tabs
                                defaultActiveKey="listings"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                            >
                                <Tab eventKey="listings" title="Your Properties">
                                    <HostListings />
                                </Tab>
                                <Tab eventKey="reservations" title="Reservations">
                                    <HostReservations />
                                </Tab>
                                <Tab eventKey="addProperty" title="Add Property">
                                    <AddProperty />
                                </Tab>
                            </Tabs>
                        </>
                    )
            }
        </div>
    )
}
function SearchBar() {
    return (
        <div className="row navbar-style">
            <div className="col-lg-1 center-all">
                <img src="logo.png" alt="..." height="85px"></img>
            </div>
        </div>
    )
}

export default Host;
