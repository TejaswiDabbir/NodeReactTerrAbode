import '../App.css';
import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import HostListings from '../components/host-listings';
import HostReservations from '../components/host-reservations';
import AddProperty from '../components/add-property';
import { useNavigate } from 'react-router-dom';
import Session from 'react-session-api';
import {
  Tooltip,
  IconButton
} from '@mui/material'
import {
    EventSeat,
} from '@mui/icons-material'

function Host() {

    const [user, SetUser] = useState(Session.get('data'));
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setLoading(true);
    //     fetch('http://localhost:8080/users/639237c1a0fead10016e489b') //get userId from session
    //         .then(res => res.json())
    //         .then((data) => {
    //             console.log(data)
    //             SetUser(data)
    //             setLoading(false)
    //         })
    //         .catch(err => console.log(err));
    // }, []);

    const updateProperties = () => {
        window.location.reload()
    }

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
                                    <h1>Hi TJ Dabbir</h1>
                                </div>
                                <div className='col-lg-2'>
                                    <AddProperty userId='639237c1a0fead10016e489b' updateProperties={updateProperties} />
                                </div>
                            </div>
                            <Tabs
                                defaultActiveKey="listings"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                            >
                                <Tab eventKey="listings" title="Your Properties">
                                    <HostListings updateProperties={updateProperties} />
                                </Tab>
                                <Tab eventKey="reservations" title="Reservations">
                                    <HostReservations />
                                </Tab>
                                {/* <Tab eventKey="addProperty" title="Add Property">
                                    <AddProperty />
                                </Tab> */}
                            </Tabs>
                        </>
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
                <img src="logo.png" alt="..." height="85px" onClick={navHome}></img>
            </div>
            <div className='col-lg-8'>

            </div>
            <div className='col-lg-3 d-flex justify-content-end' style={{ paddingRight: "3%" }}>
                <Tooltip title="Reservations">
                    <IconButton>
                        <EventSeat onClick={navToReservations} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default Host;
